---
title: 投币器统计
date: 2026-2-16
icon: micochip
cover: /assets/images/coin.png
order: 1
author:
  name: Swordfish
  url: https://jandswordfish.github.io/blog/
  email: 2771030100@qq.com
category:
  - 硬件
tag:
  - esp32
---

基于esp32开发板实现的脉冲形投币器的投币统计

<!-- more -->

# 引脚图

<img src="/assets/images/esp32.jpg"/>

::: tip 所需引脚及其对应接线

D4 投币检测 接入投币信号线

D17 退币按键检测 接入退币按键

D13 退币检测 接入退币信号线

GND 地线 接入地线

VIN 供电线 接入5V

使用 Arduino IDE 烧录
:::

::: info 鱼机

```
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi配置
const char* ssid = "Airtel_W304VA PRO_0F7B_5G";
const char* password = "fujian@office";

// 服务器配置
const char* serverUrl = "http://112.124.52.188:3000/api/coin";

// ========== 机器配置（需要修改） ==========
const char* deviceId = "ESP32_002";      // 设备唯一ID
const char* companyName = "company1";  // 公司名
const char* storeName = "store1";         // 店铺名
const char* machineName = "machinename2";    // 机器名
// ==========================================

#define COIN_PIN 4
#define REFUND_PIN 13
#define DATA_LINE_PIN 17

// 本地计数器
volatile int localCoins = 0;
volatile int localRefunds = 0;

// 待上传的增量数据
volatile int pendingCoins = 0;
volatile int pendingRefunds = 0;

volatile long startTime = 0;
volatile long elapsed = 0;
volatile bool isrefunds = false;
volatile bool iscoins = false;
volatile bool isChanged = false;

// 防抖时间戳
volatile unsigned long lastCoinTime = 0;
volatile unsigned long lastRefundTime = 0;
volatile unsigned long lastDataLineTime = 0;

// 定时上传配置
unsigned long lastUploadTime = 0;
const unsigned long uploadInterval = 20000;  // 改为20秒上传一次

const unsigned long debounceDelay = 100;
const unsigned long dataLineDebounce = 200;

// ========== 中断服务函数 ==========
void IRAM_ATTR coinISR() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastCoinTime > debounceDelay) {
    localCoins++;
    pendingCoins++;
    iscoins = true;
    lastCoinTime = currentTime;
    
    Serial.print("投币: ");
    Serial.print(localCoins);
    Serial.print(" | 余额: ");
    Serial.println(localCoins - localRefunds);
  }
}

void IRAM_ATTR refundISR() {
  unsigned long currentTime = millis();
  elapsed = millis() - startTime; 
  
  if (elapsed <= 5000 && iscoins && isrefunds && currentTime - lastRefundTime > debounceDelay) {
    localRefunds++;
    pendingRefunds++;
    lastRefundTime = currentTime;
    startTime = millis();
    isChanged = true;
    
    Serial.print("退币: ");
    Serial.print(localRefunds);
    Serial.print(" | 余额: ");
    Serial.println(localCoins - localRefunds);
  }
}

void IRAM_ATTR isrefundsISR() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastDataLineTime < dataLineDebounce) {
    return;
  }
  
  int state = digitalRead(DATA_LINE_PIN);
  
  if (state == LOW) {
    isrefunds = true;
    Serial.println("按下退币");
    
    if (iscoins) {
      startTime = millis();
      Serial.println("允许统计");
    }
    
    lastDataLineTime = currentTime;
  }
}

void setup() {
  Serial.begin(115200);
  
  pinMode(COIN_PIN, INPUT_PULLUP);
  pinMode(REFUND_PIN, INPUT_PULLUP);
  pinMode(DATA_LINE_PIN, INPUT_PULLUP); 
  
  attachInterrupt(digitalPinToInterrupt(COIN_PIN), coinISR, FALLING);
  attachInterrupt(digitalPinToInterrupt(REFUND_PIN), refundISR, FALLING);
  attachInterrupt(digitalPinToInterrupt(DATA_LINE_PIN), isrefundsISR, FALLING);
  
  Serial.println("========== 设备信息 ==========");
  Serial.println("设备ID: " + String(deviceId));
  Serial.println("公司: " + String(companyName));
  Serial.println("店铺: " + String(storeName));
  Serial.println("机器名: " + String(machineName));
  Serial.println("=============================");
  
  connectWiFi();
  
  // 首次注册并同步
  registerMachine();
  syncFromServer();
  
  Serial.println("系统初始化完成！");
  
  // 初始化上传时间
  lastUploadTime = millis();
}

void loop() {
  // 退币超时逻辑
  elapsed = millis() - startTime;
  if (elapsed > 5000) {
    if (isrefunds) {
      Serial.println("超时重置");
    }
    if(isChanged) {
      iscoins = false;
      isChanged = false;
    }
    isrefunds = false;
  }
  
  // 定时上传：每20秒上传一次
  unsigned long currentTime = millis();
  if (currentTime - lastUploadTime >= uploadInterval) {
    uploadIncrementalData();
    lastUploadTime = currentTime;
  }
  
  // WiFi重连检查
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi断开，尝试重连...");
    connectWiFi();
  }
  
  delay(100);
}

void connectWiFi() {
  Serial.println("连接WiFi...");
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi连接成功!");
    Serial.print("IP地址: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi连接失败!");
  }
}

// ========== 注册机器到服务器 ==========
void registerMachine() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，无法注册机器");
    return;
  }
  
  HTTPClient http;
  String url = String(serverUrl) + "/register";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);
  
  StaticJsonDocument<300> doc;
  doc["deviceId"] = deviceId;
  doc["companyName"] = companyName;
  doc["storeName"] = storeName;
  doc["machineName"] = machineName;
  
  String jsonData;
  serializeJson(doc, jsonData);
  
  Serial.println("正在注册机器: " + jsonData);
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("机器注册成功 [" + String(httpResponseCode) + "]: " + response);
  } else {
    Serial.print("注册失败，错误代码: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}

void uploadIncrementalData() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，无法上传数据");
    return;
  }
  
  // 原子性地读取待上传数据（不影响中断统计）
  int deltaCoins, deltaRefunds;
  noInterrupts();
  deltaCoins = pendingCoins;
  deltaRefunds = pendingRefunds;
  interrupts();
  
  // 即使增量为0也上传（保持在线状态）
  HTTPClient http;
  String url = String(serverUrl) + "/increment";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);
  
  StaticJsonDocument<300> doc;
  doc["deviceId"] = deviceId;
  doc["deltaCoins"] = deltaCoins;
  doc["deltaRefunds"] = deltaRefunds;
  doc["timestamp"] = millis();
  
  String jsonData;
  serializeJson(doc, jsonData);
  
  if (deltaCoins == 0 && deltaRefunds == 0) {
    Serial.println("上传心跳包（保持在线）: " + jsonData);
  } else {
    Serial.println("上传增量数据: " + jsonData);
  }
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("上传成功 [" + String(httpResponseCode) + "]: " + response);
    
    // 上传成功后清零待上传数据（不影响中断继续累加）
    noInterrupts();
    pendingCoins -= deltaCoins;
    pendingRefunds -= deltaRefunds;
    interrupts();
    
  } else {
    Serial.print("上传失败，错误代码: ");
    Serial.println(httpResponseCode);
    // 失败时不清零，下次继续尝试上传
  }
  
  http.end();
}

void syncFromServer() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，跳过同步");
    return;
  }
  
  HTTPClient http;
  String url = String(serverUrl) + "?deviceId=" + deviceId;
  http.begin(url);
  http.setTimeout(5000);
  
  Serial.println("正在从服务器同步初始数据...");
  
  int httpResponseCode = http.GET();
  
  if (httpResponseCode == 200) {
    String response = http.getString();
    StaticJsonDocument<300> doc;
    DeserializationError error = deserializeJson(doc, response);
    
    if (!error) {
      noInterrupts();
      localCoins = doc["coins"] | 0;
      localRefunds = doc["refunds"] | 0;
      pendingCoins = 0;
      pendingRefunds = 0;
      interrupts();
      
      Serial.println("初始数据同步成功!");
      Serial.println("投币: " + String(localCoins) + 
                     ", 退币: " + String(localRefunds) + 
                     ", 余额: " + String(localCoins - localRefunds));
    } else {
      Serial.println("JSON解析失败: " + String(error.c_str()));
    }
  } else {
    Serial.println("同步失败，错误代码: " + String(httpResponseCode));
  }
  
  http.end();
}
```

:::

::: info 黑色主板老虎机

```
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
// WiFi配置
const char* ssid = "Airtel_W304VA PRO_0F7B_5G";
const char* password = "fujian@office";
// 服务器配置
const char* serverUrl = "http://112.124.52.188:3000/api/coin";
// ========== 机器配置（需要修改） ==========
const char* deviceId = "ESP32_010";
const char* companyName = "company4";
const char* storeName = "store1";
const char* machineName = "machinename10";
// ==========================================
#define COIN_PIN 4
#define REFUND_PIN 13
#define DATA_LINE_PIN 17
// 本地计数器
volatile int localCoins = 0;
volatile int localRefunds = 0;
// 待上传的增量数据
volatile int pendingCoins = 0;
volatile int pendingRefunds = 0;
// 17号引脚状态控制
volatile bool isrefunds = false;
volatile bool iscoins = false;
volatile bool isChanged = false;
volatile long startTime = 0;
volatile long elapsed = 0;
// 防抖和脉冲检测
volatile unsigned long lastCoinTime = 0;
volatile unsigned long coinPulseStart = 0;
volatile bool coinPulseActive = false;
volatile unsigned long lastRefundTime = 0;
volatile unsigned long refundPulseStart = 0;
volatile bool refundPulseActive = false;
volatile unsigned long lastDataLineTime = 0;
// ========== 上传控制（修改为20秒间隔）==========
unsigned long lastUploadTime = 0;
const unsigned long uploadInterval = 20000;  // 改为20秒上传一次
// ========== 投币检测参数 ==========
const unsigned long coinDebounceDelay = 50;
const unsigned long minCoinPulseWidth = 10;
const unsigned long maxCoinPulseWidth = 100000;
// ========== 退币检测参数 ==========
const unsigned long minRefundPulseWidth = 3000;
const unsigned long maxRefundPulseWidth = 1032447280;
const unsigned long refundDebounceDelay = 50;
const unsigned long dataLineDebounce = 200;
// ========== 投币中断服务函数 ==========
void IRAM_ATTR coinISR() {
  unsigned long currentTime = micros();
  int state = digitalRead(COIN_PIN);
  
  if (state == HIGH && !coinPulseActive) {
    coinPulseStart = currentTime;
    coinPulseActive = true;
    
  } else if (state == LOW && coinPulseActive) {
    unsigned long pulseWidth = currentTime - coinPulseStart;
    coinPulseActive = false;
    
    if (pulseWidth >= minCoinPulseWidth && pulseWidth <= maxCoinPulseWidth) {
      unsigned long timeSinceLastCoin = millis() - lastCoinTime;
      
      if (timeSinceLastCoin > coinDebounceDelay) {
        localCoins++;
        pendingCoins++;
        iscoins = true;
        lastCoinTime = millis();
        
        Serial.print("✓ 投币检测 [脉冲宽度: ");
        Serial.print(pulseWidth);
        Serial.print(" μs] | 投币: ");
        Serial.print(localCoins);
        Serial.print(" | 余额: ");
        Serial.println(localCoins - localRefunds);
      }
    }
  }
}
// ========== 退币中断服务函数 ==========
void IRAM_ATTR refundISR() {
  unsigned long currentTime = micros();
  int state = digitalRead(REFUND_PIN);
  
  if (state == LOW && !refundPulseActive) {
    refundPulseStart = currentTime;
    refundPulseActive = true;
    
  } else if (state == HIGH && refundPulseActive) {
    unsigned long pulseWidth = currentTime - refundPulseStart;
    refundPulseActive = false;
    
    elapsed = millis() - startTime;
    
    if (pulseWidth >= minRefundPulseWidth && pulseWidth <= maxRefundPulseWidth) {
      
      if (elapsed <= 5000 && iscoins && isrefunds) {
        unsigned long currentMillis = millis();
        unsigned long timeSinceLastRefund = currentMillis - lastRefundTime;
        
        if (timeSinceLastRefund > refundDebounceDelay) {
          localRefunds++;
          pendingRefunds++;
          lastRefundTime = currentMillis;
          startTime = millis();
          isChanged = true;
          
          Serial.print("✓ 退币检测 [脉冲宽度: ");
          Serial.print(pulseWidth);
          Serial.print(" μs] | 退币: ");
          Serial.print(localRefunds);
          Serial.print(" | 余额: ");
          Serial.println(localCoins - localRefunds);
        } else {
          Serial.print("· 防抖过滤 [脉冲宽度: ");
          Serial.print(pulseWidth);
          Serial.print(" μs, 间隔: ");
          Serial.print(timeSinceLastRefund);
          Serial.println(" ms]");
        }
      } else {
        Serial.print("⚠ 退币脉冲检测到但未满足条件 [脉冲: ");
        Serial.print(pulseWidth);
        Serial.print(" μs | iscoins: ");
        Serial.print(iscoins);
        Serial.print(" | isrefunds: ");
        Serial.print(isrefunds);
        Serial.print(" | elapsed: ");
        Serial.print(elapsed);
        Serial.println(" ms]");
      }
    } else if (pulseWidth > maxRefundPulseWidth) {
      Serial.print("✗ 噪音过滤 [脉冲宽度: ");
      Serial.print(pulseWidth);
      Serial.println(" μs - 超出范围]");
    }
  }
}
// ========== 17号引脚中断服务函数 ==========
void IRAM_ATTR isrefundsISR() {
  unsigned long currentTime = millis();
  if (currentTime - lastDataLineTime < dataLineDebounce) {
    return;
  }
  
  int state = digitalRead(DATA_LINE_PIN);
  if (state == LOW) {
    isrefunds = true;
    Serial.println("✓ 17号引脚按下 - 允许退币统计");
    
    if (iscoins) {
      startTime = millis();
      Serial.println("→ 已投币，开始5秒倒计时");
    }
    lastDataLineTime = currentTime;
  }
}
void setup() {
  Serial.begin(115200);
  
  pinMode(COIN_PIN, INPUT_PULLUP);
  pinMode(REFUND_PIN, INPUT_PULLUP);
  pinMode(DATA_LINE_PIN, INPUT_PULLUP);
  
  attachInterrupt(digitalPinToInterrupt(COIN_PIN), coinISR, CHANGE);
  attachInterrupt(digitalPinToInterrupt(REFUND_PIN), refundISR, CHANGE);
  attachInterrupt(digitalPinToInterrupt(DATA_LINE_PIN), isrefundsISR, FALLING);
  
  Serial.println("========== 设备信息 ==========");
  Serial.println("设备ID: " + String(deviceId));
  Serial.println("公司: " + String(companyName));
  Serial.println("店铺: " + String(storeName));
  Serial.println("机器名: " + String(machineName));
  Serial.println("=============================");
  Serial.println("投币检测: LOW → HIGH 上升沿");
  Serial.println("退币检测: 3-35ms 脉冲 + 17号引脚触发 + 5秒内");
  Serial.println("上传策略: 20秒间隔上传（包含心跳包）");
  Serial.println("=============================");
  
  connectWiFi();
  registerMachine();
  syncFromServer();
  
  Serial.println("系统初始化完成！");
  lastUploadTime = millis();  // 初始化上传时间戳
}
void loop() {
  unsigned long currentTime = millis();
  
  // 检查5秒超时
  elapsed = currentTime - startTime;
  if (elapsed > 5000) {
    if (isrefunds) {
      Serial.println("⏱ 超时重置 - 5秒窗口关闭");
    }
    if (isChanged) {
      iscoins = false;
      isChanged = false;
    }
    isrefunds = false;
  }
  
  // ========== 20秒间隔上传 ==========
  if (currentTime - lastUploadTime >= uploadInterval) {
    uploadIncrementalData();
    lastUploadTime = currentTime;
  }
  
  // WiFi重连检测
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi断开，尝试重连...");
    connectWiFi();
  }
  
  delay(50);  // 减少loop循环频率，降低CPU压力
}
void connectWiFi() {
  Serial.println("连接WiFi...");
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi连接成功!");
    Serial.print("IP地址: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi连接失败!");
  }
}
void registerMachine() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，无法注册机器");
    return;
  }
  
  HTTPClient http;
  String url = String(serverUrl) + "/register";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);
  
  StaticJsonDocument<300> doc;
  doc["deviceId"] = deviceId;
  doc["companyName"] = companyName;
  doc["storeName"] = storeName;
  doc["machineName"] = machineName;
  
  String jsonData;
  serializeJson(doc, jsonData);
  
  Serial.println("正在注册机器: " + jsonData);
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("机器注册成功 [" + String(httpResponseCode) + "]: " + response);
  } else {
    Serial.print("注册失败，错误代码: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}
void uploadIncrementalData() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，无法上传数据");
    return;
  }
  
  // 原子性地读取待上传数据（不影响中断统计）
  int deltaCoins, deltaRefunds;
  noInterrupts();
  deltaCoins = pendingCoins;
  deltaRefunds = pendingRefunds;
  interrupts();
  
  // 即使增量为0也上传（保持在线状态）
  HTTPClient http;
  String url = String(serverUrl) + "/increment";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);
  
  StaticJsonDocument<300> doc;
  doc["deviceId"] = deviceId;
  doc["deltaCoins"] = deltaCoins;
  doc["deltaRefunds"] = deltaRefunds;
  doc["timestamp"] = millis();
  
  String jsonData;
  serializeJson(doc, jsonData);
  
  if (deltaCoins == 0 && deltaRefunds == 0) {
    Serial.println("📤 上传心跳包（保持在线）: " + jsonData);
  } else {
    Serial.println("📤 上传增量数据: " + jsonData);
  }
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("✅ 上传成功 [" + String(httpResponseCode) + "]: " + response);
    
    // 上传成功后清零待上传数据（不影响中断继续累加）
    noInterrupts();
    pendingCoins -= deltaCoins;
    pendingRefunds -= deltaRefunds;
    interrupts();
  } else {
    Serial.print("❌ 上传失败，错误代码: ");
    Serial.println(httpResponseCode);
    // 失败时不清零，下次继续尝试上传
  }
  
  http.end();
}
void syncFromServer() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，跳过同步");
    return;
  }
  
  HTTPClient http;
  String url = String(serverUrl) + "?deviceId=" + deviceId;
  http.begin(url);
  http.setTimeout(5000);
  
  Serial.println("正在从服务器同步初始数据...");
  
  int httpResponseCode = http.GET();
  
  if (httpResponseCode == 200) {
    String response = http.getString();
    StaticJsonDocument<300> doc;
    DeserializationError error = deserializeJson(doc, response);
    
    if (!error) {
      noInterrupts();
      localCoins = doc["coins"] | 0;
      localRefunds = doc["refunds"] | 0;
      pendingCoins = 0;
      pendingRefunds = 0;
      interrupts();
      
      Serial.println("初始数据同步成功!");
      Serial.println("投币: " + String(localCoins) +
                     ", 退币: " + String(localRefunds) +
                     ", 余额: " + String(localCoins - localRefunds));
    } else {
      Serial.println("JSON解析失败: " + String(error.c_str()));
    }
  } else {
    Serial.println("同步失败，错误代码: " + String(httpResponseCode));
  }
  
  http.end();
}
```

:::
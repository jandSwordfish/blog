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

::: info 检测

```
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi配置
const char* ssid = "Airtel_W154R PLUS_C114";
const char* password = "DC02FC52";

// 服务器配置
const char* serverUrl = "http://112.124.52.188:3000/api/coin";

// ========== 机器配置（需要修改） ==========
const char* deviceId = "sample_branch02_fish1";
const char* companyName = "Netbet";
const char* storeName = "sample_branch02";
const char* machineName = "fish1";
// ==========================================

#define COIN_PIN 4
#define REFUND_PIN 13
#define DATA_LINE_PIN 17

// ========== 脉冲宽度过滤阈值 ==========
// 真实信号宽度约29~45ms，噪声宽度0~4ms
// 设为20ms：低于此值视为噪声，直接丢弃
const unsigned long MIN_PULSE_WIDTH = 20;

// ========== 下降沿时间记录（用于测量脉冲宽度）==========
volatile unsigned long coinFallingTime = 0;
volatile unsigned long refundFallingTime = 0;
volatile unsigned long dataLineFallingTime = 0;

// 本地计数器
volatile int localCoins = 0;
volatile int localRefunds = 0;

// 待上传的增量数据
volatile int pendingCoins = 0;
volatile int pendingRefunds = 0;

// 退币状态
volatile unsigned long startTime = 0;
volatile bool isrefunds = false;
volatile bool iscoins = false;
volatile bool isChanged = false;

// 打印标志位（替代ISR内Serial）
volatile bool coinPrintFlag = false;
volatile bool refundPrintFlag = false;
volatile bool dataLinePrintFlag = false;

// 定时上传配置
unsigned long lastUploadTime = 0;
const unsigned long uploadInterval = 20000;

// ========== 幂等Key相关变量 ==========
String currentIdempotencyKey = "";
int snapshotCoins = 0;
int snapshotRefunds = 0;
unsigned long snapshotTimestamp = 0;
bool hasPendingSnapshot = false;
// ======================================

// ========== 中断服务函数 ==========

void IRAM_ATTR coinISR() {
  unsigned long now = millis();
  int state = digitalRead(COIN_PIN);

  if (state == LOW) {
    // 下降沿：记录时间，等待上升沿测量脉冲宽度
    coinFallingTime = now;
  } else {
    // 上升沿：计算脉冲宽度
    if (coinFallingTime > 0) {
      unsigned long pulseWidth = now - coinFallingTime;
      // 脉冲宽度 >= 20ms 才视为真实投币信号
      if (pulseWidth >= MIN_PULSE_WIDTH) {
        localCoins++;
        pendingCoins++;
        iscoins = true;
        coinPrintFlag = true;
      }
      coinFallingTime = 0;
    }
  }
}

void IRAM_ATTR refundISR() {
  unsigned long now = millis();
  int state = digitalRead(REFUND_PIN);

  if (state == LOW) {
    // 下降沿：记录时间，等待上升沿测量脉冲宽度
    refundFallingTime = now;
  } else {
    // 上升沿：计算脉冲宽度
    if (refundFallingTime > 0) {
      unsigned long pulseWidth = now - refundFallingTime;
      if (pulseWidth >= MIN_PULSE_WIDTH) {
        // 满足退币条件才计数
        if ((now - startTime) <= 5000 && iscoins && isrefunds) {
          localRefunds++;
          pendingRefunds++;
          startTime = now;
          isChanged = true;
          refundPrintFlag = true;
        }
      }
      refundFallingTime = 0;
    }
  }
}

void IRAM_ATTR isrefundsISR() {
  unsigned long now = millis();
  int state = digitalRead(DATA_LINE_PIN);

  if (state == LOW) {
    // 下降沿：记录时间，等待上升沿测量脉冲宽度
    dataLineFallingTime = now;
  } else {
    // 上升沿：计算脉冲宽度
    if (dataLineFallingTime > 0) {
      unsigned long pulseWidth = now - dataLineFallingTime;
      if (pulseWidth >= MIN_PULSE_WIDTH) {
        isrefunds = true;
        if (iscoins) {
          startTime = now;
        }
        dataLinePrintFlag = true;
      }
      dataLineFallingTime = 0;
    }
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(COIN_PIN, INPUT_PULLUP);
  pinMode(REFUND_PIN, INPUT_PULLUP);
  pinMode(DATA_LINE_PIN, INPUT_PULLUP);

  // CHANGE模式：同时监听上升沿和下降沿，用于测量脉冲宽度
  attachInterrupt(digitalPinToInterrupt(COIN_PIN), coinISR, CHANGE);
  attachInterrupt(digitalPinToInterrupt(REFUND_PIN), refundISR, CHANGE);
  attachInterrupt(digitalPinToInterrupt(DATA_LINE_PIN), isrefundsISR, CHANGE);

  Serial.println("========== 设备信息 ==========");
  Serial.println("设备ID: " + String(deviceId));
  Serial.println("公司: " + String(companyName));
  Serial.println("店铺: " + String(storeName));
  Serial.println("机器名: " + String(machineName));
  Serial.println("=============================");

  connectWiFi();
  registerMachine();
  syncFromServer();

  Serial.println("系统初始化完成！");
  lastUploadTime = millis();
}

void loop() {
  // ========== 打印标志处理 ==========
  if (coinPrintFlag) {
    coinPrintFlag = false;
    noInterrupts();
    int c = localCoins;
    int r = localRefunds;
    interrupts();
    Serial.print("投币: ");
    Serial.print(c);
    Serial.print(" | 余额: ");
    Serial.println(c - r);
  }

  if (refundPrintFlag) {
    refundPrintFlag = false;
    noInterrupts();
    int c = localCoins;
    int r = localRefunds;
    interrupts();
    Serial.print("退币: ");
    Serial.print(r);
    Serial.print(" | 余额: ");
    Serial.println(c - r);
  }

  if (dataLinePrintFlag) {
    dataLinePrintFlag = false;
    Serial.println("按下退币");
    if (iscoins) {
      Serial.println("允许统计");
    }
  }

  // ========== 退币超时逻辑 ==========
  unsigned long now = millis();
  if ((now - startTime) > 5000) {
    if (isrefunds) {
      Serial.println("超时重置");
    }
    if (isChanged) {
      iscoins = false;
      isChanged = false;
    }
    isrefunds = false;
  }

  // ========== 定时上传：每20秒上传一次 ==========
  if (now - lastUploadTime >= uploadInterval) {
    uploadIncrementalData();
    lastUploadTime = now;
  }

  // ========== WiFi重连检查 ==========
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi断开，尝试重连...");
    connectWiFi();
  }

  delay(10);
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

// ========== 上传增量数据（含幂等Key防重）==========
void uploadIncrementalData() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi未连接，无法上传数据");
    return;
  }

  int deltaCoins, deltaRefunds;
  unsigned long currentTimestamp;

  if (hasPendingSnapshot) {
    // 上次上传失败，重试：使用同一批次的快照和Key
    deltaCoins = snapshotCoins;
    deltaRefunds = snapshotRefunds;
    currentTimestamp = snapshotTimestamp;
    Serial.println("重试上次失败的批次，Key不变: " + currentIdempotencyKey);
  } else {
    // 新批次：原子读取当前待上传增量
    noInterrupts();
    deltaCoins = pendingCoins;
    deltaRefunds = pendingRefunds;
    interrupts();

    currentTimestamp = millis();
    currentIdempotencyKey = String(deviceId) + "_" +
                            String(currentTimestamp) + "_" +
                            String(deltaCoins) + "_" +
                            String(deltaRefunds);

    snapshotCoins = deltaCoins;
    snapshotRefunds = deltaRefunds;
    snapshotTimestamp = currentTimestamp;
    hasPendingSnapshot = true;
  }

  HTTPClient http;
  String url = String(serverUrl) + "/increment";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(5000);

  StaticJsonDocument<400> doc;
  doc["deviceId"] = deviceId;
  doc["deltaCoins"] = deltaCoins;
  doc["deltaRefunds"] = deltaRefunds;
  doc["timestamp"] = currentTimestamp;
  doc["idempotencyKey"] = currentIdempotencyKey;

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

    // 上传成功：从待上传增量中减去本次已确认的快照量
    noInterrupts();
    pendingCoins -= snapshotCoins;
    pendingRefunds -= snapshotRefunds;
    interrupts();

    // 清除快照
    hasPendingSnapshot = false;
    snapshotCoins = 0;
    snapshotRefunds = 0;
    snapshotTimestamp = 0;
    currentIdempotencyKey = "";
  } else {
    Serial.print("上传失败，错误代码: ");
    Serial.println(httpResponseCode);
    Serial.println("保留快照，下次重试使用相同Key: " + currentIdempotencyKey);
  }
  http.end();
}

// ========== 从服务器同步初始数据 ==========
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
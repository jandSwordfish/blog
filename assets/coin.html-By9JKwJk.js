import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as i,a as l,b as p,o as e}from"./app-CQICrlqX.js";const d="/blog/assets/images/esp32.jpg",c={};function v(r,n){return e(),a("div",null,[n[0]||(n[0]=i("p",null,"基于esp32开发板实现的脉冲形投币器的投币统计",-1)),l(" more "),n[1]||(n[1]=p('<h1 id="引脚图" tabindex="-1"><a class="header-anchor" href="#引脚图"><span>引脚图</span></a></h1><img src="'+d+`"><div class="hint-container tip"><p class="hint-container-title">所需引脚及其对应接线</p><p>D4 投币检测 接入投币信号线</p><p>D17 退币按键检测 接入退币按键</p><p>D13 退币检测 接入退币信号线</p><p>GND 地线 接入地线</p><p>VIN 供电线 接入5V</p><p>使用 Arduino IDE 烧录</p></div><div class="hint-container info"><p class="hint-container-title">检测</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#include &lt;WiFi.h&gt;</span></span>
<span class="line"><span>#include &lt;HTTPClient.h&gt;</span></span>
<span class="line"><span>#include &lt;ArduinoJson.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WiFi配置</span></span>
<span class="line"><span>const char* ssid = &quot;Airtel_W154R PLUS_C114&quot;;</span></span>
<span class="line"><span>const char* password = &quot;DC02FC52&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 服务器配置</span></span>
<span class="line"><span>const char* serverUrl = &quot;http://112.124.52.188:3000/api/coin&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 机器配置（需要修改） ==========</span></span>
<span class="line"><span>const char* deviceId = &quot;sample_branch02_fish1&quot;;</span></span>
<span class="line"><span>const char* companyName = &quot;Netbet&quot;;</span></span>
<span class="line"><span>const char* storeName = &quot;sample_branch02&quot;;</span></span>
<span class="line"><span>const char* machineName = &quot;fish1&quot;;</span></span>
<span class="line"><span>// ==========================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define COIN_PIN 4</span></span>
<span class="line"><span>#define REFUND_PIN 13</span></span>
<span class="line"><span>#define DATA_LINE_PIN 17</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 脉冲宽度过滤阈值 ==========</span></span>
<span class="line"><span>// 真实信号宽度约29~45ms，噪声宽度0~4ms</span></span>
<span class="line"><span>// 设为20ms：低于此值视为噪声，直接丢弃</span></span>
<span class="line"><span>const unsigned long MIN_PULSE_WIDTH = 20;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 下降沿时间记录（用于测量脉冲宽度）==========</span></span>
<span class="line"><span>volatile unsigned long coinFallingTime = 0;</span></span>
<span class="line"><span>volatile unsigned long refundFallingTime = 0;</span></span>
<span class="line"><span>volatile unsigned long dataLineFallingTime = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 本地计数器</span></span>
<span class="line"><span>volatile int localCoins = 0;</span></span>
<span class="line"><span>volatile int localRefunds = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 待上传的增量数据</span></span>
<span class="line"><span>volatile int pendingCoins = 0;</span></span>
<span class="line"><span>volatile int pendingRefunds = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 退币状态</span></span>
<span class="line"><span>volatile unsigned long startTime = 0;</span></span>
<span class="line"><span>volatile bool isrefunds = false;</span></span>
<span class="line"><span>volatile bool iscoins = false;</span></span>
<span class="line"><span>volatile bool isChanged = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 打印标志位（替代ISR内Serial）</span></span>
<span class="line"><span>volatile bool coinPrintFlag = false;</span></span>
<span class="line"><span>volatile bool refundPrintFlag = false;</span></span>
<span class="line"><span>volatile bool dataLinePrintFlag = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定时上传配置</span></span>
<span class="line"><span>unsigned long lastUploadTime = 0;</span></span>
<span class="line"><span>const unsigned long uploadInterval = 20000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 幂等Key相关变量 ==========</span></span>
<span class="line"><span>String currentIdempotencyKey = &quot;&quot;;</span></span>
<span class="line"><span>int snapshotCoins = 0;</span></span>
<span class="line"><span>int snapshotRefunds = 0;</span></span>
<span class="line"><span>unsigned long snapshotTimestamp = 0;</span></span>
<span class="line"><span>bool hasPendingSnapshot = false;</span></span>
<span class="line"><span>// ======================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 中断服务函数 ==========</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void IRAM_ATTR coinISR() {</span></span>
<span class="line"><span>  unsigned long now = millis();</span></span>
<span class="line"><span>  int state = digitalRead(COIN_PIN);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (state == LOW) {</span></span>
<span class="line"><span>    // 下降沿：记录时间，等待上升沿测量脉冲宽度</span></span>
<span class="line"><span>    coinFallingTime = now;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    // 上升沿：计算脉冲宽度</span></span>
<span class="line"><span>    if (coinFallingTime &gt; 0) {</span></span>
<span class="line"><span>      unsigned long pulseWidth = now - coinFallingTime;</span></span>
<span class="line"><span>      // 脉冲宽度 &gt;= 20ms 才视为真实投币信号</span></span>
<span class="line"><span>      if (pulseWidth &gt;= MIN_PULSE_WIDTH) {</span></span>
<span class="line"><span>        localCoins++;</span></span>
<span class="line"><span>        pendingCoins++;</span></span>
<span class="line"><span>        iscoins = true;</span></span>
<span class="line"><span>        coinPrintFlag = true;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      coinFallingTime = 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void IRAM_ATTR refundISR() {</span></span>
<span class="line"><span>  unsigned long now = millis();</span></span>
<span class="line"><span>  int state = digitalRead(REFUND_PIN);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (state == LOW) {</span></span>
<span class="line"><span>    // 下降沿：记录时间，等待上升沿测量脉冲宽度</span></span>
<span class="line"><span>    refundFallingTime = now;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    // 上升沿：计算脉冲宽度</span></span>
<span class="line"><span>    if (refundFallingTime &gt; 0) {</span></span>
<span class="line"><span>      unsigned long pulseWidth = now - refundFallingTime;</span></span>
<span class="line"><span>      if (pulseWidth &gt;= MIN_PULSE_WIDTH) {</span></span>
<span class="line"><span>        // 满足退币条件才计数</span></span>
<span class="line"><span>        if ((now - startTime) &lt;= 5000 &amp;&amp; iscoins &amp;&amp; isrefunds) {</span></span>
<span class="line"><span>          localRefunds++;</span></span>
<span class="line"><span>          pendingRefunds++;</span></span>
<span class="line"><span>          startTime = now;</span></span>
<span class="line"><span>          isChanged = true;</span></span>
<span class="line"><span>          refundPrintFlag = true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      refundFallingTime = 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void IRAM_ATTR isrefundsISR() {</span></span>
<span class="line"><span>  unsigned long now = millis();</span></span>
<span class="line"><span>  int state = digitalRead(DATA_LINE_PIN);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (state == LOW) {</span></span>
<span class="line"><span>    // 下降沿：记录时间，等待上升沿测量脉冲宽度</span></span>
<span class="line"><span>    dataLineFallingTime = now;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    // 上升沿：计算脉冲宽度</span></span>
<span class="line"><span>    if (dataLineFallingTime &gt; 0) {</span></span>
<span class="line"><span>      unsigned long pulseWidth = now - dataLineFallingTime;</span></span>
<span class="line"><span>      if (pulseWidth &gt;= MIN_PULSE_WIDTH) {</span></span>
<span class="line"><span>        isrefunds = true;</span></span>
<span class="line"><span>        if (iscoins) {</span></span>
<span class="line"><span>          startTime = now;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        dataLinePrintFlag = true;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      dataLineFallingTime = 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(115200);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  pinMode(COIN_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  pinMode(REFUND_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  pinMode(DATA_LINE_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // CHANGE模式：同时监听上升沿和下降沿，用于测量脉冲宽度</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(COIN_PIN), coinISR, CHANGE);</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(REFUND_PIN), refundISR, CHANGE);</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(DATA_LINE_PIN), isrefundsISR, CHANGE);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Serial.println(&quot;========== 设备信息 ==========&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;设备ID: &quot; + String(deviceId));</span></span>
<span class="line"><span>  Serial.println(&quot;公司: &quot; + String(companyName));</span></span>
<span class="line"><span>  Serial.println(&quot;店铺: &quot; + String(storeName));</span></span>
<span class="line"><span>  Serial.println(&quot;机器名: &quot; + String(machineName));</span></span>
<span class="line"><span>  Serial.println(&quot;=============================&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  connectWiFi();</span></span>
<span class="line"><span>  registerMachine();</span></span>
<span class="line"><span>  syncFromServer();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Serial.println(&quot;系统初始化完成！&quot;);</span></span>
<span class="line"><span>  lastUploadTime = millis();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  // ========== 打印标志处理 ==========</span></span>
<span class="line"><span>  if (coinPrintFlag) {</span></span>
<span class="line"><span>    coinPrintFlag = false;</span></span>
<span class="line"><span>    noInterrupts();</span></span>
<span class="line"><span>    int c = localCoins;</span></span>
<span class="line"><span>    int r = localRefunds;</span></span>
<span class="line"><span>    interrupts();</span></span>
<span class="line"><span>    Serial.print(&quot;投币: &quot;);</span></span>
<span class="line"><span>    Serial.print(c);</span></span>
<span class="line"><span>    Serial.print(&quot; | 余额: &quot;);</span></span>
<span class="line"><span>    Serial.println(c - r);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (refundPrintFlag) {</span></span>
<span class="line"><span>    refundPrintFlag = false;</span></span>
<span class="line"><span>    noInterrupts();</span></span>
<span class="line"><span>    int c = localCoins;</span></span>
<span class="line"><span>    int r = localRefunds;</span></span>
<span class="line"><span>    interrupts();</span></span>
<span class="line"><span>    Serial.print(&quot;退币: &quot;);</span></span>
<span class="line"><span>    Serial.print(r);</span></span>
<span class="line"><span>    Serial.print(&quot; | 余额: &quot;);</span></span>
<span class="line"><span>    Serial.println(c - r);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (dataLinePrintFlag) {</span></span>
<span class="line"><span>    dataLinePrintFlag = false;</span></span>
<span class="line"><span>    Serial.println(&quot;按下退币&quot;);</span></span>
<span class="line"><span>    if (iscoins) {</span></span>
<span class="line"><span>      Serial.println(&quot;允许统计&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ========== 退币超时逻辑 ==========</span></span>
<span class="line"><span>  unsigned long now = millis();</span></span>
<span class="line"><span>  if ((now - startTime) &gt; 5000) {</span></span>
<span class="line"><span>    if (isrefunds) {</span></span>
<span class="line"><span>      Serial.println(&quot;超时重置&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (isChanged) {</span></span>
<span class="line"><span>      iscoins = false;</span></span>
<span class="line"><span>      isChanged = false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    isrefunds = false;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ========== 定时上传：每20秒上传一次 ==========</span></span>
<span class="line"><span>  if (now - lastUploadTime &gt;= uploadInterval) {</span></span>
<span class="line"><span>    uploadIncrementalData();</span></span>
<span class="line"><span>    lastUploadTime = now;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ========== WiFi重连检查 ==========</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi断开，尝试重连...&quot;);</span></span>
<span class="line"><span>    connectWiFi();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  delay(10);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void connectWiFi() {</span></span>
<span class="line"><span>  Serial.println(&quot;连接WiFi...&quot;);</span></span>
<span class="line"><span>  WiFi.begin(ssid, password);</span></span>
<span class="line"><span>  int attempts = 0;</span></span>
<span class="line"><span>  while (WiFi.status() != WL_CONNECTED &amp;&amp; attempts &lt; 20) {</span></span>
<span class="line"><span>    delay(500);</span></span>
<span class="line"><span>    Serial.print(&quot;.&quot;);</span></span>
<span class="line"><span>    attempts++;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (WiFi.status() == WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;\\nWiFi连接成功!&quot;);</span></span>
<span class="line"><span>    Serial.print(&quot;IP地址: &quot;);</span></span>
<span class="line"><span>    Serial.println(WiFi.localIP());</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;\\nWiFi连接失败!&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 注册机器到服务器 ==========</span></span>
<span class="line"><span>void registerMachine() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，无法注册机器&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;/register&quot;;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>  doc[&quot;deviceId&quot;] = deviceId;</span></span>
<span class="line"><span>  doc[&quot;companyName&quot;] = companyName;</span></span>
<span class="line"><span>  doc[&quot;storeName&quot;] = storeName;</span></span>
<span class="line"><span>  doc[&quot;machineName&quot;] = machineName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  String jsonData;</span></span>
<span class="line"><span>  serializeJson(doc, jsonData);</span></span>
<span class="line"><span>  Serial.println(&quot;正在注册机器: &quot; + jsonData);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  int httpResponseCode = http.POST(jsonData);</span></span>
<span class="line"><span>  if (httpResponseCode &gt; 0) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    Serial.println(&quot;机器注册成功 [&quot; + String(httpResponseCode) + &quot;]: &quot; + response);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.print(&quot;注册失败，错误代码: &quot;);</span></span>
<span class="line"><span>    Serial.println(httpResponseCode);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 上传增量数据（含幂等Key防重）==========</span></span>
<span class="line"><span>void uploadIncrementalData() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，无法上传数据&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  int deltaCoins, deltaRefunds;</span></span>
<span class="line"><span>  unsigned long currentTimestamp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (hasPendingSnapshot) {</span></span>
<span class="line"><span>    // 上次上传失败，重试：使用同一批次的快照和Key</span></span>
<span class="line"><span>    deltaCoins = snapshotCoins;</span></span>
<span class="line"><span>    deltaRefunds = snapshotRefunds;</span></span>
<span class="line"><span>    currentTimestamp = snapshotTimestamp;</span></span>
<span class="line"><span>    Serial.println(&quot;重试上次失败的批次，Key不变: &quot; + currentIdempotencyKey);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    // 新批次：原子读取当前待上传增量</span></span>
<span class="line"><span>    noInterrupts();</span></span>
<span class="line"><span>    deltaCoins = pendingCoins;</span></span>
<span class="line"><span>    deltaRefunds = pendingRefunds;</span></span>
<span class="line"><span>    interrupts();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    currentTimestamp = millis();</span></span>
<span class="line"><span>    currentIdempotencyKey = String(deviceId) + &quot;_&quot; +</span></span>
<span class="line"><span>                            String(currentTimestamp) + &quot;_&quot; +</span></span>
<span class="line"><span>                            String(deltaCoins) + &quot;_&quot; +</span></span>
<span class="line"><span>                            String(deltaRefunds);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    snapshotCoins = deltaCoins;</span></span>
<span class="line"><span>    snapshotRefunds = deltaRefunds;</span></span>
<span class="line"><span>    snapshotTimestamp = currentTimestamp;</span></span>
<span class="line"><span>    hasPendingSnapshot = true;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;/increment&quot;;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  StaticJsonDocument&lt;400&gt; doc;</span></span>
<span class="line"><span>  doc[&quot;deviceId&quot;] = deviceId;</span></span>
<span class="line"><span>  doc[&quot;deltaCoins&quot;] = deltaCoins;</span></span>
<span class="line"><span>  doc[&quot;deltaRefunds&quot;] = deltaRefunds;</span></span>
<span class="line"><span>  doc[&quot;timestamp&quot;] = currentTimestamp;</span></span>
<span class="line"><span>  doc[&quot;idempotencyKey&quot;] = currentIdempotencyKey;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  String jsonData;</span></span>
<span class="line"><span>  serializeJson(doc, jsonData);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (deltaCoins == 0 &amp;&amp; deltaRefunds == 0) {</span></span>
<span class="line"><span>    Serial.println(&quot;上传心跳包（保持在线）: &quot; + jsonData);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;上传增量数据: &quot; + jsonData);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  int httpResponseCode = http.POST(jsonData);</span></span>
<span class="line"><span>  if (httpResponseCode &gt; 0) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    Serial.println(&quot;上传成功 [&quot; + String(httpResponseCode) + &quot;]: &quot; + response);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 上传成功：从待上传增量中减去本次已确认的快照量</span></span>
<span class="line"><span>    noInterrupts();</span></span>
<span class="line"><span>    pendingCoins -= snapshotCoins;</span></span>
<span class="line"><span>    pendingRefunds -= snapshotRefunds;</span></span>
<span class="line"><span>    interrupts();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 清除快照</span></span>
<span class="line"><span>    hasPendingSnapshot = false;</span></span>
<span class="line"><span>    snapshotCoins = 0;</span></span>
<span class="line"><span>    snapshotRefunds = 0;</span></span>
<span class="line"><span>    snapshotTimestamp = 0;</span></span>
<span class="line"><span>    currentIdempotencyKey = &quot;&quot;;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.print(&quot;上传失败，错误代码: &quot;);</span></span>
<span class="line"><span>    Serial.println(httpResponseCode);</span></span>
<span class="line"><span>    Serial.println(&quot;保留快照，下次重试使用相同Key: &quot; + currentIdempotencyKey);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 从服务器同步初始数据 ==========</span></span>
<span class="line"><span>void syncFromServer() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，跳过同步&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;?deviceId=&quot; + deviceId;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  Serial.println(&quot;正在从服务器同步初始数据...&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  int httpResponseCode = http.GET();</span></span>
<span class="line"><span>  if (httpResponseCode == 200) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>    DeserializationError error = deserializeJson(doc, response);</span></span>
<span class="line"><span>    if (!error) {</span></span>
<span class="line"><span>      noInterrupts();</span></span>
<span class="line"><span>      localCoins = doc[&quot;coins&quot;] | 0;</span></span>
<span class="line"><span>      localRefunds = doc[&quot;refunds&quot;] | 0;</span></span>
<span class="line"><span>      pendingCoins = 0;</span></span>
<span class="line"><span>      pendingRefunds = 0;</span></span>
<span class="line"><span>      interrupts();</span></span>
<span class="line"><span>      Serial.println(&quot;初始数据同步成功!&quot;);</span></span>
<span class="line"><span>      Serial.println(&quot;投币: &quot; + String(localCoins) +</span></span>
<span class="line"><span>                     &quot;, 退币: &quot; + String(localRefunds) +</span></span>
<span class="line"><span>                     &quot;, 余额: &quot; + String(localCoins - localRefunds));</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      Serial.println(&quot;JSON解析失败: &quot; + String(error.c_str()));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;同步失败，错误代码: &quot; + String(httpResponseCode));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,4))])}const m=s(c,[["render",v]]),o=JSON.parse(`{"path":"/hardware/coin.html","title":"投币器统计","lang":"zh-CN","frontmatter":{"title":"投币器统计","icon":"micochip","cover":"/assets/images/coin.png","order":1,"author":{"name":"Swordfish","url":"https://jandswordfish.github.io/blog/","email":"2771030100@qq.com"},"category":["硬件"],"tag":["esp32"],"description":"基于esp32开发板实现的脉冲形投币器的投币统计","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"投币器统计\\",\\"image\\":[\\"https://mister-hope.github.io/blog/assets/images/coin.png\\"],\\"dateModified\\":\\"2026-04-10T01:05:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Swordfish\\",\\"url\\":\\"https://jandswordfish.github.io/blog/\\",\\"email\\":\\"2771030100@qq.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/hardware/coin.html"}],["meta",{"property":"og:site_name","content":"swordfish's blog"}],["meta",{"property":"og:title","content":"投币器统计"}],["meta",{"property":"og:description","content":"基于esp32开发板实现的脉冲形投币器的投币统计"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mister-hope.github.io/blog/assets/images/coin.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-10T01:05:56.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://mister-hope.github.io/blog/assets/images/coin.png"}],["meta",{"name":"twitter:image:alt","content":"投币器统计"}],["meta",{"property":"article:author","content":"Swordfish"}],["meta",{"property":"article:tag","content":"esp32"}],["meta",{"property":"article:modified_time","content":"2026-04-10T01:05:56.000Z"}]]},"git":{"createdTime":1771228118000,"updatedTime":1775783156000,"contributors":[{"name":"jandSwordfish","username":"jandSwordfish","email":"2771030100@qq.com","commits":2,"url":"https://github.com/jandSwordfish"}]},"readingTime":{"minutes":4.69,"words":1407},"filePathRelative":"hardware/coin.md","excerpt":"<p>基于esp32开发板实现的脉冲形投币器的投币统计</p>\\n","autoDesc":true}`);export{m as comp,o as data};

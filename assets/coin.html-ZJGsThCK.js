import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as i,a as l,b as e,o as p}from"./app-Btr2il_T.js";const d="/blog/assets/images/esp32.jpg",c={};function v(r,n){return p(),a("div",null,[n[0]||(n[0]=i("p",null,"基于esp32开发板实现的脉冲形投币器的投币统计",-1)),l(" more "),n[1]||(n[1]=e('<h1 id="引脚图" tabindex="-1"><a class="header-anchor" href="#引脚图"><span>引脚图</span></a></h1><img src="'+d+`"><div class="hint-container tip"><p class="hint-container-title">所需引脚及其对应接线</p><p>D4 投币检测 接入投币信号线</p><p>D17 退币按键检测 接入退币按键</p><p>D13 退币检测 接入退币信号线</p><p>GND 地线 接入地线</p><p>VIN 供电线 接入5V</p><p>使用 Arduino IDE 烧录</p></div><div class="hint-container info"><p class="hint-container-title">鱼机</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#include &lt;WiFi.h&gt;</span></span>
<span class="line"><span>#include &lt;HTTPClient.h&gt;</span></span>
<span class="line"><span>#include &lt;ArduinoJson.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WiFi配置</span></span>
<span class="line"><span>const char* ssid = &quot;Airtel_W304VA PRO_0F7B_5G&quot;;</span></span>
<span class="line"><span>const char* password = &quot;fujian@office&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 服务器配置</span></span>
<span class="line"><span>const char* serverUrl = &quot;http://112.124.52.188:3000/api/coin&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 机器配置（需要修改） ==========</span></span>
<span class="line"><span>const char* deviceId = &quot;ESP32_002&quot;;      // 设备唯一ID</span></span>
<span class="line"><span>const char* companyName = &quot;company1&quot;;  // 公司名</span></span>
<span class="line"><span>const char* storeName = &quot;store1&quot;;         // 店铺名</span></span>
<span class="line"><span>const char* machineName = &quot;machinename2&quot;;    // 机器名</span></span>
<span class="line"><span>// ==========================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define COIN_PIN 4</span></span>
<span class="line"><span>#define REFUND_PIN 13</span></span>
<span class="line"><span>#define DATA_LINE_PIN 17</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 本地计数器</span></span>
<span class="line"><span>volatile int localCoins = 0;</span></span>
<span class="line"><span>volatile int localRefunds = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 待上传的增量数据</span></span>
<span class="line"><span>volatile int pendingCoins = 0;</span></span>
<span class="line"><span>volatile int pendingRefunds = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>volatile long startTime = 0;</span></span>
<span class="line"><span>volatile long elapsed = 0;</span></span>
<span class="line"><span>volatile bool isrefunds = false;</span></span>
<span class="line"><span>volatile bool iscoins = false;</span></span>
<span class="line"><span>volatile bool isChanged = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 防抖时间戳</span></span>
<span class="line"><span>volatile unsigned long lastCoinTime = 0;</span></span>
<span class="line"><span>volatile unsigned long lastRefundTime = 0;</span></span>
<span class="line"><span>volatile unsigned long lastDataLineTime = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定时上传配置</span></span>
<span class="line"><span>unsigned long lastUploadTime = 0;</span></span>
<span class="line"><span>const unsigned long uploadInterval = 20000;  // 改为20秒上传一次</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const unsigned long debounceDelay = 100;</span></span>
<span class="line"><span>const unsigned long dataLineDebounce = 200;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ========== 中断服务函数 ==========</span></span>
<span class="line"><span>void IRAM_ATTR coinISR() {</span></span>
<span class="line"><span>  unsigned long currentTime = millis();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (currentTime - lastCoinTime &gt; debounceDelay) {</span></span>
<span class="line"><span>    localCoins++;</span></span>
<span class="line"><span>    pendingCoins++;</span></span>
<span class="line"><span>    iscoins = true;</span></span>
<span class="line"><span>    lastCoinTime = currentTime;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    Serial.print(&quot;投币: &quot;);</span></span>
<span class="line"><span>    Serial.print(localCoins);</span></span>
<span class="line"><span>    Serial.print(&quot; | 余额: &quot;);</span></span>
<span class="line"><span>    Serial.println(localCoins - localRefunds);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void IRAM_ATTR refundISR() {</span></span>
<span class="line"><span>  unsigned long currentTime = millis();</span></span>
<span class="line"><span>  elapsed = millis() - startTime; </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (elapsed &lt;= 5000 &amp;&amp; iscoins &amp;&amp; isrefunds &amp;&amp; currentTime - lastRefundTime &gt; debounceDelay) {</span></span>
<span class="line"><span>    localRefunds++;</span></span>
<span class="line"><span>    pendingRefunds++;</span></span>
<span class="line"><span>    lastRefundTime = currentTime;</span></span>
<span class="line"><span>    startTime = millis();</span></span>
<span class="line"><span>    isChanged = true;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    Serial.print(&quot;退币: &quot;);</span></span>
<span class="line"><span>    Serial.print(localRefunds);</span></span>
<span class="line"><span>    Serial.print(&quot; | 余额: &quot;);</span></span>
<span class="line"><span>    Serial.println(localCoins - localRefunds);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void IRAM_ATTR isrefundsISR() {</span></span>
<span class="line"><span>  unsigned long currentTime = millis();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (currentTime - lastDataLineTime &lt; dataLineDebounce) {</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int state = digitalRead(DATA_LINE_PIN);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (state == LOW) {</span></span>
<span class="line"><span>    isrefunds = true;</span></span>
<span class="line"><span>    Serial.println(&quot;按下退币&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (iscoins) {</span></span>
<span class="line"><span>      startTime = millis();</span></span>
<span class="line"><span>      Serial.println(&quot;允许统计&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    lastDataLineTime = currentTime;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(115200);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  pinMode(COIN_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  pinMode(REFUND_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  pinMode(DATA_LINE_PIN, INPUT_PULLUP); </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(COIN_PIN), coinISR, FALLING);</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(REFUND_PIN), refundISR, FALLING);</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(DATA_LINE_PIN), isrefundsISR, FALLING);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;========== 设备信息 ==========&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;设备ID: &quot; + String(deviceId));</span></span>
<span class="line"><span>  Serial.println(&quot;公司: &quot; + String(companyName));</span></span>
<span class="line"><span>  Serial.println(&quot;店铺: &quot; + String(storeName));</span></span>
<span class="line"><span>  Serial.println(&quot;机器名: &quot; + String(machineName));</span></span>
<span class="line"><span>  Serial.println(&quot;=============================&quot;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  connectWiFi();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 首次注册并同步</span></span>
<span class="line"><span>  registerMachine();</span></span>
<span class="line"><span>  syncFromServer();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;系统初始化完成！&quot;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 初始化上传时间</span></span>
<span class="line"><span>  lastUploadTime = millis();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  // 退币超时逻辑</span></span>
<span class="line"><span>  elapsed = millis() - startTime;</span></span>
<span class="line"><span>  if (elapsed &gt; 5000) {</span></span>
<span class="line"><span>    if (isrefunds) {</span></span>
<span class="line"><span>      Serial.println(&quot;超时重置&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if(isChanged) {</span></span>
<span class="line"><span>      iscoins = false;</span></span>
<span class="line"><span>      isChanged = false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    isrefunds = false;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 定时上传：每20秒上传一次</span></span>
<span class="line"><span>  unsigned long currentTime = millis();</span></span>
<span class="line"><span>  if (currentTime - lastUploadTime &gt;= uploadInterval) {</span></span>
<span class="line"><span>    uploadIncrementalData();</span></span>
<span class="line"><span>    lastUploadTime = currentTime;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // WiFi重连检查</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi断开，尝试重连...&quot;);</span></span>
<span class="line"><span>    connectWiFi();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  delay(100);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void connectWiFi() {</span></span>
<span class="line"><span>  Serial.println(&quot;连接WiFi...&quot;);</span></span>
<span class="line"><span>  WiFi.begin(ssid, password);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int attempts = 0;</span></span>
<span class="line"><span>  while (WiFi.status() != WL_CONNECTED &amp;&amp; attempts &lt; 20) {</span></span>
<span class="line"><span>    delay(500);</span></span>
<span class="line"><span>    Serial.print(&quot;.&quot;);</span></span>
<span class="line"><span>    attempts++;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
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
<span class="line"><span>  </span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;/register&quot;;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>  doc[&quot;deviceId&quot;] = deviceId;</span></span>
<span class="line"><span>  doc[&quot;companyName&quot;] = companyName;</span></span>
<span class="line"><span>  doc[&quot;storeName&quot;] = storeName;</span></span>
<span class="line"><span>  doc[&quot;machineName&quot;] = machineName;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  String jsonData;</span></span>
<span class="line"><span>  serializeJson(doc, jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;正在注册机器: &quot; + jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int httpResponseCode = http.POST(jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (httpResponseCode &gt; 0) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    Serial.println(&quot;机器注册成功 [&quot; + String(httpResponseCode) + &quot;]: &quot; + response);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.print(&quot;注册失败，错误代码: &quot;);</span></span>
<span class="line"><span>    Serial.println(httpResponseCode);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void uploadIncrementalData() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，无法上传数据&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 原子性地读取待上传数据（不影响中断统计）</span></span>
<span class="line"><span>  int deltaCoins, deltaRefunds;</span></span>
<span class="line"><span>  noInterrupts();</span></span>
<span class="line"><span>  deltaCoins = pendingCoins;</span></span>
<span class="line"><span>  deltaRefunds = pendingRefunds;</span></span>
<span class="line"><span>  interrupts();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 即使增量为0也上传（保持在线状态）</span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;/increment&quot;;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>  doc[&quot;deviceId&quot;] = deviceId;</span></span>
<span class="line"><span>  doc[&quot;deltaCoins&quot;] = deltaCoins;</span></span>
<span class="line"><span>  doc[&quot;deltaRefunds&quot;] = deltaRefunds;</span></span>
<span class="line"><span>  doc[&quot;timestamp&quot;] = millis();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  String jsonData;</span></span>
<span class="line"><span>  serializeJson(doc, jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (deltaCoins == 0 &amp;&amp; deltaRefunds == 0) {</span></span>
<span class="line"><span>    Serial.println(&quot;上传心跳包（保持在线）: &quot; + jsonData);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;上传增量数据: &quot; + jsonData);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int httpResponseCode = http.POST(jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (httpResponseCode &gt; 0) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    Serial.println(&quot;上传成功 [&quot; + String(httpResponseCode) + &quot;]: &quot; + response);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 上传成功后清零待上传数据（不影响中断继续累加）</span></span>
<span class="line"><span>    noInterrupts();</span></span>
<span class="line"><span>    pendingCoins -= deltaCoins;</span></span>
<span class="line"><span>    pendingRefunds -= deltaRefunds;</span></span>
<span class="line"><span>    interrupts();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.print(&quot;上传失败，错误代码: &quot;);</span></span>
<span class="line"><span>    Serial.println(httpResponseCode);</span></span>
<span class="line"><span>    // 失败时不清零，下次继续尝试上传</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void syncFromServer() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，跳过同步&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;?deviceId=&quot; + deviceId;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;正在从服务器同步初始数据...&quot;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int httpResponseCode = http.GET();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (httpResponseCode == 200) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>    DeserializationError error = deserializeJson(doc, response);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (!error) {</span></span>
<span class="line"><span>      noInterrupts();</span></span>
<span class="line"><span>      localCoins = doc[&quot;coins&quot;] | 0;</span></span>
<span class="line"><span>      localRefunds = doc[&quot;refunds&quot;] | 0;</span></span>
<span class="line"><span>      pendingCoins = 0;</span></span>
<span class="line"><span>      pendingRefunds = 0;</span></span>
<span class="line"><span>      interrupts();</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      Serial.println(&quot;初始数据同步成功!&quot;);</span></span>
<span class="line"><span>      Serial.println(&quot;投币: &quot; + String(localCoins) + </span></span>
<span class="line"><span>                     &quot;, 退币: &quot; + String(localRefunds) + </span></span>
<span class="line"><span>                     &quot;, 余额: &quot; + String(localCoins - localRefunds));</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      Serial.println(&quot;JSON解析失败: &quot; + String(error.c_str()));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;同步失败，错误代码: &quot; + String(httpResponseCode));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="hint-container info"><p class="hint-container-title">黑色主板老虎机</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#include &lt;WiFi.h&gt;</span></span>
<span class="line"><span>#include &lt;HTTPClient.h&gt;</span></span>
<span class="line"><span>#include &lt;ArduinoJson.h&gt;</span></span>
<span class="line"><span>// WiFi配置</span></span>
<span class="line"><span>const char* ssid = &quot;Airtel_W304VA PRO_0F7B_5G&quot;;</span></span>
<span class="line"><span>const char* password = &quot;fujian@office&quot;;</span></span>
<span class="line"><span>// 服务器配置</span></span>
<span class="line"><span>const char* serverUrl = &quot;http://112.124.52.188:3000/api/coin&quot;;</span></span>
<span class="line"><span>// ========== 机器配置（需要修改） ==========</span></span>
<span class="line"><span>const char* deviceId = &quot;ESP32_010&quot;;</span></span>
<span class="line"><span>const char* companyName = &quot;company4&quot;;</span></span>
<span class="line"><span>const char* storeName = &quot;store1&quot;;</span></span>
<span class="line"><span>const char* machineName = &quot;machinename10&quot;;</span></span>
<span class="line"><span>// ==========================================</span></span>
<span class="line"><span>#define COIN_PIN 4</span></span>
<span class="line"><span>#define REFUND_PIN 13</span></span>
<span class="line"><span>#define DATA_LINE_PIN 17</span></span>
<span class="line"><span>// 本地计数器</span></span>
<span class="line"><span>volatile int localCoins = 0;</span></span>
<span class="line"><span>volatile int localRefunds = 0;</span></span>
<span class="line"><span>// 待上传的增量数据</span></span>
<span class="line"><span>volatile int pendingCoins = 0;</span></span>
<span class="line"><span>volatile int pendingRefunds = 0;</span></span>
<span class="line"><span>// 17号引脚状态控制</span></span>
<span class="line"><span>volatile bool isrefunds = false;</span></span>
<span class="line"><span>volatile bool iscoins = false;</span></span>
<span class="line"><span>volatile bool isChanged = false;</span></span>
<span class="line"><span>volatile long startTime = 0;</span></span>
<span class="line"><span>volatile long elapsed = 0;</span></span>
<span class="line"><span>// 防抖和脉冲检测</span></span>
<span class="line"><span>volatile unsigned long lastCoinTime = 0;</span></span>
<span class="line"><span>volatile unsigned long coinPulseStart = 0;</span></span>
<span class="line"><span>volatile bool coinPulseActive = false;</span></span>
<span class="line"><span>volatile unsigned long lastRefundTime = 0;</span></span>
<span class="line"><span>volatile unsigned long refundPulseStart = 0;</span></span>
<span class="line"><span>volatile bool refundPulseActive = false;</span></span>
<span class="line"><span>volatile unsigned long lastDataLineTime = 0;</span></span>
<span class="line"><span>// ========== 上传控制（修改为20秒间隔）==========</span></span>
<span class="line"><span>unsigned long lastUploadTime = 0;</span></span>
<span class="line"><span>const unsigned long uploadInterval = 20000;  // 改为20秒上传一次</span></span>
<span class="line"><span>// ========== 投币检测参数 ==========</span></span>
<span class="line"><span>const unsigned long coinDebounceDelay = 50;</span></span>
<span class="line"><span>const unsigned long minCoinPulseWidth = 10;</span></span>
<span class="line"><span>const unsigned long maxCoinPulseWidth = 100000;</span></span>
<span class="line"><span>// ========== 退币检测参数 ==========</span></span>
<span class="line"><span>const unsigned long minRefundPulseWidth = 3000;</span></span>
<span class="line"><span>const unsigned long maxRefundPulseWidth = 1032447280;</span></span>
<span class="line"><span>const unsigned long refundDebounceDelay = 50;</span></span>
<span class="line"><span>const unsigned long dataLineDebounce = 200;</span></span>
<span class="line"><span>// ========== 投币中断服务函数 ==========</span></span>
<span class="line"><span>void IRAM_ATTR coinISR() {</span></span>
<span class="line"><span>  unsigned long currentTime = micros();</span></span>
<span class="line"><span>  int state = digitalRead(COIN_PIN);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (state == HIGH &amp;&amp; !coinPulseActive) {</span></span>
<span class="line"><span>    coinPulseStart = currentTime;</span></span>
<span class="line"><span>    coinPulseActive = true;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  } else if (state == LOW &amp;&amp; coinPulseActive) {</span></span>
<span class="line"><span>    unsigned long pulseWidth = currentTime - coinPulseStart;</span></span>
<span class="line"><span>    coinPulseActive = false;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (pulseWidth &gt;= minCoinPulseWidth &amp;&amp; pulseWidth &lt;= maxCoinPulseWidth) {</span></span>
<span class="line"><span>      unsigned long timeSinceLastCoin = millis() - lastCoinTime;</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      if (timeSinceLastCoin &gt; coinDebounceDelay) {</span></span>
<span class="line"><span>        localCoins++;</span></span>
<span class="line"><span>        pendingCoins++;</span></span>
<span class="line"><span>        iscoins = true;</span></span>
<span class="line"><span>        lastCoinTime = millis();</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        Serial.print(&quot;✓ 投币检测 [脉冲宽度: &quot;);</span></span>
<span class="line"><span>        Serial.print(pulseWidth);</span></span>
<span class="line"><span>        Serial.print(&quot; μs] | 投币: &quot;);</span></span>
<span class="line"><span>        Serial.print(localCoins);</span></span>
<span class="line"><span>        Serial.print(&quot; | 余额: &quot;);</span></span>
<span class="line"><span>        Serial.println(localCoins - localRefunds);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// ========== 退币中断服务函数 ==========</span></span>
<span class="line"><span>void IRAM_ATTR refundISR() {</span></span>
<span class="line"><span>  unsigned long currentTime = micros();</span></span>
<span class="line"><span>  int state = digitalRead(REFUND_PIN);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (state == LOW &amp;&amp; !refundPulseActive) {</span></span>
<span class="line"><span>    refundPulseStart = currentTime;</span></span>
<span class="line"><span>    refundPulseActive = true;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  } else if (state == HIGH &amp;&amp; refundPulseActive) {</span></span>
<span class="line"><span>    unsigned long pulseWidth = currentTime - refundPulseStart;</span></span>
<span class="line"><span>    refundPulseActive = false;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    elapsed = millis() - startTime;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (pulseWidth &gt;= minRefundPulseWidth &amp;&amp; pulseWidth &lt;= maxRefundPulseWidth) {</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      if (elapsed &lt;= 5000 &amp;&amp; iscoins &amp;&amp; isrefunds) {</span></span>
<span class="line"><span>        unsigned long currentMillis = millis();</span></span>
<span class="line"><span>        unsigned long timeSinceLastRefund = currentMillis - lastRefundTime;</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        if (timeSinceLastRefund &gt; refundDebounceDelay) {</span></span>
<span class="line"><span>          localRefunds++;</span></span>
<span class="line"><span>          pendingRefunds++;</span></span>
<span class="line"><span>          lastRefundTime = currentMillis;</span></span>
<span class="line"><span>          startTime = millis();</span></span>
<span class="line"><span>          isChanged = true;</span></span>
<span class="line"><span>          </span></span>
<span class="line"><span>          Serial.print(&quot;✓ 退币检测 [脉冲宽度: &quot;);</span></span>
<span class="line"><span>          Serial.print(pulseWidth);</span></span>
<span class="line"><span>          Serial.print(&quot; μs] | 退币: &quot;);</span></span>
<span class="line"><span>          Serial.print(localRefunds);</span></span>
<span class="line"><span>          Serial.print(&quot; | 余额: &quot;);</span></span>
<span class="line"><span>          Serial.println(localCoins - localRefunds);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          Serial.print(&quot;· 防抖过滤 [脉冲宽度: &quot;);</span></span>
<span class="line"><span>          Serial.print(pulseWidth);</span></span>
<span class="line"><span>          Serial.print(&quot; μs, 间隔: &quot;);</span></span>
<span class="line"><span>          Serial.print(timeSinceLastRefund);</span></span>
<span class="line"><span>          Serial.println(&quot; ms]&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        Serial.print(&quot;⚠ 退币脉冲检测到但未满足条件 [脉冲: &quot;);</span></span>
<span class="line"><span>        Serial.print(pulseWidth);</span></span>
<span class="line"><span>        Serial.print(&quot; μs | iscoins: &quot;);</span></span>
<span class="line"><span>        Serial.print(iscoins);</span></span>
<span class="line"><span>        Serial.print(&quot; | isrefunds: &quot;);</span></span>
<span class="line"><span>        Serial.print(isrefunds);</span></span>
<span class="line"><span>        Serial.print(&quot; | elapsed: &quot;);</span></span>
<span class="line"><span>        Serial.print(elapsed);</span></span>
<span class="line"><span>        Serial.println(&quot; ms]&quot;);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    } else if (pulseWidth &gt; maxRefundPulseWidth) {</span></span>
<span class="line"><span>      Serial.print(&quot;✗ 噪音过滤 [脉冲宽度: &quot;);</span></span>
<span class="line"><span>      Serial.print(pulseWidth);</span></span>
<span class="line"><span>      Serial.println(&quot; μs - 超出范围]&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// ========== 17号引脚中断服务函数 ==========</span></span>
<span class="line"><span>void IRAM_ATTR isrefundsISR() {</span></span>
<span class="line"><span>  unsigned long currentTime = millis();</span></span>
<span class="line"><span>  if (currentTime - lastDataLineTime &lt; dataLineDebounce) {</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int state = digitalRead(DATA_LINE_PIN);</span></span>
<span class="line"><span>  if (state == LOW) {</span></span>
<span class="line"><span>    isrefunds = true;</span></span>
<span class="line"><span>    Serial.println(&quot;✓ 17号引脚按下 - 允许退币统计&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (iscoins) {</span></span>
<span class="line"><span>      startTime = millis();</span></span>
<span class="line"><span>      Serial.println(&quot;→ 已投币，开始5秒倒计时&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    lastDataLineTime = currentTime;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void setup() {</span></span>
<span class="line"><span>  Serial.begin(115200);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  pinMode(COIN_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  pinMode(REFUND_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  pinMode(DATA_LINE_PIN, INPUT_PULLUP);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(COIN_PIN), coinISR, CHANGE);</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(REFUND_PIN), refundISR, CHANGE);</span></span>
<span class="line"><span>  attachInterrupt(digitalPinToInterrupt(DATA_LINE_PIN), isrefundsISR, FALLING);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;========== 设备信息 ==========&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;设备ID: &quot; + String(deviceId));</span></span>
<span class="line"><span>  Serial.println(&quot;公司: &quot; + String(companyName));</span></span>
<span class="line"><span>  Serial.println(&quot;店铺: &quot; + String(storeName));</span></span>
<span class="line"><span>  Serial.println(&quot;机器名: &quot; + String(machineName));</span></span>
<span class="line"><span>  Serial.println(&quot;=============================&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;投币检测: LOW → HIGH 上升沿&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;退币检测: 3-35ms 脉冲 + 17号引脚触发 + 5秒内&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;上传策略: 20秒间隔上传（包含心跳包）&quot;);</span></span>
<span class="line"><span>  Serial.println(&quot;=============================&quot;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  connectWiFi();</span></span>
<span class="line"><span>  registerMachine();</span></span>
<span class="line"><span>  syncFromServer();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;系统初始化完成！&quot;);</span></span>
<span class="line"><span>  lastUploadTime = millis();  // 初始化上传时间戳</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void loop() {</span></span>
<span class="line"><span>  unsigned long currentTime = millis();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 检查5秒超时</span></span>
<span class="line"><span>  elapsed = currentTime - startTime;</span></span>
<span class="line"><span>  if (elapsed &gt; 5000) {</span></span>
<span class="line"><span>    if (isrefunds) {</span></span>
<span class="line"><span>      Serial.println(&quot;⏱ 超时重置 - 5秒窗口关闭&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (isChanged) {</span></span>
<span class="line"><span>      iscoins = false;</span></span>
<span class="line"><span>      isChanged = false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    isrefunds = false;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // ========== 20秒间隔上传 ==========</span></span>
<span class="line"><span>  if (currentTime - lastUploadTime &gt;= uploadInterval) {</span></span>
<span class="line"><span>    uploadIncrementalData();</span></span>
<span class="line"><span>    lastUploadTime = currentTime;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // WiFi重连检测</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi断开，尝试重连...&quot;);</span></span>
<span class="line"><span>    connectWiFi();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  delay(50);  // 减少loop循环频率，降低CPU压力</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void connectWiFi() {</span></span>
<span class="line"><span>  Serial.println(&quot;连接WiFi...&quot;);</span></span>
<span class="line"><span>  WiFi.begin(ssid, password);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int attempts = 0;</span></span>
<span class="line"><span>  while (WiFi.status() != WL_CONNECTED &amp;&amp; attempts &lt; 20) {</span></span>
<span class="line"><span>    delay(500);</span></span>
<span class="line"><span>    Serial.print(&quot;.&quot;);</span></span>
<span class="line"><span>    attempts++;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (WiFi.status() == WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;\\nWiFi连接成功!&quot;);</span></span>
<span class="line"><span>    Serial.print(&quot;IP地址: &quot;);</span></span>
<span class="line"><span>    Serial.println(WiFi.localIP());</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;\\nWiFi连接失败!&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void registerMachine() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，无法注册机器&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;/register&quot;;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>  doc[&quot;deviceId&quot;] = deviceId;</span></span>
<span class="line"><span>  doc[&quot;companyName&quot;] = companyName;</span></span>
<span class="line"><span>  doc[&quot;storeName&quot;] = storeName;</span></span>
<span class="line"><span>  doc[&quot;machineName&quot;] = machineName;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  String jsonData;</span></span>
<span class="line"><span>  serializeJson(doc, jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;正在注册机器: &quot; + jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int httpResponseCode = http.POST(jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (httpResponseCode &gt; 0) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    Serial.println(&quot;机器注册成功 [&quot; + String(httpResponseCode) + &quot;]: &quot; + response);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.print(&quot;注册失败，错误代码: &quot;);</span></span>
<span class="line"><span>    Serial.println(httpResponseCode);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void uploadIncrementalData() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，无法上传数据&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 原子性地读取待上传数据（不影响中断统计）</span></span>
<span class="line"><span>  int deltaCoins, deltaRefunds;</span></span>
<span class="line"><span>  noInterrupts();</span></span>
<span class="line"><span>  deltaCoins = pendingCoins;</span></span>
<span class="line"><span>  deltaRefunds = pendingRefunds;</span></span>
<span class="line"><span>  interrupts();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 即使增量为0也上传（保持在线状态）</span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;/increment&quot;;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>  doc[&quot;deviceId&quot;] = deviceId;</span></span>
<span class="line"><span>  doc[&quot;deltaCoins&quot;] = deltaCoins;</span></span>
<span class="line"><span>  doc[&quot;deltaRefunds&quot;] = deltaRefunds;</span></span>
<span class="line"><span>  doc[&quot;timestamp&quot;] = millis();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  String jsonData;</span></span>
<span class="line"><span>  serializeJson(doc, jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (deltaCoins == 0 &amp;&amp; deltaRefunds == 0) {</span></span>
<span class="line"><span>    Serial.println(&quot;📤 上传心跳包（保持在线）: &quot; + jsonData);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.println(&quot;📤 上传增量数据: &quot; + jsonData);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int httpResponseCode = http.POST(jsonData);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (httpResponseCode &gt; 0) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    Serial.println(&quot;✅ 上传成功 [&quot; + String(httpResponseCode) + &quot;]: &quot; + response);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 上传成功后清零待上传数据（不影响中断继续累加）</span></span>
<span class="line"><span>    noInterrupts();</span></span>
<span class="line"><span>    pendingCoins -= deltaCoins;</span></span>
<span class="line"><span>    pendingRefunds -= deltaRefunds;</span></span>
<span class="line"><span>    interrupts();</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    Serial.print(&quot;❌ 上传失败，错误代码: &quot;);</span></span>
<span class="line"><span>    Serial.println(httpResponseCode);</span></span>
<span class="line"><span>    // 失败时不清零，下次继续尝试上传</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void syncFromServer() {</span></span>
<span class="line"><span>  if (WiFi.status() != WL_CONNECTED) {</span></span>
<span class="line"><span>    Serial.println(&quot;WiFi未连接，跳过同步&quot;);</span></span>
<span class="line"><span>    return;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  HTTPClient http;</span></span>
<span class="line"><span>  String url = String(serverUrl) + &quot;?deviceId=&quot; + deviceId;</span></span>
<span class="line"><span>  http.begin(url);</span></span>
<span class="line"><span>  http.setTimeout(5000);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Serial.println(&quot;正在从服务器同步初始数据...&quot;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  int httpResponseCode = http.GET();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (httpResponseCode == 200) {</span></span>
<span class="line"><span>    String response = http.getString();</span></span>
<span class="line"><span>    StaticJsonDocument&lt;300&gt; doc;</span></span>
<span class="line"><span>    DeserializationError error = deserializeJson(doc, response);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (!error) {</span></span>
<span class="line"><span>      noInterrupts();</span></span>
<span class="line"><span>      localCoins = doc[&quot;coins&quot;] | 0;</span></span>
<span class="line"><span>      localRefunds = doc[&quot;refunds&quot;] | 0;</span></span>
<span class="line"><span>      pendingCoins = 0;</span></span>
<span class="line"><span>      pendingRefunds = 0;</span></span>
<span class="line"><span>      interrupts();</span></span>
<span class="line"><span>      </span></span>
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
<span class="line"><span>  </span></span>
<span class="line"><span>  http.end();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,5))])}const m=s(c,[["render",v]]),o=JSON.parse(`{"path":"/hardware/coin.html","title":"投币器统计","lang":"zh-CN","frontmatter":{"title":"投币器统计","icon":"micochip","cover":"/assets/images/coin.png","order":1,"author":{"name":"Swordfish","url":"https://jandswordfish.github.io/blog/","email":"2771030100@qq.com"},"category":["硬件"],"tag":["esp32"],"description":"基于esp32开发板实现的脉冲形投币器的投币统计","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"投币器统计\\",\\"image\\":[\\"https://mister-hope.github.io/blog/assets/images/coin.png\\"],\\"dateModified\\":\\"2026-02-16T07:48:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Swordfish\\",\\"url\\":\\"https://jandswordfish.github.io/blog/\\",\\"email\\":\\"2771030100@qq.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/hardware/coin.html"}],["meta",{"property":"og:site_name","content":"swordfish's blog"}],["meta",{"property":"og:title","content":"投币器统计"}],["meta",{"property":"og:description","content":"基于esp32开发板实现的脉冲形投币器的投币统计"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mister-hope.github.io/blog/assets/images/coin.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-02-16T07:48:38.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://mister-hope.github.io/blog/assets/images/coin.png"}],["meta",{"name":"twitter:image:alt","content":"投币器统计"}],["meta",{"property":"article:author","content":"Swordfish"}],["meta",{"property":"article:tag","content":"esp32"}],["meta",{"property":"article:modified_time","content":"2026-02-16T07:48:38.000Z"}]]},"git":{"createdTime":1771228118000,"updatedTime":1771228118000,"contributors":[{"name":"jandSwordfish","username":"jandSwordfish","email":"2771030100@qq.com","commits":1,"url":"https://github.com/jandSwordfish"}]},"readingTime":{"minutes":7.59,"words":2278},"filePathRelative":"hardware/coin.md","excerpt":"<p>基于esp32开发板实现的脉冲形投币器的投币统计</p>\\n","autoDesc":true}`);export{m as comp,o as data};

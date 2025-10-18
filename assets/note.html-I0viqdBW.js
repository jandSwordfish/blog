import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as i,o as l}from"./app-jLPLPk5H.js";const e={};function p(d,s){return l(),a("div",null,[...s[0]||(s[0]=[i(`<h1 id="质数" tabindex="-1"><a class="header-anchor" href="#质数"><span>质数</span></a></h1><h2 id="_6倍速普通方法" tabindex="-1"><a class="header-anchor" href="#_6倍速普通方法"><span>6倍速普通方法</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>bool isPrime(int n)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if (n == 2 || n == 3)</span></span>
<span class="line"><span>		return 1;</span></span>
<span class="line"><span>	if (n % 6 != 1 &amp;&amp; n % 6 != 5)</span></span>
<span class="line"><span>		return 0;</span></span>
<span class="line"><span>	for (int i = 5;i * i &lt;= n;i += 6)</span></span>
<span class="line"><span>		if (n % i == 0 || n % (i + 2) == 0)</span></span>
<span class="line"><span>			return 0;</span></span>
<span class="line"><span>	return n &gt; 1;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="埃筛-时间换内存" tabindex="-1"><a class="header-anchor" href="#埃筛-时间换内存"><span>埃筛（时间换内存）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>const int N = 1001;</span></span>
<span class="line"><span>int primes[N];</span></span>
<span class="line"><span>int cnt = 0;</span></span>
<span class="line"><span>bool v[N];//注：v[1]=1</span></span>
<span class="line"><span>void as()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int i = 2; i &lt; N; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (v[i])</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			continue;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		primes[cnt++] = i;</span></span>
<span class="line"><span>		for (int j = i+i; j &lt; N; j += i)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			v[j] = 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="欧拉筛-内存换时间" tabindex="-1"><a class="header-anchor" href="#欧拉筛-内存换时间"><span>欧拉筛（内存换时间）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>const int N = 1001;</span></span>
<span class="line"><span>int primes[N];</span></span>
<span class="line"><span>int cnt = 0;</span></span>
<span class="line"><span>bool v[N];</span></span>
<span class="line"><span>void as()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int i = 2; i &lt;=N; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (!v[i])</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			primes[cnt++] = i;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		for (int j = 0; primes[j]*i &lt;=N; j++)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			v[i*primes[j]] = true;</span></span>
<span class="line"><span>			if (i % primes[j] == 0)</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				break;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="计算方式" tabindex="-1"><a class="header-anchor" href="#计算方式"><span>计算方式</span></a></h1><h2 id="求余" tabindex="-1"><a class="header-anchor" href="#求余"><span>求余</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>a+b                   ((a%mod)+(b%mod))%mod</span></span>
<span class="line"><span>a*b                   同上</span></span>
<span class="line"><span>a-b                   ((a%mod)-(b%mod)+mod)%mod//+mod防止出现负数</span></span>
<span class="line"><span>a能整除b时             (a/b)%mod=a%(b*mod)/b</span></span>
<span class="line"><span>a不能整除b时(费马小定理) (a/b)%mod=a*(b^(mod-2)%mod)%mod</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="龟速乘-防止炸范围" tabindex="-1"><a class="header-anchor" href="#龟速乘-防止炸范围"><span>龟速乘（防止炸范围）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll low(ll a, ll b)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll ans = 0;</span></span>
<span class="line"><span>	while (b)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (b &amp; 1)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			ans = (ans + a) % mod;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		a = (a + a) % mod;</span></span>
<span class="line"><span>		b &gt;&gt;= 1;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return ans;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快速幂-防止超时" tabindex="-1"><a class="header-anchor" href="#快速幂-防止超时"><span>快速幂（防止超时）</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll quick(ll a, ll b)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll ans = 1;</span></span>
<span class="line"><span>	while (b)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (b &amp; 1)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			ans = low(ans,a);//乘法套用龟速乘，防止炸范围，不套省时间</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		a = low(a,a);</span></span>
<span class="line"><span>		b &gt;&gt;= 1;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return ans;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="矩阵快速幂" tabindex="-1"><a class="header-anchor" href="#矩阵快速幂"><span>矩阵快速幂</span></a></h2><h2 id="最大公因数" tabindex="-1"><a class="header-anchor" href="#最大公因数"><span>最大公因数</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>大数等于小数，小数等于余数(a为大数)</span></span>
<span class="line"><span>ll gcd(ll a, ll b)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	return (b? gcd( b, a%b) : a);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最小公倍数" tabindex="-1"><a class="header-anchor" href="#最小公倍数"><span>最小公倍数</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>最小公倍数×最大公约数=A×B </span></span>
<span class="line"><span>ll lcm(ll a, ll b)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	return t = a/gcd(a, b)*b;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组合数-c-n-m" tabindex="-1"><a class="header-anchor" href="#组合数-c-n-m"><span>组合数（C（n,m））</span></a></h2><p>对点求版（数学原理建议版）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll C(ll n, ll m)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    if (m &gt; n)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    ll up = 1, down = 1;</span></span>
<span class="line"><span>    for (ll i = 1; i &lt;= m; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        up *= n - i + 1;</span></span>
<span class="line"><span>        down *= i;</span></span>
<span class="line"><span>        up %= mod;</span></span>
<span class="line"><span>        down %= mod;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return 费马(up, down);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>预处理版</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>fac[]//阶乘数组</span></span>
<span class="line"><span>inv[]//逆元数组</span></span>
<span class="line"><span>！！！一定注意数组大小范围</span></span>
<span class="line"><span>void pre()//预处理函数</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	fac[0] = inv[0] = 1;//一定记得处理首位</span></span>
<span class="line"><span>	for (ll i = 1; i &lt; MAXN; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		fac[i] = (fac[i - 1] * i) % mod;</span></span>
<span class="line"><span>		inv[i] = quick(fac[i], mod - 2);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>ll C(ll n, ll m)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if (m &gt; n)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		return 0;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return (fac[n]* inv[m]  * inv[n - m] ) % mod;//为了方便观察省去了很多取模</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="排列数-a-n-m" tabindex="-1"><a class="header-anchor" href="#排列数-a-n-m"><span>排列数（A（n,m））</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll A(ll n, ll m)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    ll up = 1;</span></span>
<span class="line"><span>    if (m &gt; n)</span></span>
<span class="line"><span>        return 0;</span></span>
<span class="line"><span>    for (int i = n-m+1; i &lt;= n; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        up *= i;</span></span>
<span class="line"><span>        up %= mod;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return up;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="逆元" tabindex="-1"><a class="header-anchor" href="#逆元"><span>逆元</span></a></h2><p>逆元：一个数字被除时取模，等于乘以这个数在这个mod下的逆元（与mod互质时才存在）</p><p>对点求</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>quick(b,mod-2);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>线性求逆元</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>inv[1]=1;</span></span>
<span class="line"><span>for(int i=2;i&lt;=n;i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   inv[i]=mod-(mod/i)*inv[mod%i]%mod;</span></span>
<span class="line"><span>   cout&lt;&lt;inv[i]&lt;&lt;&#39;\\n&#39;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="二分查找" tabindex="-1"><a class="header-anchor" href="#二分查找"><span>二分查找</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll f(ll x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll t = 1, f = n;</span></span>
<span class="line"><span>	while (t&lt;=f)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		ll mid = t + f &gt;&gt; 1;</span></span>
<span class="line"><span>		if (cnt[mid] &lt; x)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			t = mid + 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			f = mid - 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>若存在，则返回第一次出现的下标</span></span>
<span class="line"><span>若不存在，则返回大于这个数的第一个数字下标</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll f(ll x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll t = 1, f = n;</span></span>
<span class="line"><span>	while (t&lt;=f)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		ll mid = t + f &gt;&gt; 1;</span></span>
<span class="line"><span>		if (cnt[mid] &lt;= x)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			t = mid + 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			f = mid - 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return f;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>若存在，则返回最后一次出现的下标</span></span>
<span class="line"><span>若不存在，则返回小于这个数的最后一个数字下标</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll f(ll x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll t = 1, f = n;</span></span>
<span class="line"><span>	while (t&lt;=f)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		ll mid = t + f &gt;&gt; 1;</span></span>
<span class="line"><span>		if (cnt[mid] &lt;= x)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			t = mid + 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			f = mid - 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return t;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>返回大于这个数字的第一个数字的下标</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ll f(ll x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll t = 1, f = n;</span></span>
<span class="line"><span>	while (t&lt;=f)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		ll mid = t + f &gt;&gt; 1;</span></span>
<span class="line"><span>		if (cnt[mid] &lt; x)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			t = mid + 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			f = mid - 1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return f;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>返回小于这个数字的第一个数字的下标</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二分查找函数" tabindex="-1"><a class="header-anchor" href="#二分查找函数"><span>二分查找函数</span></a></h2><p>任何有序容器都可以使用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>lower_bound(x)  STL:返回&gt;=x的第一个元素的迭代器(没找到返回end（）)</span></span>
<span class="line"><span>                数组：返回&gt;=x的第一个元素下标（没找到返回0）</span></span>
<span class="line"><span>upper_bound(x)  STL:返回&gt;=x的第一个元素的迭代器(没找到返回end（）)</span></span>
<span class="line"><span>                数组：返回&gt;=x的第一个元素下标（没找到返回0）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="选择方式" tabindex="-1"><a class="header-anchor" href="#选择方式"><span>选择方式</span></a></h1><h2 id="二进制枚举" tabindex="-1"><a class="header-anchor" href="#二进制枚举"><span>二进制枚举</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>eg:  1 2 3</span></span>
<span class="line"><span>     0 1 1</span></span>
<span class="line"><span>第二列1代表选取，0代表未选取</span></span>
<span class="line"><span>for (int i = 0; i &lt; (1&lt;&lt;n); i++)//例如n为3，则需要选择0 0 0**0 0 1**0 1 0....1 1 1，即为000到111（2^4-1次）</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int sum = 0;</span></span>
<span class="line"><span>	for (int j = 0; j &lt; n; j++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if ((1 &lt;&lt; j) &amp; i)//如当i选取1 0 1时，j==1时，sum加，j==2时，010&amp;010==0，sum不加...</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			sum += a[j];</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	set.insert(sum);//去重</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="排列方式" tabindex="-1"><a class="header-anchor" href="#排列方式"><span>排列方式</span></a></h1><h2 id="全排列" tabindex="-1"><a class="header-anchor" href="#全排列"><span>全排列</span></a></h2><p>即所有的可能性</p><p>eg:123的全排列 123 132 213 231 312 321<br> 有两种方法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1.DFS（利：无序数组也可以放入，弊：出现重复数字时会输出重复数组，此时用set可以去重）</span></span>
<span class="line"><span>void DFS(int x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if (x == n + 1)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			cout &lt;&lt; a[i];</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		return;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	set&lt;int&gt;s;</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (!v[i]&amp;&amp;s.find(v[i])==s.end())</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			v[i] = 1;//判断该数字是否被选择过</span></span>
<span class="line"><span>			s.insert(v[i]);//去重，保证不会讲重复数字排在同一位置</span></span>
<span class="line"><span>			a[x] = i;</span></span>
<span class="line"><span>			DFS(x + 1);</span></span>
<span class="line"><span>			v[i] = 0;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>2.函数（next_permutation(a,a+n)）(利：出现重复时不会重复输出，弊：&amp;&amp;一定要有序&amp;&amp;才可以排)</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int i = 0; i &lt; 3; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		cout &lt;&lt; a[i] &lt;&lt; &quot; \\n&quot;[i == 2];</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>} while (next_permutation(a, a + 3));</span></span>
<span class="line"><span>//让a自动排列出全排列（true），直到全输出（false）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="进制转换" tabindex="-1"><a class="header-anchor" href="#进制转换"><span>进制转换</span></a></h1><h2 id="_10进制转k进制" tabindex="-1"><a class="header-anchor" href="#_10进制转k进制"><span>10进制转k进制</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>（1.可存字母2.可超long3.先do是为了防止出现0的情况（不进行循环））</span></span>
<span class="line"><span>string _10tok(ll n,int k)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	string s = &quot;&quot;;</span></span>
<span class="line"><span>	do</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (n % k &lt; 10)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			s += (n % k) + &#39;0&#39;;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			s += (n % k) + &#39;A&#39; - 10;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		n /= k;</span></span>
<span class="line"><span>	} while (n);</span></span>
<span class="line"><span>	reverse(s.begin(), s.end());</span></span>
<span class="line"><span>	return s;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k进制转10进制" tabindex="-1"><a class="header-anchor" href="#k进制转10进制"><span>k进制转10进制</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>（可以边乘边取余）</span></span>
<span class="line"><span>ll kto10(int k, string s)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll n=0;</span></span>
<span class="line"><span>	int len = s.size();</span></span>
<span class="line"><span>	for (int i = 0; i &lt; len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		n *= k;</span></span>
<span class="line"><span>		if (s[i] &gt;= &#39;0&#39; &amp;&amp; s[i] &lt;= &#39;9&#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			n += s[i] - &#39;0&#39;;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			n += s[i] - &#39;A&#39; + 10;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return n;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="高精度" tabindex="-1"><a class="header-anchor" href="#高精度"><span>高精度</span></a></h1><h2 id="前置函数" tabindex="-1"><a class="header-anchor" href="#前置函数"><span>前置函数</span></a></h2><h3 id="去前置0" tabindex="-1"><a class="header-anchor" href="#去前置0"><span>去前置0</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>string _delete(string s)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int i = 0; i &lt; s.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (s[i] != &#39;0&#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			return  s.substr(i);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return &quot;0&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="去除小数点" tabindex="-1"><a class="header-anchor" href="#去除小数点"><span>去除小数点</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>string removed(string s)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int i = 0; i &lt; s.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (s[i] == &#39;.&#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			return s.substr(0, i) + s.substr(i+1);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return s;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高精度加法" tabindex="-1"><a class="header-anchor" href="#高精度加法"><span>高精度加法</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>string _plus(string a, string b)(限2个数大于0)</span></span>
<span class="line"><span>{  </span></span>
<span class="line"><span>	reverse(a.begin(), a.end());</span></span>
<span class="line"><span>	reverse(b.begin(), b.end());</span></span>
<span class="line"><span>	int len = max(a.size(), b.size());</span></span>
<span class="line"><span>	vector&lt;int&gt;v(len+5);</span></span>
<span class="line"><span>	for (int i = 0; i &lt; a.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		v[i] += a[i] - &#39;0&#39;;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 0; i &lt; b.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		v[i] += b[i] - &#39;0&#39;;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 0; i &lt; len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		v[i + 1] += v[i] / 10;</span></span>
<span class="line"><span>		v[i] %= 10;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	string sum;</span></span>
<span class="line"><span>	for (int i = 0; i &lt;= len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		sum += v[i] + &#39;0&#39;;</span></span>
<span class="line"><span>	}//加法等于len，减法不等，因为不会越减越大</span></span>
<span class="line"><span>	reverse(sum.begin(), sum.end());</span></span>
<span class="line"><span>	return _delete(sum);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高精度减法" tabindex="-1"><a class="header-anchor" href="#高精度减法"><span>高精度减法</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>string op = &quot;&quot;;</span></span>
<span class="line"><span>if (a.size() &lt; b.size() || a.size()==b.size()&amp;&amp;a &lt; b)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	op = &quot;-&quot;;</span></span>
<span class="line"><span>	swap(a, b);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>string _sub(string a, string b)</span></span>
<span class="line"><span>{  </span></span>
<span class="line"><span>	reverse(a.begin(), a.end());</span></span>
<span class="line"><span>	reverse(b.begin(), b.end());</span></span>
<span class="line"><span>	int len = max(a.size(), b.size());</span></span>
<span class="line"><span>	vector&lt;int&gt;v(len+5);</span></span>
<span class="line"><span>	for (int i = 0; i &lt; a.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		v[i] += a[i] - &#39;0&#39;;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 0; i &lt; b.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		v[i] -= b[i] - &#39;0&#39;;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 0; i &lt; len; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>	   while (v[i] &lt; 0)</span></span>
<span class="line"><span>	  {</span></span>
<span class="line"><span>	    v[i] += 10;</span></span>
<span class="line"><span>	    v[i + 1]--;</span></span>
<span class="line"><span>	  }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>	string sum;</span></span>
<span class="line"><span>	for (int i = 0; i &lt; len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		sum += v[i] + &#39;0&#39;;</span></span>
<span class="line"><span>	}//加法等于len，减法不等，因为不会越减越大</span></span>
<span class="line"><span>	reverse(sum.begin(), sum.end());</span></span>
<span class="line"><span>	return _delete(sum);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高精度乘法" tabindex="-1"><a class="header-anchor" href="#高精度乘法"><span>高精度乘法</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>string _mul(string a, string b)(限2个数大于0)</span></span>
<span class="line"><span>{  </span></span>
<span class="line"><span>	reverse(a.begin(), a.end());</span></span>
<span class="line"><span>	reverse(b.begin(), b.end());</span></span>
<span class="line"><span>	int len = len=a.size()+b.size();</span></span>
<span class="line"><span>	vector&lt;int&gt;v(len+5);</span></span>
<span class="line"><span>	for (int i = 0; i &lt; a.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int j = 0; j &lt; b.size(); j++)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			v[i+j] += (b[j] - &#39;0&#39;)*(a[i]-&#39;0&#39;);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}//（len=a.size()+b.size()）</span></span>
<span class="line"><span>	string sum;</span></span>
<span class="line"><span>	for (int i = 0; i &lt;= len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		sum += v[i] + &#39;0&#39;;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	reverse(sum.begin(), sum.end());</span></span>
<span class="line"><span>	return _delete(sum);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高精度除法" tabindex="-1"><a class="header-anchor" href="#高精度除法"><span>高精度除法</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>string _mul(string a, string b)(限2个数大于0)</span></span>
<span class="line"><span>{  </span></span>
<span class="line"><span> sum=&quot;&quot;;</span></span>
<span class="line"><span> string res;</span></span>
<span class="line"><span> for (int i = 0; i &lt; a.size(); i++)</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>	  sum =remove(sum+a[i]);</span></span>
<span class="line"><span>	  res+=&#39;0&#39;;</span></span>
<span class="line"><span>	  while (sum.size() &gt; b.size() || sum.size() == b.size() &amp;&amp; sum &gt;=b)</span></span>
<span class="line"><span>	  {</span></span>
<span class="line"><span>	 	  sum=sub(sum, b);</span></span>
<span class="line"><span>	 	  res[i]++;</span></span>
<span class="line"><span>	  }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span> return remove(res);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>函数结束后 sum 就是余数</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="前缀和-区间查询" tabindex="-1"><a class="header-anchor" href="#前缀和-区间查询"><span>前缀和（区间查询）</span></a></h1><h2 id="一维前缀和" tabindex="-1"><a class="header-anchor" href="#一维前缀和"><span>一维前缀和</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int a[N],b[N];//a原数组，b前缀和数组</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  cin&gt;&gt;n&gt;&gt;m;</span></span>
<span class="line"><span>for(int i=1;i&lt;=n;i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  cin&gt;&gt;a[i];</span></span>
<span class="line"><span>  b[i]=b[i-1]+a[i];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>  int l,r;</span></span>
<span class="line"><span>while(m--)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  cin&gt;&gt;l&gt;&gt;r;</span></span>
<span class="line"><span>  cout&lt;&lt;b[r]-b[l-1]；//输出区间和</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二维前缀和" tabindex="-1"><a class="header-anchor" href="#二维前缀和"><span>二维前缀和</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>memset(s, 0, sizeof(s));</span></span>
<span class="line"><span>for (int i = 0; i &lt; n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	ll a, b;</span></span>
<span class="line"><span>	cin &gt;&gt; a &gt;&gt; b;</span></span>
<span class="line"><span>	s[a][b] += a * b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 1; i &lt;= 1000; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int j = 1; j &lt;= 1000; j++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		s[i][j] += s[i][j - 1] + s[i - 1][j] - s[i - 1][j - 1];//构造：点原本自带的数字加上单边减1减去双边减1</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>while (q--)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int a1, b1, a2, b2;//1为小边,2为大边</span></span>
<span class="line"><span>	cin &gt;&gt; a1 &gt;&gt; b1 &gt;&gt; a2 &gt;&gt; b2;</span></span>
<span class="line"><span>	cout &lt;&lt; s[a2][b2] - s[a2][b1 - 1] - s[a1 - 1][b2] + s[a1 - 1][b1 - 1] &lt;&lt; &#39;\\n&#39;;//查询：就把构造反过来，一大边一小边</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="差分-区间修改" tabindex="-1"><a class="header-anchor" href="#差分-区间修改"><span>差分（区间修改）</span></a></h1><h2 id="一维差分" tabindex="-1"><a class="header-anchor" href="#一维差分"><span>一维差分</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>void insert(int l,int r,int c)//b数组是前缀和数组，注意使用差分则不能区间查询</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   b[l]+=c;</span></span>
<span class="line"><span>   b[r+1]-=c;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二维差分" tabindex="-1"><a class="header-anchor" href="#二维差分"><span>二维差分</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>void insert(int l,int r,int c)//b数组是前缀和数组，注意使用差分则不能区间查询</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>   b[l]+=c;</span></span>
<span class="line"><span>   b[r+1]-=c;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//查询</span></span>
<span class="line"><span>b[i][j]=b[i-1][j]+b[i][j-1]-b[i-1][j-1];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="树状数组" tabindex="-1"><a class="header-anchor" href="#树状数组"><span>树状数组</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int a[N];//原数组</span></span>
<span class="line"><span>int b[N];//树状数组</span></span>
<span class="line"><span>int lowbit(int x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    return x &amp; -x;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void add(int x, int k)//输入/更新</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    for (int i = x; i &lt;N; i += lowbit(i))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        b[i] += k;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int count(int r,int l)//求和/查询</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    int sum = 0;</span></span>
<span class="line"><span>    for (int i = r; i; i -= lowbit(i))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        sum += b[i];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for (int i = l - 1; i; i -= lowbit(i))</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        sum -= b[i];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return sum;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="stl容器" tabindex="-1"><a class="header-anchor" href="#stl容器"><span>STL容器</span></a></h1><p>具体的看群里文件</p><h2 id="小tip" tabindex="-1"><a class="header-anchor" href="#小tip"><span>小tip：</span></a></h2><p>关于map的边遍历边删除（先加入一个大于数据范围的键值（防空），最后在将其删除）</p><pre><code>mp[1000000009] = 1;
auto t = mp.begin();//上一个迭代器
bool o = 0;
for (auto i = mp.begin(); i != mp.end(); i++)
{
   if (o)
   {
    mp.erase(t);
    o = 0;
   }
   f ((*i).second &lt; b)//不满足条件的，将在下一次删除
   {
     o = 1;
     t = i;
   }
}
mp.erase(1000000009);
</code></pre><h1 id="bfs-走地图" tabindex="-1"><a class="header-anchor" href="#bfs-走地图"><span>BFS（走地图）</span></a></h1><p>一定注意看清x轴和y轴！！！</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int sx, sy, ex, ey;//起点坐标与终点坐标</span></span>
<span class="line"><span>char mp[25][25];</span></span>
<span class="line"><span>int dir[4][2] = { 0,1,0,-1,1,0,-1,0 };//方向数组</span></span>
<span class="line"><span>bool v[25][25];</span></span>
<span class="line"><span>struct Point</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    int x, y，s;//坐标和步数</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int BFS()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Point begin = { sx,sy,0 };</span></span>
<span class="line"><span>    v[sx][sy] = 1;</span></span>
<span class="line"><span>    queue&lt;Point&gt;q;</span></span>
<span class="line"><span>    q.push(begin);</span></span>
<span class="line"><span>    while (q.size())</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        auto front = q.front();</span></span>
<span class="line"><span>        q.pop();</span></span>
<span class="line"><span>        if (front.x == ex &amp;&amp; front.y == ey)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          return front.s;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        for (int i = 0; i &lt; 4; i++)//四个方向</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            int nx = front.x + dir[i][0];</span></span>
<span class="line"><span>            int ny = front.y + dir[i][1];</span></span>
<span class="line"><span>            if (mp[nx][ny] != &#39;#&#39; &amp;&amp; !v[nx][ny])</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                q.push({ nx,ny,front.s + c });</span></span>
<span class="line"><span>                v[nx][ny] = 1;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="并查集" tabindex="-1"><a class="header-anchor" href="#并查集"><span>并查集</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int fa[6000];</span></span>
<span class="line"><span>int rank_[6000];</span></span>
<span class="line"><span>int size[6000];</span></span>
<span class="line"><span>int find(int x)//正常查找父节点</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	return  x == fa[x] ? x : find(fa[x]);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int find(int x)//压缩路径查找父节点</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	return  x == fa[x] ? x : (fa[x] = find(fa[x]));</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 0; i &lt; 5700; i++)//正常初始化</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	fa[i] = i;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void merge(int i, int j)//正常合并</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	fa[find(i)] = find(j);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void merge(int i, int j)//按照秩(树高)初始化</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	fa[i] = i;</span></span>
<span class="line"><span>	rank[i] = 1;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void rank_merge(int i, int j)//按照秩(树高)合并</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int x = find(i), y = find(j);</span></span>
<span class="line"><span>	if (rank_[x] &lt;= rank_[y])</span></span>
<span class="line"><span>		fa[x] = y;</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>		fa[y] = x;</span></span>
<span class="line"><span>	if (rank_[x] == rank_[y] &amp;&amp; x != y)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		rank_[y]++;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void rank_merge(int i, int j)//按照秩(节点数)合并</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int x = find(i), y = find(j);</span></span>
<span class="line"><span>	if (x == y)</span></span>
<span class="line"><span>		return;</span></span>
<span class="line"><span>	if(size[x]&gt;size(y))</span></span>
<span class="line"><span>		swap(x,y);</span></span>
<span class="line"><span>		fa[x]=y;</span></span>
<span class="line"><span>		size[y]+=size[x];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="容斥原理" tabindex="-1"><a class="header-anchor" href="#容斥原理"><span>容斥原理</span></a></h1><p>1.奇加偶减</p><p>求 100以内 2 3 5有多少的倍数，（算出sum+=2，3，5的倍数，sum-=【2，3】，【2，5】【3，5】的倍数，sum+=【2，3，5】的倍数）【】为lcm（最小公倍数）</p><p>2.正难则反</p><h1 id="动态规划dp" tabindex="-1"><a class="header-anchor" href="#动态规划dp"><span>动态规划dp</span></a></h1><h2 id="记忆化搜索" tabindex="-1"><a class="header-anchor" href="#记忆化搜索"><span>记忆化搜索</span></a></h2><p>找到已经查询过的数字</p><h2 id="线性dp" tabindex="-1"><a class="header-anchor" href="#线性dp"><span>线性dp</span></a></h2><h3 id="求最长上升子序列" tabindex="-1"><a class="header-anchor" href="#求最长上升子序列"><span>求最长上升子序列</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>memset(b, 0x3f, sizeof(b));//先赋</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	cin &gt;&gt; a[i];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int len = 0;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int x = lower_bound(b+1, b + len+1, a[i])-b;//二分找到合适的位置用更小的替换</span></span>
<span class="line"><span>	b[x] = a[i];</span></span>
<span class="line"><span>	len = max(len, x);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_01背包-两种状态的dp" tabindex="-1"><a class="header-anchor" href="#_01背包-两种状态的dp"><span>01背包（两种状态的dp）</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi</p><p>思考：物品作为阶段，容量作为状态 得出</p><p><strong>在这个重量时，拿与不拿的最佳状态</strong></p></blockquote><pre><code>int w[1002],v[1002];//weight value
int dp[1002][1002];//num weight = value
int main() {
	int m, n;
	cin &gt;&gt; m &gt;&gt; n;
	for (int i = 1; i &lt;= n; i++)
	{
		int a, b;
		cin &gt;&gt; a &gt;&gt; b;
		w[i] = a;
		v[i] = b;
	}
	for (int i = 1; i &lt;= n; i++)//第几个物品
	{
		for (int j = 1; j &lt;=m; j++)//在这个空间下的最大价值
		{
			if (j &gt;= w[i])//拿的下就拿
			{
				dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
			}
			else//拿不下就跳
			{
				dp[i][j] = dp[i - 1][j];
			}
		}
	}
	cout &lt;&lt; dp[n][m];
	return 0;
}//留下很多信息，方案题适用
</code></pre><h3 id="压缩成二维" tabindex="-1"><a class="header-anchor" href="#压缩成二维"><span>压缩成二维</span></a></h3><blockquote><p>每一行的dp，只与其<strong>上一行的前面的数据</strong>相关，如果不需要前面每一的数据，则可以优化一下空间，可以用两个数组交替保存每一行的信息</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int w[1002],v[1002];//weight value</span></span>
<span class="line"><span>int dp[2][1002];//num weight = value</span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>	int m, n;</span></span>
<span class="line"><span>	cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int a, b;</span></span>
<span class="line"><span>		cin &gt;&gt; a &gt;&gt; b;</span></span>
<span class="line"><span>		w[i] = a;</span></span>
<span class="line"><span>		v[i] = b;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)//第几个物品</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int j = 1; j &lt;= m; j++)//在这个空间下的最大价值</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			if (j &gt;= w[i])//拿的下就拿</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				dp[i &amp; 1][j] = max(dp[(i - 1) &amp; 1][j], dp[(i - 1) &amp; 1][j - w[i]] + v[i]);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			else//拿不下就跳</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				dp[i &amp; 1][j] = dp[(i - 1) &amp; 1][j];</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	cout &lt;&lt; dp[n&amp;1][m];</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="压缩成一维" tabindex="-1"><a class="header-anchor" href="#压缩成一维"><span>压缩成一维</span></a></h3><blockquote><p><strong>（前提是）<strong>每一行的dp，只与其</strong>上一行的前面的数据</strong>相关，如果不需要前面每一的数据，则可以优化一下空间，因为是前面的数据，直接用会被覆盖，所以要反向dp，相当于在同一行操作，后面的是新的，前面的是旧的。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int w[1002],v[1002];//weight value</span></span>
<span class="line"><span>int dp[1002];//weight = value</span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>	int m, n;</span></span>
<span class="line"><span>	cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int a, b;</span></span>
<span class="line"><span>		cin &gt;&gt; a &gt;&gt; b;</span></span>
<span class="line"><span>		w[i] = a;</span></span>
<span class="line"><span>		v[i] = b;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)//第几个物品</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int j = m; j &gt;= w[i]; j--)//在这个空间下的最大价值</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			dp[j] = max(dp[j], dp[j - w[i]] + v[i]);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	cout &lt;&lt; dp[m];</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多重01背包" tabindex="-1"><a class="header-anchor" href="#多重01背包"><span>多重01背包</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi,<strong>一个物品可以选k次</strong></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int w[1002],v[1002];//weight value</span></span>
<span class="line"><span>int dp[1002];//weight = value</span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>	int m, n;</span></span>
<span class="line"><span>	cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>	int pos=1;</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int a, b,c;</span></span>
<span class="line"><span>		cin &gt;&gt; a &gt;&gt; b&gt;&gt;c;</span></span>
<span class="line"><span>		w[i] = a;</span></span>
<span class="line"><span>		v[i] = b;</span></span>
<span class="line"><span>		for(int j=1;j&lt;=c;j*=2)//1 2 4 8...一定可以组成c以内的所有的数字(二进制拆分)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			w[pos]=a*j;</span></span>
<span class="line"><span>			v[pos++]=b*j;</span></span>
<span class="line"><span>			c-=j;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		if(c!=0)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			w[pos]=a*c;</span></span>
<span class="line"><span>			v[pos++]=b*c;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 1; i &lt; pow; i++)//第几个物品(注意是pos不是N)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int j = m; j &gt;= w[i]; j--)//在这个空间下的最大价值</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			dp[j] = max(dp[j], dp[j - w[i]] + v[i]);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	cout &lt;&lt; dp[m];</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完全01背包" tabindex="-1"><a class="header-anchor" href="#完全01背包"><span>完全01背包</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi,<strong>一个物品可以选无数次</strong></p><p>思考：01背包压缩成一维时，为了避免重复选择而反向dp，所避免的重复选择不正是完全背包</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int w[1002],v[1002];//weight value</span></span>
<span class="line"><span>int dp[1002];//weight = value</span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>	int m, n;</span></span>
<span class="line"><span>	cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int a, b;</span></span>
<span class="line"><span>		cin &gt;&gt; a &gt;&gt; b;</span></span>
<span class="line"><span>		w[i] = a;</span></span>
<span class="line"><span>		v[i] = b;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)//第几个物品</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int j = w[i]; j &lt;= m; j++)//在这个空间下的最大价值</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			dp[j] = max(dp[j], dp[j - w[i]] + v[i]);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	cout &lt;&lt; dp[m];</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="混合01背包" tabindex="-1"><a class="header-anchor" href="#混合01背包"><span>混合01背包</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi,<strong>一个物品可以选k次，k为0则可以无限选取</strong></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int w[1002],v[1002]，k[1002];//weight value cnt</span></span>
<span class="line"><span>int dp[1002];//weight = value</span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>	int m, n;</span></span>
<span class="line"><span>	cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>	int pos = 1;</span></span>
<span class="line"><span>	for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int a, b, c;</span></span>
<span class="line"><span>		cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;</span></span>
<span class="line"><span>		if (c == 0)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			w[pos] = a ;</span></span>
<span class="line"><span>			k[pos] = c;</span></span>
<span class="line"><span>			v[pos++] = b;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		for (int j = 1; c &gt;= j; j *= 2)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			w[pos] = a * j;</span></span>
<span class="line"><span>			v[pos] = b * j;</span></span>
<span class="line"><span>			k[pos++] = 1;</span></span>
<span class="line"><span>			c -= j;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		if (c != 0)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			w[pos] = a * c;</span></span>
<span class="line"><span>			k[pos] = 1;</span></span>
<span class="line"><span>			v[pos++] = b * c;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 1; i &lt; pos; i++)//第几个物品</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (k[i])//多重</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			for (int j = m; j &gt;= w[i]; j--)//在这个空间下的最大价值</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				dp[j] = max(dp[j], dp[j - w[i]] + v[i]);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else//完全</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			for (int j = w[i]; j &lt;= m; j++)//在这个空间下的最大价值</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				dp[j] = max(dp[j], dp[j - w[i]] + v[i]);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	cout &lt;&lt; dp[m];</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分组01背包" tabindex="-1"><a class="header-anchor" href="#分组01背包"><span>分组01背包</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi，所属组号为ki（组号相同的物品至多选取一个）</p><p>核心是将重量与物品位置对换，实现重量为阶段，物品为状态，就可以得出</p><p><strong>在考虑拿不拿这个物品时的，拿与不拿的最佳重量下的状态</strong></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int m, n;</span></span>
<span class="line"><span>cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int a, b, c;</span></span>
<span class="line"><span>	cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;</span></span>
<span class="line"><span>	w[c][i] = a;</span></span>
<span class="line"><span>	v[c][i] = b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 1; i &lt;= 100; i++)//组号</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int j = m; j &gt;= 0; j--)//重量</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int k = 1; k &lt;= n; k++)//物品</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			if (w[i][k] &lt;= j)</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				dp[j] = max(dp[j], dp[j - w[i][k]] + v[i][k]);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>cout &lt;&lt; dp[m];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二维01背包" tabindex="-1"><a class="header-anchor" href="#二维01背包"><span>二维01背包</span></a></h2><blockquote><p>有N件物品和一个容量为M，容积为V的卡车。</p><p>已知第i件物品的重量是wi，体积是vi,价值是vi</p><p>求解如何选取物品才能使装入卡车的物品价值总和最大。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int w[102], v[102],t[102];//weight value volume</span></span>
<span class="line"><span>int dp[1002][1002];</span></span>
<span class="line"><span>int x,y,z;</span></span>
<span class="line"><span>cin &gt;&gt; x&gt;&gt;y&gt;&gt;z;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= x; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int a;</span></span>
<span class="line"><span>	cin &gt;&gt; a ;</span></span>
<span class="line"><span>	w[i] = a;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 1; i &lt;= x; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int a;</span></span>
<span class="line"><span>	cin &gt;&gt; a;</span></span>
<span class="line"><span>	t[i] = a;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 1; i &lt;= x; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int a;</span></span>
<span class="line"><span>	cin &gt;&gt; a;</span></span>
<span class="line"><span>	v[i] = a;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 1; i &lt;= x; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int j = y; j &gt;= 0; j--)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		for (int k = z; k &gt;= 0; k--)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			if (w[i] &lt;= j &amp;&amp; t[i] &lt;= k)</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				dp[j][k] = max(dp[j][k], dp[j - w[i]][k - t[i]] + v[i]);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>cout &lt;&lt; dp[y][z];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_01背包问题求具体方案" tabindex="-1"><a class="header-anchor" href="#_01背包问题求具体方案"><span>01背包问题求具体方案</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi</p><p>求解如何选取物品才能使装入背包的物品价值总和最大。</p><p>（物品从N选到1）</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int m,n;</span></span>
<span class="line"><span>cin &gt;&gt; m&gt;&gt;n;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int a, b;</span></span>
<span class="line"><span>	cin &gt;&gt; a &gt;&gt; b;</span></span>
<span class="line"><span>	w[i] = a;</span></span>
<span class="line"><span>	v[i] = b;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = n; i &gt;= 1; i--)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int j = 1; j &lt;= m; j++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (j &gt;= w[i])</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			dp[i][j] = max(dp[i + 1][j], dp[i + 1][j - w[i]]+v[i]);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			dp[i][j] = dp[i + 1][j];</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int x = m;</span></span>
<span class="line"><span>int t = 0;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if (x &gt;= w[i] &amp;&amp; dp[i][x] == dp[i + 1][x - w[i]]+v[i])</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (t++)cout &lt;&lt; &quot; &quot;;</span></span>
<span class="line"><span>		cout &lt;&lt; i;</span></span>
<span class="line"><span>		x -= w[i];</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容量很大的01背包问题" tabindex="-1"><a class="header-anchor" href="#容量很大的01背包问题"><span>容量很大的01背包问题</span></a></h2><blockquote><p>有N件物品和一个容量为M的背包。</p><p>已知第i件物品的重量是wi，价值是vi（1≤M≤1e9，1≤N≤100）</p><p>(翻转dp的含义，在这个价值下的最小重量，最后一个值小于容量的dp则为答案)</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>int m, n;</span></span>
<span class="line"><span>cin &gt;&gt; m &gt;&gt; n;</span></span>
<span class="line"><span>memset(dp, 0x3f, sizeof dp);</span></span>
<span class="line"><span>dp[0] = 0;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	cin &gt;&gt; w[i] &gt;&gt; v[i];</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int a = 0;</span></span>
<span class="line"><span>for (int i = 1; i &lt;= n; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int j = MAX_VALUE; j &gt;=v[i]; j--)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		dp[j] = min(dp[j], dp[j - v[i]] + w[i]);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (int i = 0; i &lt;= MAX_VALUE; i++)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if (dp[i] &lt;= m)</span></span>
<span class="line"><span>		a = max(i, a);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>cout &lt;&lt; a;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="堆" tabindex="-1"><a class="header-anchor" href="#堆"><span>堆</span></a></h1><p>堆的前提是必须是完全二叉树（只允许树的最后一排不为满，且顺序从左往右，中间不能空缺）</p><p>大根堆：父元素节点大于子节点元素</p><p>小根堆：子节点元素大于父节点元素</p><blockquote><p><strong>节点下标为i，则：左子节点下标为2i+1，右子节点下标为2i+2</strong></p></blockquote><p>下沉：如在大根堆中，有一个节点破坏了堆序性，那么每次都较大的子节点交换，这个节点就会下沉到对应的位置（Ologn）</p><p>上浮：如在小根堆中，有一个节点破坏了堆序性，那么每次父节点大于这个节点，则交换，这个节点会上浮到对应的位置（用于插入，O（logn））</p><p>自顶向下建堆法：每次插入，对每次插入的元素进行上浮</p><p>自下而上建堆法：全部插入，从下往上进行下沉操作</p><p>优先队列：利用小根堆，每次弹出父节点（即最小节点），然后把最后一个根节点放在弹出父节点的位置，然后进行下沉</p><h1 id="排序" tabindex="-1"><a class="header-anchor" href="#排序"><span>排序</span></a></h1><h2 id="快速排序" tabindex="-1"><a class="header-anchor" href="#快速排序"><span>快速排序</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>void sort_(int a[], int low, int high)//low是最低位的下标，high是最高位数的下标（a.size()-1）</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if (low &gt;= high) return;</span></span>
<span class="line"><span>	int i = low - 1;</span></span>
<span class="line"><span>	int j = high + 1;</span></span>
<span class="line"><span>	int key = a[i + j &gt;&gt; 1];</span></span>
<span class="line"><span>	while (i &lt; j)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		do i++; while (a[i] &lt; key);</span></span>
<span class="line"><span>		do j--; while (a[j] &gt; key);</span></span>
<span class="line"><span>		if (i &lt; j)swap(a[i], a[j]);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	sort_(a, low, j);</span></span>
<span class="line"><span>	sort_(a, j + 1, high);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="归并排序" tabindex="-1"><a class="header-anchor" href="#归并排序"><span>归并排序</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>void merge(int arr[], int tempArr[],int left,int mid,int right)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int l_pos = left;</span></span>
<span class="line"><span>	int r_pos = mid+1;</span></span>
<span class="line"><span>	int pos = left;//答案数组的下标</span></span>
<span class="line"><span>	while (l_pos &lt;= mid &amp;&amp; r_pos &lt;= right)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (arr[l_pos] &lt; arr[r_pos])</span></span>
<span class="line"><span>			tempArr[pos++] = arr[l_pos++];</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>			tempArr[pos++] = arr[r_pos++];</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	while (l_pos &lt;= mid)//剩余</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		tempArr[pos++] = arr[l_pos++];</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	while (r_pos &lt;= right)//剩余</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		tempArr[pos++] = arr[r_pos++];</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	//临时数组的数组传入原数组</span></span>
<span class="line"><span>	while (left &lt;= right)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		arr[left] = tempArr[left];</span></span>
<span class="line"><span>		left++;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void msort(int arr[], int tempArr[], int left,int right)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if (left &lt; right)//等于的时候结束</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int mid = (left + right) / 2;</span></span>
<span class="line"><span>		msort(arr,tempArr,left,mid);</span></span>
<span class="line"><span>		msort(arr,tempArr, mid+1, right);</span></span>
<span class="line"><span>		//完成划分后进入合并</span></span>
<span class="line"><span>		merge(arr, tempArr, left, mid, right);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="最短路" tabindex="-1"><a class="header-anchor" href="#最短路"><span>最短路</span></a></h1><h2 id="dijkstra" tabindex="-1"><a class="header-anchor" href="#dijkstra"><span>Dijkstra</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>vector&lt;int&gt;Dijkstra(int n,int stay) {</span></span>
<span class="line"><span>	vector&lt;int&gt;dis(n, 0x3f3f3f);</span></span>
<span class="line"><span>	vector&lt;bool&gt;vis(n, 0);</span></span>
<span class="line"><span>	dis[stay] = 0;</span></span>
<span class="line"><span>	priority_queue&lt;pair&lt;int, int&gt;, vector&lt;pair&lt;int, int&gt;&gt;, greater&lt;pair&lt;int, int&gt;&gt;&gt; q;</span></span>
<span class="line"><span>	q.push({ 0,stay });</span></span>
<span class="line"><span>	while (q.size())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int point = q.top().second;</span></span>
<span class="line"><span>		int d = q.top().first;</span></span>
<span class="line"><span>		q.pop();</span></span>
<span class="line"><span>		if (vis[point])</span></span>
<span class="line"><span>			continue;</span></span>
<span class="line"><span>		for (int i = 0; i &lt; n; i++)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			int now_dis = d+mp[point][i];</span></span>
<span class="line"><span>			if (mp[point][i]!=0&amp;&amp;!vis[i])</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				if (now_dis &lt; dis[i])</span></span>
<span class="line"><span>				{</span></span>
<span class="line"><span>					dis[i] = now_dis;</span></span>
<span class="line"><span>					q.push({ now_dis ,i });</span></span>
<span class="line"><span>				}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return dis;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,148)])])}const v=n(e,[["render",p]]),r=JSON.parse('{"path":"/demo/note.html","title":"笔记","lang":"zh-CN","frontmatter":{"title":"笔记","icon":"book","order":5,"category":["算法"],"tag":["算法笔记"],"description":"质数 6倍速普通方法 埃筛（时间换内存） 欧拉筛（内存换时间） 计算方式 求余 龟速乘（防止炸范围） 快速幂（防止超时） 矩阵快速幂 最大公因数 最小公倍数 组合数（C（n,m）） 对点求版（数学原理建议版） 预处理版 排列数（A（n,m）） 逆元 逆元：一个数字被除时取模，等于乘以这个数在这个mod下的逆元（与mod互质时才存在） 对点求 线性求逆元...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"笔记\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-10-18T11:21:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Swordfish\\",\\"url\\":\\"https://mister-hope.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/demo/note.html"}],["meta",{"property":"og:site_name","content":"博客演示"}],["meta",{"property":"og:title","content":"笔记"}],["meta",{"property":"og:description","content":"质数 6倍速普通方法 埃筛（时间换内存） 欧拉筛（内存换时间） 计算方式 求余 龟速乘（防止炸范围） 快速幂（防止超时） 矩阵快速幂 最大公因数 最小公倍数 组合数（C（n,m）） 对点求版（数学原理建议版） 预处理版 排列数（A（n,m）） 逆元 逆元：一个数字被除时取模，等于乘以这个数在这个mod下的逆元（与mod互质时才存在） 对点求 线性求逆元..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-18T11:21:45.000Z"}],["meta",{"property":"article:tag","content":"算法笔记"}],["meta",{"property":"article:modified_time","content":"2025-10-18T11:21:45.000Z"}]]},"git":{"createdTime":1760779027000,"updatedTime":1760786505000,"contributors":[{"name":"jandSwordfish","username":"jandSwordfish","email":"2771030100@qq.com","commits":2,"url":"https://github.com/jandSwordfish"}]},"readingTime":{"minutes":17.72,"words":5315},"filePathRelative":"demo/note.md","excerpt":"\\n<h2>6倍速普通方法</h2>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-\\"><span class=\\"line\\"><span>bool isPrime(int n)</span></span>\\n<span class=\\"line\\"><span>{</span></span>\\n<span class=\\"line\\"><span>\\tif (n == 2 || n == 3)</span></span>\\n<span class=\\"line\\"><span>\\t\\treturn 1;</span></span>\\n<span class=\\"line\\"><span>\\tif (n % 6 != 1 &amp;&amp; n % 6 != 5)</span></span>\\n<span class=\\"line\\"><span>\\t\\treturn 0;</span></span>\\n<span class=\\"line\\"><span>\\tfor (int i = 5;i * i &lt;= n;i += 6)</span></span>\\n<span class=\\"line\\"><span>\\t\\tif (n % i == 0 || n % (i + 2) == 0)</span></span>\\n<span class=\\"line\\"><span>\\t\\t\\treturn 0;</span></span>\\n<span class=\\"line\\"><span>\\treturn n &gt; 1;</span></span>\\n<span class=\\"line\\"><span>}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{v as comp,r as data};

import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,a as i,b as l,o as p}from"./app-BP1AMqiq.js";const t={};function d(r,n){return p(),a("div",null,[n[0]||(n[0]=e("p",null,"一些神奇的代码，谨慎使用",-1)),i(" more "),n[1]||(n[1]=l(`<h1 id="神秘代码" tabindex="-1"><a class="header-anchor" href="#神秘代码"><span>神秘代码</span></a></h1><h2 id="b站视频下载" tabindex="-1"><a class="header-anchor" href="#b站视频下载"><span>b站视频下载</span></a></h2><div class="hint-container tip"><p class="hint-container-title">项目结构</p><p>├─ video(存放视频与弹幕)<br> └─ chromedriver.exe(浏览器驱动)<br> └─ b站视频爬取. py<br> └─ danmu. py</p></div><div class="hint-container info"><p class="hint-container-title"><a href="http://danmu.py" target="_blank" rel="noopener noreferrer">danmu.py</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>import os</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>from selenium import webdriver</span></span>
<span class="line"><span>from selenium.webdriver.chrome.options import Options</span></span>
<span class="line"><span>from selenium.webdriver.common.by import By</span></span>
<span class="line"><span>from selenium.webdriver.chrome.service import Service</span></span>
<span class="line"><span>import shutil</span></span>
<span class="line"><span>from lxml import etree</span></span>
<span class="line"><span>import requests</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def dan(title,cid):</span></span>
<span class="line"><span>    url = f&#39;https://comment.bilibili.com/{cid}.xml&#39;</span></span>
<span class="line"><span>    cookie = &quot;buvid3=2BCC7CFB-D8F2-7BDF-58A9-512A14A2E26968567infoc; b_nut=1720094768; _uuid=379D9B10D-B1E10-4ACD-69EA-DDABB69F2DA1069148infoc; enable_web_push=DISABLE; buvid4=A3BC4746-4B86-A768-254C-12732E3FB35269234-024070412-m2Mm%2B8NyEGwzmtEpQt1oTw%3D%3D; header_theme_version=CLOSE; buvid_fp_plain=undefined; rpdid=|(u))Yklul|Y0J&#39;u~k||mR)Jk; hit-dyn-v2=1; LIVE_BUVID=AUTO4717245732014930; PVID=1; DedeUserID=355151699; DedeUserID__ckMd5=e51aa13b52e2b5c0; fingerprint=f439853c2afa5d083520f823be4bd469; enable_feed_channel=DISABLE; buvid_fp=f439853c2afa5d083520f823be4bd469; CURRENT_QUALITY=80; home_feed_column=5; browser_resolution=1440-765; SESSDATA=20835340%2C1754828067%2Cc91e5%2A22CjDAXZnWt4PrBlAVCE8qNPAQq-RV-elIUVQttgENQw85bkpuwUJy2S-1F8z0-ykPGfISVmRhMUlpTW9oaVgybnhwOFd2MWw2dGU5c0lpWGw5cGctMm96YS1JZk5meW5KWXBUVXI5bTNxN0tpZEVwdlZiQzRiWWNtTXR2R0RRakFqNXBWT2lsWU53IIEC; bili_jct=f7e14734937a8894c78c659f14253439; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk1MzkyNzMsImlhdCI6MTczOTI4MDAxMywicGx0IjotMX0.b0w45ZZ9OUv1pyd1g1t0du3mPI3ck-WYf5YlqNWsUuk; bili_ticket_expires=1739539213; bmg_af_switch=1; bmg_src_def_domain=i0.hdslb.com; sid=6jvjcwgx; bp_t_offset_355151699=1032972920684544000; b_lsid=8DC637C7_194F92DA28F; CURRENT_FNVAL=4048&quot;</span></span>
<span class="line"><span>    headers = {</span></span>
<span class="line"><span>        &quot;Referer&quot;: url,</span></span>
<span class="line"><span>        &quot;User-Agent&quot;: &quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36&quot;,</span></span>
<span class="line"><span>        &quot;Cookie&quot;: cookie</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    response = requests.get(url=url, headers=headers)</span></span>
<span class="line"><span>    xml = etree.fromstring(response.content)</span></span>
<span class="line"><span>    # 解析数据</span></span>
<span class="line"><span>    with open(f&quot;video\\\\{title}.xml&quot;, &quot;wb&quot;) as f:</span></span>
<span class="line"><span>        f.write(response.content)</span></span>
<span class="line"><span>    response.close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mode = Options()</span></span>
<span class="line"><span>    mode.add_argument(&#39;--headless&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    driver = webdriver.Chrome(service=Service(r&#39;D:\\fjy\\wangye auto\\chromedriver.exe&#39;), options=mode)  # 需指定浏览器驱动路径(需要替换)</span></span>
<span class="line"><span>    driver.get(&quot;https://tiansh.github.io/us-danmaku/bilibili/&quot;)  # 替换为实际URL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 找到文件上传输入框并上传文件</span></span>
<span class="line"><span>    upload_element = driver.find_element(By.CSS_SELECTOR, &quot;#upload&quot;)</span></span>
<span class="line"><span>    upload_element.send_keys(f&quot;D:\\\\fjy\\\\wangye auto\\\\video\\\\{title}.xml&quot;)# (需要替换)</span></span>
<span class="line"><span>    time.sleep(3)</span></span>
<span class="line"><span>    shutil.move(f&quot;C:\\\\Users\\\\27710\\\\Downloads\\\\{title}.ass&quot;, f&quot;D:\\\\fjy\\\\wangye auto\\\\video&quot;)# (需要替换)</span></span>
<span class="line"><span>    os.remove(f&quot;video\\\\{title}.xml&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="hint-container info"><p class="hint-container-title"><a href="http://xn--b-e38aw54g2wh4xshju.py" target="_blank" rel="noopener noreferrer">b站视频爬取.py</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>import os</span></span>
<span class="line"><span>import random</span></span>
<span class="line"><span>from datetime import time</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>import requests</span></span>
<span class="line"><span>import re</span></span>
<span class="line"><span>import json</span></span>
<span class="line"><span>import danmu</span></span>
<span class="line"><span>import subprocess</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cookie = &#39;&#39;&#39;需要替换为你自己的cookie，自动下载最高清晰的（有会员会更高），cookie为在b站视频按下F12-&gt;网络-&gt;web?content...-&gt;请求标头-&gt;cookie&#39;&#39;&#39;#(需要替换)</span></span>
<span class="line"><span>headers = {</span></span>
<span class="line"><span>        &quot;Referer&quot;: &quot;url&quot;,</span></span>
<span class="line"><span>        &quot;User-Agent&quot;: &quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36&quot;,</span></span>
<span class="line"><span>        &quot;Cookie&quot;: cookie</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>proxies = {</span></span>
<span class="line"><span>        &#39;http&#39;: &#39;http://59.39.63.54&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>def download(url,n):</span></span>
<span class="line"><span>    time.sleep(random.random() * (int(n) % 10))</span></span>
<span class="line"><span>    headers[&quot;Referer&quot;] = url</span></span>
<span class="line"><span>    # 发送请求</span></span>
<span class="line"><span>    response = requests.get(url=url, headers=headers)</span></span>
<span class="line"><span>    cid = re.findall(&#39;\\&quot;cid&quot;:(.*?),\\&quot;p&#39;, response.text)[0]</span></span>
<span class="line"><span>    html = response.text</span></span>
<span class="line"><span>    title = re.findall(&#39;title=&quot;(.*?)&quot;&#39;, html)[0]</span></span>
<span class="line"><span>    title = title.replace(&quot; &quot;,&quot;&quot;)</span></span>
<span class="line"><span>    title = title.replace(&quot;/&quot;, &quot;&quot;)</span></span>
<span class="line"><span>    title = title.replace(&quot;|&quot;, &quot;&quot;)</span></span>
<span class="line"><span>    title = title.replace(&quot;&amp;&quot;, &quot;&quot;)</span></span>
<span class="line"><span>    print(&quot;下载视频&quot;+title+n+&quot;中...&quot;)</span></span>
<span class="line"><span>    info = re.findall(&quot;window.__playinfo__=(.*?)&lt;/script&gt;&quot;, html)[0]</span></span>
<span class="line"><span>    json_data = json.loads(info)</span></span>
<span class="line"><span>    video_url = json_data[&#39;data&#39;][&#39;dash&#39;][&#39;video&#39;][0][&#39;base_url&#39;]</span></span>
<span class="line"><span>    audio_url = json_data[&#39;data&#39;][&#39;dash&#39;][&#39;audio&#39;][0][&#39;base_url&#39;]</span></span>
<span class="line"><span>    print(json_data[&#39;data&#39;][&#39;dash&#39;][&#39;video&#39;][0][&#39;id&#39;])</span></span>
<span class="line"><span>    video_content = requests.get(url=video_url, headers=headers).content</span></span>
<span class="line"><span>    audio_content = requests.get(url=audio_url, headers=headers).content</span></span>
<span class="line"><span>    v_path=&#39;video\\\\&#39; + n + &#39;v&#39; + title + &#39;.mp4&#39;</span></span>
<span class="line"><span>    a_path = &#39;video\\\\&#39; + n + &#39;a&#39; + title + &#39;.mp3&#39;</span></span>
<span class="line"><span>    out_path =&#39;video\\\\&#39; + title +&quot;_&quot;+ n + &#39;.mp4&#39;</span></span>
<span class="line"><span>    with open(v_path, mode=&#39;wb&#39;) as v:</span></span>
<span class="line"><span>        v.write(video_content)</span></span>
<span class="line"><span>    with open(a_path, mode=&#39;wb&#39;) as a:</span></span>
<span class="line"><span>        a.write(audio_content)</span></span>
<span class="line"><span>    cmd = f&quot;D:/ChromeDownload/ffmpeg-7.1-essentials_build/ffmpeg-7.1-essentials_build/bin/ffmpeg.exe -n -i {v_path} -i {a_path} -c:v copy -c:a aac -strict experimental {out_path}&quot;#(需要替换)</span></span>
<span class="line"><span>    subprocess.run(cmd,stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)</span></span>
<span class="line"><span>    os.remove(v_path)</span></span>
<span class="line"><span>    os.remove(a_path)</span></span>
<span class="line"><span>    danmu.dan(title +&quot;_&quot;+ n, cid)</span></span>
<span class="line"><span>    print(title+str(n)+&quot;完成！&quot;)</span></span>
<span class="line"><span>    response.close()</span></span>
<span class="line"><span>if __name__==&#39;__main__&#39;:</span></span>
<span class="line"><span>    print(&quot;b站视频下载&quot;)</span></span>
<span class="line"><span>    n = input(&quot;1.单视频下载 2.连续合集下载 3.杂合集下载&quot;)</span></span>
<span class="line"><span>    url=&quot;&quot;</span></span>
<span class="line"><span>    if n ==&#39;1&#39;:</span></span>
<span class="line"><span>        http = input(&quot;输入视频地址&quot;)</span></span>
<span class="line"><span>        url = re.findall(f&quot;(https:.*)\\\\?&quot;, http)[0]</span></span>
<span class="line"><span>        download(url=url,n=&#39;1&#39;)</span></span>
<span class="line"><span>    elif n ==&#39;2&#39;:</span></span>
<span class="line"><span>        print(&quot;输入视频地址&quot;)</span></span>
<span class="line"><span>        http = input()</span></span>
<span class="line"><span>        print(&quot;输入下载始终p&quot;)</span></span>
<span class="line"><span>        b,e=map(int,input().split())</span></span>
<span class="line"><span>        a = re.findall(&quot;https:.*?p=&quot;, http)[0]</span></span>
<span class="line"><span>        for i in range(b,e+1):</span></span>
<span class="line"><span>            url=a+str(i)</span></span>
<span class="line"><span>            download(url=url,n=str(i))</span></span>
<span class="line"><span>    elif n ==&#39;3&#39;:</span></span>
<span class="line"><span>        print(&quot;输入视频地址&quot;)</span></span>
<span class="line"><span>        http = input()</span></span>
<span class="line"><span>        print(&quot;输入从这个视频开始下载几个视频&quot;)</span></span>
<span class="line"><span>        b= input()</span></span>
<span class="line"><span>        response = requests.get(url=http, headers=headers)</span></span>
<span class="line"><span>        html = response.text</span></span>
<span class="line"><span>        BV = re.findall(&#39;&lt;div data-key=\\&quot;(.*?)\\&quot;&#39;, html)</span></span>
<span class="line"><span>        raw = re.findall(&quot;BV.*/&quot;, http)[0][:-1]#区分AV BV</span></span>
<span class="line"><span>        a=re.findall(f&#39;(.*?){raw}&#39;, http)[0]</span></span>
<span class="line"><span>        v = False</span></span>
<span class="line"><span>        c=0;</span></span>
<span class="line"><span>        response.close()</span></span>
<span class="line"><span>        for i in BV:</span></span>
<span class="line"><span>            url = a + str(i)+&#39;/&#39;</span></span>
<span class="line"><span>            if raw == i:</span></span>
<span class="line"><span>                v= True</span></span>
<span class="line"><span>            if v:</span></span>
<span class="line"><span>                c+=1</span></span>
<span class="line"><span>                if c&lt;=int(b):</span></span>
<span class="line"><span>                    download(url=url,n=str(c))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,5))])}const u=s(t,[["render",d]]),v=JSON.parse(`{"path":"/else/code.html","title":"神秘代码","lang":"zh-CN","frontmatter":{"title":"神秘代码","date":"2025-10-19T00:00:00.000Z","icon":"code","order":3,"author":{"name":"Swordfish","url":"https://jandswordfish.github.io/blog/","email":"2771030100@qq.com"},"category":["神秘代码"],"tag":["代码"],"description":"一些神奇的代码，谨慎使用","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"神秘代码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-10-19T00:00:00.000Z\\",\\"dateModified\\":\\"2025-10-19T14:56:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Swordfish\\",\\"url\\":\\"https://jandswordfish.github.io/blog/\\",\\"email\\":\\"2771030100@qq.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog/else/code.html"}],["meta",{"property":"og:site_name","content":"swordfish's blog"}],["meta",{"property":"og:title","content":"神秘代码"}],["meta",{"property":"og:description","content":"一些神奇的代码，谨慎使用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-19T14:56:34.000Z"}],["meta",{"property":"article:author","content":"Swordfish"}],["meta",{"property":"article:tag","content":"代码"}],["meta",{"property":"article:published_time","content":"2025-10-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-10-19T14:56:34.000Z"}]]},"git":{"createdTime":1760885794000,"updatedTime":1760885794000,"contributors":[{"name":"jandSwordfish","username":"jandSwordfish","email":"2771030100@qq.com","commits":1,"url":"https://github.com/jandSwordfish"}]},"readingTime":{"minutes":2.79,"words":838},"filePathRelative":"else/code.md","excerpt":"<p>一些神奇的代码，谨慎使用</p>\\n","autoDesc":true}`);export{u as comp,v as data};

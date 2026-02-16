---
title: 神秘代码
date: 2025-10-19
icon: code
article: false
order: 3
author:
  name: Swordfish
  url: https://jandswordfish.github.io/blog/
  email: 2771030100@qq.com
category:
  - 其他
tag:
  - 代码
---

一些神奇的代码，谨慎使用

<!-- more -->

# 神秘代码

## b站视频下载

::: tip 项目结构
   ├─ video(存放视频与弹幕)
   └─ chromedriver.exe(浏览器驱动)
   └─ b站视频爬取. py
   └─ danmu. py

:::

::: info danmu.py

```
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import shutil
from lxml import etree
import requests

def dan(title,cid):
    url = f'https://comment.bilibili.com/{cid}.xml'
    cookie = "buvid3=2BCC7CFB-D8F2-7BDF-58A9-512A14A2E26968567infoc; b_nut=1720094768; _uuid=379D9B10D-B1E10-4ACD-69EA-DDABB69F2DA1069148infoc; enable_web_push=DISABLE; buvid4=A3BC4746-4B86-A768-254C-12732E3FB35269234-024070412-m2Mm%2B8NyEGwzmtEpQt1oTw%3D%3D; header_theme_version=CLOSE; buvid_fp_plain=undefined; rpdid=|(u))Yklul|Y0J'u~k||mR)Jk; hit-dyn-v2=1; LIVE_BUVID=AUTO4717245732014930; PVID=1; DedeUserID=355151699; DedeUserID__ckMd5=e51aa13b52e2b5c0; fingerprint=f439853c2afa5d083520f823be4bd469; enable_feed_channel=DISABLE; buvid_fp=f439853c2afa5d083520f823be4bd469; CURRENT_QUALITY=80; home_feed_column=5; browser_resolution=1440-765; SESSDATA=20835340%2C1754828067%2Cc91e5%2A22CjDAXZnWt4PrBlAVCE8qNPAQq-RV-elIUVQttgENQw85bkpuwUJy2S-1F8z0-ykPGfISVmRhMUlpTW9oaVgybnhwOFd2MWw2dGU5c0lpWGw5cGctMm96YS1JZk5meW5KWXBUVXI5bTNxN0tpZEVwdlZiQzRiWWNtTXR2R0RRakFqNXBWT2lsWU53IIEC; bili_jct=f7e14734937a8894c78c659f14253439; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk1MzkyNzMsImlhdCI6MTczOTI4MDAxMywicGx0IjotMX0.b0w45ZZ9OUv1pyd1g1t0du3mPI3ck-WYf5YlqNWsUuk; bili_ticket_expires=1739539213; bmg_af_switch=1; bmg_src_def_domain=i0.hdslb.com; sid=6jvjcwgx; bp_t_offset_355151699=1032972920684544000; b_lsid=8DC637C7_194F92DA28F; CURRENT_FNVAL=4048"
    headers = {
        "Referer": url,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        "Cookie": cookie
    }
    response = requests.get(url=url, headers=headers)
    xml = etree.fromstring(response.content)
    # 解析数据
    with open(f"video\\{title}.xml", "wb") as f:
        f.write(response.content)
    response.close()

    mode = Options()
    mode.add_argument('--headless')

    driver = webdriver.Chrome(service=Service(r'D:\fjy\wangye auto\chromedriver.exe'), options=mode)  # 需指定浏览器驱动路径(需要替换)
    driver.get("https://tiansh.github.io/us-danmaku/bilibili/")  # 替换为实际URL

    # 找到文件上传输入框并上传文件
    upload_element = driver.find_element(By.CSS_SELECTOR, "#upload")
    upload_element.send_keys(f"D:\\fjy\\wangye auto\\video\\{title}.xml")# (需要替换)
    time.sleep(3)
    shutil.move(f"C:\\Users\\27710\\Downloads\\{title}.ass", f"D:\\fjy\\wangye auto\\video")# (需要替换)
    os.remove(f"video\\{title}.xml")
```

:::

::: info b站视频爬取.py

```
import os
import random
from datetime import time
import time
import requests
import re
import json
import danmu
import subprocess

cookie = '''需要替换为你自己的cookie，自动下载最高清晰的（有会员会更高），cookie为在b站视频按下F12->网络->web?content...->请求标头->cookie'''#(需要替换)
headers = {
        "Referer": "url",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        "Cookie": cookie
    }
proxies = {
        'http': 'http://59.39.63.54'
    }
def download(url,n):
    time.sleep(random.random() * (int(n) % 10))
    headers["Referer"] = url
    # 发送请求
    response = requests.get(url=url, headers=headers)
    cid = re.findall('\"cid":(.*?),\"p', response.text)[0]
    html = response.text
    title = re.findall('title="(.*?)"', html)[0]
    title = title.replace(" ","")
    title = title.replace("/", "")
    title = title.replace("|", "")
    title = title.replace("&", "")
    print("下载视频"+title+n+"中...")
    info = re.findall("window.__playinfo__=(.*?)</script>", html)[0]
    json_data = json.loads(info)
    video_url = json_data['data']['dash']['video'][0]['base_url']
    audio_url = json_data['data']['dash']['audio'][0]['base_url']
    print(json_data['data']['dash']['video'][0]['id'])
    video_content = requests.get(url=video_url, headers=headers).content
    audio_content = requests.get(url=audio_url, headers=headers).content
    v_path='video\\' + n + 'v' + title + '.mp4'
    a_path = 'video\\' + n + 'a' + title + '.mp3'
    out_path ='video\\' + title +"_"+ n + '.mp4'
    with open(v_path, mode='wb') as v:
        v.write(video_content)
    with open(a_path, mode='wb') as a:
        a.write(audio_content)
    cmd = f"D:/ChromeDownload/ffmpeg-7.1-essentials_build/ffmpeg-7.1-essentials_build/bin/ffmpeg.exe -n -i {v_path} -i {a_path} -c:v copy -c:a aac -strict experimental {out_path}"#(需要替换)
    subprocess.run(cmd,stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(v_path)
    os.remove(a_path)
    danmu.dan(title +"_"+ n, cid)
    print(title+str(n)+"完成！")
    response.close()
if __name__=='__main__':
    print("b站视频下载")
    n = input("1.单视频下载 2.连续合集下载 3.杂合集下载")
    url=""
    if n =='1':
        http = input("输入视频地址")
        url = re.findall(f"(https:.*)\\?", http)[0]
        download(url=url,n='1')
    elif n =='2':
        print("输入视频地址")
        http = input()
        print("输入下载始终p")
        b,e=map(int,input().split())
        a = re.findall("https:.*?p=", http)[0]
        for i in range(b,e+1):
            url=a+str(i)
            download(url=url,n=str(i))
    elif n =='3':
        print("输入视频地址")
        http = input()
        print("输入从这个视频开始下载几个视频")
        b= input()
        response = requests.get(url=http, headers=headers)
        html = response.text
        BV = re.findall('<div data-key=\"(.*?)\"', html)
        raw = re.findall("BV.*/", http)[0][:-1]#区分AV BV
        a=re.findall(f'(.*?){raw}', http)[0]
        v = False
        c=0;
        response.close()
        for i in BV:
            url = a + str(i)+'/'
            if raw == i:
                v= True
            if v:
                c+=1
                if c<=int(b):
                    download(url=url,n=str(c))
```

:::
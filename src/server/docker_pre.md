---
icon: "anchor"
date: 2025-12-08
cover: /assets/images/docker_spring.png
category: 
  - 服务器
tag:
  - docker
  - linux
  - 前端
author:
  name: Swordfish
  url: https://jandswordfish.github.io/blog/
  email: 2771030100@qq.com

---

<!-- more -->
# Docker部署前端项目
## 打包前端项目

```
npm run bulid
生成dist文件夹放入服务器
```

### **nginx.conf**

```
server {
    listen 8080;
    server_name localhost;
    
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }

}
```

listen:监听端口配置
nginx 在容器内监听 8080 端口
注意：这个端口需要与 docker-compose.yml 中的容器端口（8080）对应
server_name:服务器域名配置
localhost 表示本地访问
可以改为具体域名，如：server_name example.com www.example.com;
root:网站根目录
指定网站文件的存放路径
对应 docker-compose.yml 中挂载的容器路径
index默认首页文件
当访问目录时，nginx 会自动查找并返回 index.html 文件
可以指定多个文件，如：index index.html index.htm;
路由匹配规则
location / 表示匹配所有请求路径
try_files 指令：按顺序尝试查找文件
$uri - 尝试访问请求的 URI 对应的文件
$uri/ - 尝试访问请求的 URI 对应的目录
/index.html - 如果前面都找不到，则返回 index.html

这个配置常用于单页应用（SPA）如 React、Vue、Angular
作用：所有找不到的路由都会返回 index.html，由前端路由处理

### **docker-compose.yml**

```
version: '3.8'

services:
  cloudtea:
    image: nginx:alpine
    container_name: cloudtea
    ports:
      - "3000:8080"
    volumes:
      - /root/yunpingming:/usr/share/nginx/html:ro
    restart: unless-stopped
```

cloudtea--服务名称

image: nginx:alpine--nginx 的 alpine 精简版本

container_name:容器名称

ports:宿主机端口:容器端口

volumes:宿主机路径:容器内路径:权限(绑定挂载)

​	格式："宿主机路径:容器内路径:权限"
​	将宿主机的 /root/yunpingming 目录挂载到容器的 /usr/share/nginx/html 目录
​	ro (read-only) 表示只读模式，容器无法修改宿主机文件
​	这是 nginx 的默认网站根目录，用于存放静态文件（HTML、CSS、JS等）

restart--容器重启策略

unless-stopped容器会自动重启，除非手动停止

其他选项：no（不重启）、always（总是重启）、on-failure（失败时重启）

### **构建 Docker 镜像**

```
docker compose build
```

### **启动容器**

```
docker compose up -d
```

### 访问网站

```
http://23.94.199.106:3000/
```

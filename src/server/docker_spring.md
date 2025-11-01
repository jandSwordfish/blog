---
icon: "truck-fast"
date: 2025-11-02
cover: /assets/images/docker_spring.png
category: 
  - 服务器
tag:
  - docker
  - linux
author:
  name: Swordfish
  url: https://jandswordfish.github.io/blog/
  email: 2771030100@qq.com
---

<!-- more -->
# Docker部署Springboot

## dockers创建自定义网络

```
docker network create my_network
```

为了方便mysql和项目之间的沟通

## **dockers安装mysql**

### **拉取 Mysql 5.7.31 镜像**

```
docker pull mysql:5.7.31
```

## **运行 Mysql 5.7.31**

```
docker run \
-d \
--restart=always \
--name myMysql \
-p 3307:3306 \
--network my_network \
-v /data/mysql:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:5.7.31
```

::: tip 参数解析

-d: 后台运行容器，并返回容器 ID 

--restart=always: 开机自启动

–name myMysql: 为容器指定一个名称(myMysql)

-p: 指定端口映射，格式为：宿主机端口(用来暴露的端口):容器端口 

-v: 绑定一个卷，容器的 /var/lib/mysql 映射到 主机的目录 /data/mysql (注意是主机:容器，不要搞反了)

-e MYSQL_ROOT_PASSWORD=123456: 设置环境变量，密码设置为 123456 

mysql:5.7.31：使用镜像 mysql:5.7.31

:::


## 远程连接

可使用Navicat等图形化工具，远程连接到本地运行sql文件
<img src="/assets/images/docker1.png"/>

## 制作Dockerfile文件

```
touch Dockerfile
vim Dockerfile
(这文件就叫这名，没格式)
```

在 jar 包的同一级文件夹下新建 Dockerfile 文件，文件内容如下

```
FROM  openjdk:8
VOLUME /home/student
ADD student.jar student.jar
EXPOSE 8888
ENTRYPOINT ["java","-jar","/student.jar"]
```

::: tip 参数解析

from openjdk:8 拉取一个 jdk 为 1.8 的依赖环境 

volume 在容器中创建一个挂载点 /home/student

student.jar 就是你上传的 jar 包，替换为 jar 包的名称 

fishexam.jar 是你将该 jar 包重新命名为什么名称，在容器中运行 

expose 该容器暴露的端口是多少，就是 jar 在容器中以多少端口运行 

entrypoint 容器启动之后执行的命令，java -jar /student.jar 即启动 jar

:::

## 打包镜像

```plain
cd 到jar存放路径
docker build -t student .
```

::: info 注:

打包镜像前要把application文件中数据库

由本地(url: jdbc:mysql://**127.0.0.1**:3306/studentinfo)替换为

数据库名称(url: jdbc:mysql://**myMysql**:3306/studentinfo)

若因此无法打包，在pom配置文件中添加下列代码可以跳过测试

:::


```
<properties>
   <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   <java.version>1.8</java.version>
   <skipTests>true</skipTests><!--添加 -->
</properties>
```

## 运行容器

```plain
docker run \
-d \
-p 8888:8888 \
--network my_network \
--name student-8888 \
student
```




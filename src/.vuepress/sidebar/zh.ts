import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "前端",
      icon: "hashtag",
      prefix: "demo/",
      link: "demo/",
      collapsible: true,
      children: [
      {
        "text": "Markdown 使用方法",
        "icon": "fa6-brands:markdown",
        "link": "markdown",
      },
    ]
    },
    {
      text: "后端",
      icon: "layer-group",
      prefix: "backend/",
      link: "backend/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "服务器",
      icon: "globe",
      prefix: "server/",
      link: "server/",
      collapsible: true,
      children: [
      {
        "text": "Docker部署Springboot实战",
        "icon": "truck-fast",
        "link": "docker_spring",
      },
      {
        "text": "Docker部署前端项目",
        "icon": "anchor",
        "link": "docker_pre",
      },
    ]
    },
    "intro",
    "learn_path",
      {
      text: "其他",
      icon: "bars",
      collapsible: true,
      prefix: "else/",
      children: [
        {
          text: "算法笔记",
          icon: "book",
          link: "note",
        },
        {
          text: "网站收藏",
          icon: "link",
          link: "WEB",
        },
        {
        text: "神秘代码",
        icon: "code",
        link: "code",
        },
        {
        text: "学科笔记",
        icon: "newspaper",
        link: "learn",
        },
      ]
  },
  ],
});

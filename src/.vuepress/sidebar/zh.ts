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
      children: "structure",
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
      ]
  },
  ],
});

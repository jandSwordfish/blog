import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  "/demo/",
  "/backend/",
  "/server/",
  "/intro",
  "/learn_path",
  {
    text: "其他",
    icon: "bars",
    prefix: "/else/",
    children: [
      {
        text: "算法笔记",
        icon: "book",
        link: "/else/note",
      },
    ]
  },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
  // {
  //   text: "其他",
  //   icon: "bars",
  //   prefix: "/else/",
  //   children: [
  //     {
  //       text: "苹果",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //       ],
  //     },
  //   ]
  // },
]);

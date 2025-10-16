import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/blog",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "博客演示",
      description: "vuepress-theme-hope 的博客演示",
    },
  },

  theme,
  
  // Enable it with pwa
  // shouldPrefetch: false,
});

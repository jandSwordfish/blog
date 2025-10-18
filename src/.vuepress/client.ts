import { defineClientConfig } from "vuepress/client";
import "vuepress-theme-hope/presets/bounce-icon.scss"
import "vuepress-theme-hope/presets/left-blog-info.scss"
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import { MouseClick } from "./components/mouseClick.js";

export default defineClientConfig({
  setup: () => {
    setupTransparentNavbar({ type: "homepage" });
    MouseClick();
    // setupSnowFall({    count: 50,
    // minSize: 1,
    // maxSize: 10,
    // speed: 1});
  },
});

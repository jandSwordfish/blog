import { defineClientConfig } from "vuepress/client";
import "vuepress-theme-hope/presets/bounce-icon.scss"
import "vuepress-theme-hope/presets/left-blog-info.scss"
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import { onMounted, onUnmounted } from "vue";
import { initMouseClick, destroyMouseClick } from "./components/mouseClick.js";

export default defineClientConfig({
  setup: () => {
    setupTransparentNavbar({ type: "homepage" });
    if (typeof window !== 'undefined') {
      setupTransparentNavbar({ type: "homepage" });
    }
    
    onMounted(() => {
      // 可以传入自定义配置
      initMouseClick({
        color: 'rgba(255, 225, 0, 1)', // 自定义颜色
        size: 120, // 自定义大小
        duration: 0.6 // 自定义动画时长
      });
    });
    
    onUnmounted(() => {
      destroyMouseClick();
    });
  },
    // setupSnowFall({    count: 50,
    // minSize: 1,
    // maxSize: 10,
    // speed: 1});
  },
);

let handleClick = null;
let isSetup = false;
let config = {
  color: 'rgba(22, 66, 75, 0.4)',
  size: 100,
  duration: 0.4,
  className: 'pointer'
};

export const initMouseClick = (options = {}) => {
  if (isSetup || typeof window === 'undefined') return;
  
  // 合并配置
  config = { ...config, ...options };
  isSetup = true;

  handleClick = (e) => {
    const pointer = document.createElement("div");
    pointer.classList.add(config.className);
    pointer.style.left = `${e.clientX}px`;
    pointer.style.top = `${e.clientY}px`;
    
    // 如果传入了自定义样式
    if (options.color) {
      pointer.style.backgroundColor = options.color;
    }
    if (options.size) {
      pointer.style.setProperty('--max-size', options.size + 'px');
    }
    if (options.duration) {
      pointer.style.animationDuration = options.duration + 's';
    }
    
    document.body.appendChild(pointer);
    
    pointer.addEventListener("animationend", () => {
      pointer.remove();
    });
  };
  
  window.addEventListener("click", handleClick);
};

export const destroyMouseClick = () => {
  if (handleClick) {
    window.removeEventListener("click", handleClick);
    handleClick = null;
    isSetup = false;
  }
};

// 更新配置
export const updateMouseClickConfig = (newConfig) => {
  config = { ...config, ...newConfig };
};
export default {
  init: initMouseClick,
  destroy: destroyMouseClick
};
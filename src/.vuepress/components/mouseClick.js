let handleClick = null;
let isSetup = false;

export const MouseClick = () => {
  if (isSetup) return;
  isSetup = true;

  handleClick = (e) => {
    const pointer = document.createElement("div");
    pointer.classList.add("pointer");
    pointer.style.left = `${e.clientX}px`;
    pointer.style.top = `${e.clientY}px`;
    document.body.appendChild(pointer);
    
    pointer.addEventListener("animationend", () => {
      pointer.remove();
    });
  };
  
  window.addEventListener("click", handleClick);
};

export const cleanupMouseClick = () => {
  if (handleClick) {
    window.removeEventListener("click", handleClick);
    handleClick = null;
    isSetup = false;
  }
};
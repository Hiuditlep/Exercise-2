// reactive-engine.js
import { createElement, renderToDOM } from "./mini-react.js";

let stateStore = [];
let stateCursor = 0;
let rootComponent = null;
let rootElement = null;

// Reset con trỏ về 0 trước mỗi lần re-render
export function resetCursor() {
  stateCursor = 0;
}

// Bộ điều phối useState bằng Closure
export function useState(initialState) {
  const currentCursor = stateCursor;

  // Gán giá trị khởi tạo nếu state này chưa từng tồn tại
  if (stateStore[currentCursor] === undefined) {
    stateStore[currentCursor] = initialState;
  }

  const setState = (newState) => {
    stateStore[currentCursor] = newState;
    // Tự động render lại UI mỗi khi state thay đổi
    renderApp(rootComponent, rootElement);
  };

  stateCursor++;
  return [stateStore[currentCursor], setState];
}
// Hàm render chính của ứng dụng
export function renderApp(Component, container) {
  rootComponent = Component;
  rootElement = container;

  resetCursor(); // Bắt buộc phải reset trước khi gọi Component()
  const vnode = Component();

  container.innerHTML = ""; // Xóa giao diện cũ
  container.appendChild(renderToDOM(vnode)); // Vẽ giao diện mới
}

// Bắt sự kiện tập trung tại thẻ cha
export function attachRootListener(rootDom) {
  rootDom.addEventListener("click", (e) => {
    console.log("[Delegation Hub] Có thao tác click từ:", e.target.tagName);
  });
}

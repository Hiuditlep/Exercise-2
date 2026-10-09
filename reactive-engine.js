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

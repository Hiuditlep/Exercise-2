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

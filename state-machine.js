import { createElement } from "./mini-react.js";
import { useState } from "./reactive-engine.js";

// Hàm giả lập gọi API (tỉ lệ 50% thành công / 50% thất bại để test Error)
const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve([
            "Post 1: Web Development",
            "Post 2: React Engine",
            "Post 3: State Machine",
          ])
        : reject(new Error("Connection timeout. Server không phản hồi."));
    }, 1500);
  });
};

export function DataFeed() {
  // ĐẢM BẢO 1: Khởi tạo đúng cấu trúc object
  const [state, setState] = useState({ status: "IDLE" });

  const loadData = async () => {
    /* ... */
  };

  if (state.status === "IDLE") {
    // ĐẢM BẢO 2: Bắt buộc phải có chữ "return" ở đây
    return createElement(
      "div",
      { className: "idle-state" },
      createElement("h3", null, "Dữ liệu chưa được tải"),
      createElement("button", { onClick: loadData }, "Load Data"),
    );
  }

  if (state.status === "LOADING") {
    // ĐẢM BẢO 2: Bắt buộc phải có chữ "return" ở đây
    return createElement(
      "div",
      { className: "skeleton-container" },
      createElement("div", { className: "skeleton-line" }),
      createElement("div", { className: "skeleton-line short" }),
    );
  }

  if (state.status === "ERROR") {
    return createElement(
      "div",
      { className: "error-boundary" },
      createElement("p", { className: "error-text" }, `Error: ${state.error}`),
      createElement("button", { onClick: loadData }, "Retry Connection"),
    );
  }

  if (state.status === "SUCCESS") {
    return createElement(
      "ul",
      { className: "data-feed" },
      ...state.data.map((item) => createElement("li", null, item)),
    );
  }
}

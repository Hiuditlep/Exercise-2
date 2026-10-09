// mini-react.js

// Hàm phụ trợ tạo text node, giúp đóng gói chuỗi văn bản thành một VNode an toàn
export function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// Hàm chính tạo VNode (giống React.createElement)
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      // Map qua danh sách children. Nếu child là chuỗi hoặc số, bọc nó bằng createTextElement
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child),
      ),
    },
  };
}

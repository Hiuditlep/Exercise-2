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

// Hàm biến VNode thành DOM thật và gắn sự kiện
export function renderToDOM(vnode) {
  // 1. Nếu là TEXT_ELEMENT, tạo Node văn bản thuần (Bảo mật: ngăn chặn XSS)
  if (vnode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vnode.props.nodeValue);
  }

  // 2. Tạo phần tử DOM tương ứng với semantic tags (main, section, button...)
  const dom = document.createElement(vnode.type);

  // 3. Gán các thuộc tính (props) cho phần tử DOM
  const isProperty = (key) => key !== "children";
  Object.keys(vnode.props)
    .filter(isProperty)
    .forEach((name) => {
      // Bắt các sự kiện bắt đầu bằng "on" (ví dụ: onClick)
      if (name.startsWith("on")) {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, vnode.props[name]);
      }
      // Xử lý className
      else if (name === "className") {
        dom.className = vnode.props[name];
      }
      // Các thuộc tính thông thường khác (id, role...)
      else {
        dom[name] = vnode.props[name];
      }
    });

  // 4. Đệ quy render các con (children) và gắn vào DOM cha
  vnode.props.children.forEach((child) => {
    dom.appendChild(renderToDOM(child));
  });

  return dom;
}

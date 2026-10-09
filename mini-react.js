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

export function renderToDOM(vnode) {
  // Safe Guard: Nếu vnode là null/undefined/boolean thì bỏ qua không render
  if (vnode === null || vnode === undefined || typeof vnode === "boolean") {
    return document.createTextNode("");
  }

  // 1. TEXT_ELEMENT
  if (vnode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vnode.props.nodeValue);
  }

  // 2. Tạo thẻ HTML
  const dom = document.createElement(vnode.type);

  // 3. Gán props và sự kiện
  const isProperty = (key) => key !== "children";
  Object.keys(vnode.props)
    .filter(isProperty)
    .forEach((name) => {
      if (name.startsWith("on")) {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, vnode.props[name]);
      } else if (name === "className") {
        dom.className = vnode.props[name];
      } else {
        dom[name] = vnode.props[name];
      }
    });

  // 4. Render children an toàn
  vnode.props.children.forEach((child) => {
    if (child !== null && child !== undefined) {
      dom.appendChild(renderToDOM(child));
    }
  });

  return dom;
}

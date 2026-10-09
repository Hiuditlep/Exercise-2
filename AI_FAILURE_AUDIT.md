# AI Failure Mode Audit

## 1. Vulnerability 01: Raw innerHTML Ingestion (XSS)

- Code lỗi do AI viết: `container.innerHTML = comment.text;`
- Nguy cơ: Bị tấn công XSS khi người dùng nhập thẻ script hoặc `<img onerror=alert(1)>`.
- Cách sửa: Dùng `document.createTextNode(comment.text)` thay vì `innerHTML`.

## 2. Vulnerability 02: Memory Leaks

- Code lỗi do AI viết: Gắn trực tiếp `btn.addEventListener('click', ...)` bên trong hàm render component.
- Nguy cơ: Mỗi lần vẽ lại giao diện sẽ tạo thêm listener mới mà không giải phóng cái cũ, làm tràn bộ nhớ.
- Cách sửa: Dùng Event Delegation (gắn 1 listener duy nhất ở thẻ cha root).

## 3. Vulnerability 03: Phantom Keys

- Code lỗi do AI viết: `items.map(item => <li key={Math.random()}>{item}</li>)`
- Nguy cơ: Key thay đổi liên tục khiến DOM bị xóa và tạo lại toàn bộ mỗi lần render, gây giật lag.
- Cách sửa: Dùng id cố định của dữ liệu: `key={item.id}`.

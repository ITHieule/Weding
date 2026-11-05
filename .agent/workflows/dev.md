# Workflow phát triển

## Chạy nhanh

1. Mở `index.html` trực tiếp trong trình duyệt.
2. Hoặc chạy server tĩnh nếu cần kiểm tra iframe, clipboard, network font:

```powershell
python -m http.server 8080
```

Sau đó mở `http://localhost:8080`.

## Tạo thiệp mới

1. Mở `script.js`.
2. Nhân bản một entry trong `CARD_CONFIGS`.
3. Đổi slug, ví dụ `an-binh`.
4. Điền thông tin cô dâu, chú rể, lịch trình, Google Maps, tài khoản.
5. Mở `index.html?card=an-binh`.

## Thay Google Form

Form RSVP hiện lưu vào `localStorage`. Nếu cần Google Form, đổi `action`, `method` và `name` trong form tại `index.html`, sau đó bỏ hoặc chỉnh handler `setupRsvp()` trong `script.js`.

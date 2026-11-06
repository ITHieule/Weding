# Kết nối lời chúc và RSVP với Google Sheet

`Code.gs` nhận lời chúc và xác nhận tham dự, rồi ghi vào hai trang tính trong cùng một Google Sheet.

## Cài đặt

1. Tạo một Google Sheet mới. Sao chép ID trong URL, là phần nằm giữa `/d/` và `/edit`.
2. Trong Sheet, chọn **Tiện ích mở rộng → Apps Script**. Thay nội dung `Code.gs` mặc định bằng nội dung trong thư mục này.
3. Trong `Code.gs`, thay `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` bằng ID của Sheet.
4. Chọn **Triển khai → Lần triển khai mới → Ứng dụng web**. Chọn chạy với tư cách tài khoản của bạn và cấp quyền truy cập cho **Bất kỳ ai** để khách mời có thể gửi phản hồi.
5. Sao chép URL ứng dụng web kết thúc bằng `/exec`.
6. Mở `script.js`, dán URL vào `FORM_ENDPOINT`, ví dụ:

   ```js
   const FORM_ENDPOINT = "https://script.google.com/macros/s/DEPLOYMENT_ID/exec";
   ```

7. Đẩy lại các tệp lên GitHub Pages. Dữ liệu được ghi vào hai tab **Lời chúc** và **Xác nhận tham dự**. Chỉ chia sẻ trang thiệp; không bật chia sẻ công khai cho Google Sheet.

> Trạng thái trên trình duyệt xác nhận yêu cầu đã được gửi đi. Do Google Apps Script không trả phản hồi đọc được từ trang GitHub Pages, hãy kiểm tra Sheet sau lần gửi thử đầu tiên.

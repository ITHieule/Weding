# Quy tắc dự án thiệp cưới online

## Tổng quan

- Dự án là landing page thiệp cưới online chạy bằng HTML, CSS và JavaScript thuần.
- Không dùng backend, không cần build tool, mở trực tiếp `index.html` là chạy.
- Mã nguồn giao diện chính nằm trong `index.html`, `style.css`, `script.js`; tài nguyên đặt trong `assets/`.

## Cấu trúc

- `index.html`: cấu trúc nội dung, section thiệp cưới, form RSVP, lightbox.
- `style.css`: design tokens, responsive layout mobile-first, animation, state UI.
- `script.js`: cấu hình từng thiệp, render dữ liệu, countdown, nhạc nền, RSVP localStorage, copy tài khoản, lightbox.
- `assets/`: ảnh mẫu, QR mẫu và nhạc nền mẫu.

## Quy tắc code

- Ưu tiên mobile-first, dùng CSS biến ở `:root`.
- Giữ `letter-spacing: 0`.
- Không dùng framework phức tạp.
- Mọi dữ liệu cần thay cho từng thiệp nằm trong `CARD_CONFIGS` ở `script.js`.
- Mỗi thiệp có đường dẫn riêng bằng query hoặc hash: `index.html?card=linh-minh` hoặc `index.html#linh-minh`.
- Nhạc nền không tự phát trước tương tác người dùng.

## Lỗi thường gặp

- Triệu chứng: countdown luôn `00`.
  Nguyên nhân: `weddingDate` không đúng định dạng `DD/MM/YYYY`.
  Cách khắc phục: sửa ngày trong `CARD_CONFIGS`, ví dụ `24/12/2026`.

- Triệu chứng: Google Maps không hiện.
  Nguyên nhân: `mapEmbedUrl` đang để placeholder hoặc không phải URL embed.
  Cách khắc phục: lấy link nhúng từ Google Maps và điền vào `mapEmbedUrl`.

- Triệu chứng: nhạc không phát.
  Nguyên nhân: thiếu hoặc sai đường dẫn `assets/music.mp3`, hoặc trình duyệt chặn trước khi có tương tác.
  Cách khắc phục: bấm `Mở thiệp` hoặc icon nhạc; thay file MP3 thật đúng tên.

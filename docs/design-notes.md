# Ghi chú thiết kế thiệp cưới online

- Persona: cô dâu chú rể hoặc đơn vị làm thiệp cần một mẫu thiệp online đẹp, dễ sửa, gửi bằng link riêng.
- Job-to-be-done: giới thiệu thông tin cưới, dẫn khách xem lịch trình, mở bản đồ và gửi RSVP.
- Dữ liệu bắt buộc: tên cô dâu chú rể, ngày cưới, địa điểm, lịch trình, album, Google Maps, trạng thái RSVP.
- Trạng thái cần xử lý: nhạc bị chặn, ngày cưới đã qua, Google Maps còn placeholder, RSVP không có backend.
- Visual thesis: thiệp giống bìa tạp chí cưới mềm, dùng ảnh cưới làm neo thị giác, serif lớn, nền kem hồng champagne, motion nhẹ như mở phong bì.
- Quy tắc mới: mỗi thiệp là một cấu hình trong `CARD_CONFIGS`, có link riêng qua query/hash để không cần backend hoặc build tool.

## Cập nhật theo thiệp Bảo Trân & Đại Phát

- Thông tin chính hiển thị cô dâu `Bảo Trân`, chú rể `Đại Phát`, ngày `Thứ Năm | 11.06.2026`, giờ lễ `09:00`.
- Địa điểm chính: `Khóm Mỹ Khánh 2, Phường Cái Vồn, Tỉnh Vĩnh Long`.
- Google Maps dùng URL embed dạng query `maps.google.com/maps?q=...&output=embed`; nếu vị trí chưa đúng tuyệt đối, thay bằng link nhúng chính thức từ Google Maps.
- Ảnh `D200314 NHA GAI.png` chỉ dùng làm nguồn đọc thông tin, không còn dùng trực tiếp trong giao diện chính.
- Màn mở thiệp được thiết kế lại gọn hơn: thẻ kính mờ đặt trên nền pastel, mây trang trí tản ra hai bên khi bấm `Mở thiệp`.
- Trước khi bấm `Mở thiệp`, trang bị khóa cuộn và ẩn chỉ báo cuộn xuống.
- Motion mới gồm thanh tiến trình cuộn, mây tản hai bên, reveal stagger theo item, hover ảnh/card và parallax hero.

## Cập nhật màn mở phong bì

- Persona: khách mời mở link thiệp trên điện thoại, cần cảm giác như nhận thiệp giấy trước khi xem nội dung.
- Job-to-be-done: chạm vào dấu niêm phong để mở thiệp, nghe nhạc, rồi được cuộn nhẹ xuống nội dung chính.
- Required data: tên `Bảo Trân & Đại Phát`, lời kính mời, ảnh cưới, dấu niêm phong `assets/wax-seal.png`.
- Required states: chưa mở thì khóa cuộn và ẩn chỉ báo kéo xuống; đang mở thì flap phong bì mở, ảnh cưới trồi lên, dấu sáp mờ đi; mở xong thì cuộn chậm tới hero.
- Visual thesis: màn đầu mô phỏng phong bì giấy kem có dấu sáp, typography wedding mềm, hoa góc nhẹ, ít chữ để giống mẫu tham khảo hơn.
- Known failure modes and fixes: trình duyệt có thể khôi phục vị trí cuộn cũ; `history.scrollRestoration = "manual"` và `window.scrollTo(0, 0)` giữ màn mở luôn bắt đầu từ đầu trang.

## Cập nhật font chữ wedding

- Typeface chính đổi sang `Great Vibes` và `Dancing Script` cho tiêu đề, tên cô dâu chú rể và các heading quan trọng.
- Typeface nội dung đổi sang `Nunito` và `Quicksand` để mềm, tròn, dễ đọc trên mobile.
- Loại bỏ nhóm font serif cũ như `Cormorant Garamond`, `Noto Serif Display`, `Georgia` để giao diện không còn cảm giác gần Times New Roman/Garamond.

## Cập nhật lịch ngày giờ và đếm ngược

- Tham chiếu ảnh mẫu: thông tin lễ đặt trong card giấy, ngày lớn ở giữa, giờ bên trái, năm bên phải, lịch tháng nằm ngay dưới.
- Countdown được gom vào cùng card ngày để khách luôn thấy đủ ngày, giờ, lịch tháng và thời gian còn lại trong một cụm.
- Lịch tháng sinh tự động từ `weddingDate`; ngày cưới được highlight bằng nền hồng champagne và ký hiệu trái tim.
- Nếu `partyTime` vẫn là `Đang cập nhật giờ`, layout vẫn giữ nhịp cột và countdown dùng mốc ngày cưới lúc 00:00 để không bị lỗi.

## Cập nhật nhịp mở thiệp bằng mây

- Màn mở giữ hai ảnh mây `assets/cloud_left.png` và `assets/cloud_right.png` làm lớp chuyển cảnh.
- Sequence mới: phong bì mở và ảnh cưới trồi lên trước, sau đó mây tản sang hai bên, cuối cùng trang chuyển chậm xuống hero.
- Motion cố ý chậm hơn: ảnh/flap khoảng 1.4-1.5s, mây tản khoảng 2.6s, scroll xuống hero khoảng 3.2s để tránh cảm giác giật.
- Bản sửa tiếp theo: ảnh cưới được đưa lên trên lớp phong bì khi mở, nội dung cover chỉ fade ở nhịp rời màn, mây đặt gần trung tâm hơn để chuyển động tản trái/phải nhìn rõ.
- Bản cập nhật theo ảnh feedback: bỏ hai cành xanh trang trí ở mép màn, mây phủ nhẹ góc phong bì trước khi mở, ảnh cưới hiện chậm hơn, mây tản cùng lúc với scroll xuống hero và scroll rút còn khoảng 2.4s.
- Cập nhật asset mây: tạo backup `.original.png`, khử nền bằng ffmpeg và thử `mix-blend-mode: screen` để mây hòa vào nền sáng, không còn viền đen rõ.
- Cập nhật vị trí mây cover: kéo mây lên, giảm width còn `min(88vw, 640px)` để mây chỉ phủ đáy phong bì và không che chữ kính mời/mô tả.
- Cập nhật màu cover: bỏ `mix-blend-mode: screen` để mây giữ sắc hồng/champagne, đổi phong bì sang trắng ngà `#fffdf8`, nâng lớp chữ kính mời lên trên mây để không bị che.
- Cập nhật tinh chỉnh mây/thiệp: mây dùng `opacity: .82`, giữ saturate để không bạc màu; phong bì đổi sang trắng ngà có border mềm, inset highlight và shadow nhẹ.
- Tăng blend mây mức trung bình: dùng `mix-blend-mode: lighten`, `opacity: .78`, blur/contrast nhẹ và mask radial để mép đen mềm dần nhưng mây không bạc trắng hoàn toàn.
- Cập nhật theo asset mây nền trắng: khôi phục bản ảnh trắng gốc sau khi colorkey quá mạnh, bỏ lighten, dùng multiply nhẹ, `opacity: .74` và mask mép để giảm nền trắng/viền cứng nhưng vẫn giữ màu và hình mây.
- Cập nhật viền phong bì: tăng border champagne lên `1.5px`, thêm drop-shadow mềm và đường gấp phong bì rõ hơn để thiệp trắng không chìm trong mây sáng.
- Cập nhật tam giác đỉnh phong bì: thêm hai đường gấp chéo bằng pseudo-element trên `.envelope`, màu champagne mờ và tự fade khi mở thiệp.
- Sửa hướng nắp tam giác phong bì: đảo gradient từ mép trên xuống tâm/dấu sáp, tránh tam giác bị ngược lên trên.
- Cập nhật viền phong bì: bỏ border ngoài thừa, giảm màu nếp gấp/tam giác xuống champagne nhạt hơn để thật và mềm hơn.
- Cập nhật ảnh mở/hero: ảnh trong phong bì chuyển sang `object-fit: contain` để không crop cô dâu chú rể; hero đổi từ background sang `.hero__image` tuyệt đối, kéo ảnh lên và parallax bằng transform âm để loại bỏ dải thừa phía trên.
- Cập nhật lịch trình: chỉ giữ `Lễ vu quy`, card được thiết kế lại thành khối thông tin chính với badge, ngày/giờ rõ, địa điểm tách khỏi và nút chỉ đường.
- Sửa sequence mở thiệp: không chờ nhạc trước khi chạy timer, bắt đầu scroll sớm hơn, dùng easing `easeOutCubic` để scroll di chuyển ngay và chỉ gỡ class fade sau khi scroll xong để thiệp không hiện lại.
- Cập nhật ảnh mở thiệp: thêm lớp ảnh nền blur-cover sau ảnh chính để không còn khoảng trống hai bên khi ảnh chính dùng contain; ép inline style trong JS khi mở để ảnh hiện ổn định trong sequence.
- Cập nhật ảnh profile cô dâu/chú rể: dùng `assets/wife.jpg` và `assets/husband.jpg`; căn `object-position: center 18%` để ảnh chân dung không cắt mặt trên mobile.

## Cập nhật rút gọn thiệp

- Gộp ba khối lặp thông tin ngày giờ, lời mời trang trọng và lịch trình thành một card `Lễ vu quy`.
- Card mới giữ đủ dữ liệu quan trọng: lời kính mời, giờ đang cập nhật, ngày `11.06.2026`, âm lịch, countdown, địa điểm và nút chỉ đường.
- Bỏ phần RSVP/xác nhận tham gia khỏi giao diện để thiệp ngắn hơn và khách xem thông tin chính nhanh hơn.
- Known failure modes and fixes: nếu `partyTime` chưa có dạng `HH:mm`, countdown vẫn dùng ngày cưới lúc 00:00 và không làm hỏng card.
- Cập nhật thêm: bỏ section `Lời mời` riêng, đưa câu mời vào card `Lễ vu quy` để tránh lặp và rút ngắn luồng xem.

## Cập nhật section gia đình hai họ

- Section `Cô dâu & chú rể` đổi thành `Gia đình hai họ`, bố cục theo ảnh tham khảo: chú rể ảnh trái/thông tin phải, cô dâu thông tin trái/ảnh phải.
- Thông tin thông gia được đưa lên trước tên cô dâu/chú rể để khách thấy rõ hai bên gia đình.
- Animation scroll dùng `reveal--from-left` và `reveal--from-right`: hai phía trượt chậm vào giữa, nhẹ hơn kiểu card xuất hiện thẳng từ dưới.
- Mobile ẩn mô tả dài trong section này để giữ thiệp gọn và gần cảm giác thiệp dọc trên điện thoại.
- Cập nhật thông gia: bỏ cụm Con ông, hiển thị cha mẹ thành hai dòng riêng Ông ... và Bà ... trong section Gia đình hai họ.
- Cập nhật nhạc nền: audio chính dùng file `assets/Lễ Đường.mp3`, fallback còn `assets/music.mp3`; nhạc vẫn chỉ phát sau thao tác người dùng theo chính sách trình duyệt.
- Cập nhật mở thiệp: ảnh trong phong bì trồi lên chậm hơn bằng easing mềm, nhưng thời điểm scroll bắt đầu sớm hơn và thời lượng scroll ngắn hơn để chuyển cảnh gọn.
- Cập nhật card lễ vu quy: bố cục giờ/ngày/năm theo ảnh tham khảo, giữ nội dung Tại Tư gia nhà gái và địa chỉ nhà gái.
- Cập nhật nhịp mở thiệp: ảnh trồi lên trong 3.6s, giữ ảnh khoảng 1.6s trước khi rời màn, scroll xuống hero trong 2.8s để cảm giác chậm rãi hơn.
- Phân tích `assets/video.mp4`: nhịp cuộn giống hành vi đọc thiệp trên điện thoại, tốc độ đều và không lao nhanh lúc bắt đầu. Scroll mở thiệp đổi sang easing `easeInOutSine` và kéo dài 4.4s để chuyển xuống hero chậm rãi, liền mạch hơn.
- Cập nhật sequence mở thiệp theo feedback: bỏ pha fade trước khi scroll gây màn trống. Sau khi ảnh hiện xong và dừng 1.5s, `is-leaving`, `is-cloud-parting` và scroll chạy cùng lúc trong 5.2s; thiệp mờ dần, mây vén dần theo nhịp scroll.
- Cập nhật sequence mở thiệp: scroll/fade/mây chuyển sang 4.4s linear và bắt đầu trong cùng `requestAnimationFrame` sau khi mở khóa scroll, tránh cảm giác fade xong mới scroll.
- Cập nhật sequence chuyển cảnh: trong lúc fade/scroll, cover chuyển sang overlay fixed để hero cuộn phía sau ngay lập tức. Fade thiệp, fade nền cover, mây vén và scroll cùng chạy 6.4s, tránh cảm giác đứng ở nền cover rồi tụt nhanh xuống hero.
- Sửa bug overlay sequence: `fixed` làm cover rời flow khiến hero nhảy lên đầu và scroll không chạy thật. Đổi overlay sang sticky để cover vẫn giữ chiều cao 100svh, scrollY tăng dần lên hero trong khi cover fade/mây vén.
- Debug mở thiệp: hero không load chậm; image hero đã `complete=true` trước khi bấm. Root cause là nền cover sticky vẫn opaque nên che hero trong lúc scroll. Khi `is-leaving`, cover chuyển `background: transparent` và pseudo decoration fade để hero hiện phía sau trong lúc thiệp/mây còn đang chuyển động.
- Debug nhảy tới section thông gia: root cause là `cover.is-finished { display:none }` xóa chiều cao cover sau khi scroll tới hero, làm document collapse và viewport rơi xuống section sau. Fix: cùng lúc set `is-finished`, bù `window.scrollTo(0,0)` để hero giữ nguyên vị trí đầu màn sau khi cover bị loại khỏi flow.
- Browser-use debug mobile: scroll/fade có chạy cùng lúc, nhưng khi scroll chậm qua cover sticky, vùng trên viewport là cover trong suốt nên nhìn như màn trống trong khi hero thật mới ló từ đáy. Fix: `cover.is-leaving` dùng ảnh `assets/hero.jpg` làm nền chuyển tiếp để không còn khoảng trắng, đồng thời hero thật vẫn cuộn lên từ dưới.
- Rebuild hero/open logic: cover là overlay fixed, không còn scroll để chuyển từ cover sang hero nên không còn nhảy layout. Hero đổi thành thiệp dọc kiểu clip với Save the Date, tên ngắn Bảo Trân & Đại Phát, ảnh cưới giữa và cụm giờ/ngày/năm. Bỏ section Love Story khỏi HTML. Câu mời trong card lễ đổi ngắn: Kính mời quý vị đến chung vui trong ngày hạnh phúc của cô dâu Bảo Trân và chú rể Đại Phát. Chỉ giữ nút chỉ đường ở section bản đồ để tránh trùng.
- Cập nhật căn giữa hero: `.hero` không dùng padding chung của `.section` nữa, giữ `min-height: 100svh` và `padding: 0` để thiệp dọc nằm đúng giữa viewport. Ảnh trong hero đổi về `object-position: center center` để khung ảnh cân hơn, tránh cảm giác ảnh tụt đáy.
- Cập nhật thứ tự tên hiển thị: màn mở thiệp và hero dùng Đại Phát & Bảo Trân để khớp vị trí chú rể bên trái, cô dâu bên phải trong ảnh.
- Cập nhật hero mobile: giảm chiều rộng/chiều cao card, thu ảnh và cụm ngày giờ, thêm khoảng thở dưới bằng safe-area để card không dính đáy trình duyệt điện thoại và không cần cuộn mới thấy hết phần ngày âm lịch.
- Cập nhật bản đồ: bỏ cụm Địa điểm/Tư gia nhà gái/địa chỉ khỏi section map vì card Lễ vu quy đã hiển thị địa chỉ. Section map chỉ còn iframe Google Maps và một nút Chỉ đường để tránh lặp thông tin.
- Cập nhật section Gia đình hai họ: cô dâu/Nhà gái hiển thị trước, chú rể/Nhà trai hiển thị sau theo yêu cầu thứ tự giới thiệu.
- Cập nhật thứ tự tên: tất cả cụm tên hiển thị dạng cặp chuyển về cô dâu trước, Bảo Trân & Đại Phát; section Gia đình hai họ vẫn giới thiệu cô dâu trước rồi chú rể.
- Cập nhật footer: bỏ danh sách link chọn thiệp ở cuối trang, chỉ giữ dòng Made with love để kết thúc thiệp gọn hơn.
- Cập nhật section cảm ơn: ảnh nền chuyển sang `assets/thank.jpg` để dùng đúng ảnh thank mới lưu, thay cho `assets/gallery-4.jpg`.
- Cập nhật album ảnh: thêm `ASSET_VERSION` vào URL ảnh gallery khi render để trình duyệt tải ảnh mới sau khi thay file cùng tên, tránh thấy ảnh cũ do cache.
- Cập nhật bản đồ: nút chỉ đường dùng short link `https://maps.app.goo.gl/wDizhiK9jEzxU4Ji9`; iframe dùng URL Google Maps embed đã resolve từ tọa độ `10.062672,105.8224692` để tránh khung map trống do redirect embed.
- Cập nhật thông tin hiển thị: tên cô dâu/chú rể rút gọn còn `Bảo Trân` và `Đại Phát`; giờ lễ đổi sang `09:00`; version asset tăng lên `20260512-03` để các ảnh mới cùng tên được tải lại trên web và Vercel.
- Sửa lỗi animation nhanh bất thường: rule `prefers-reduced-motion` cũ ép mọi animation/transition xuống `1ms`, làm sequence mở thiệp nhảy tức thì trên thiết bị bật giảm chuyển động. Bản sửa sau giữ animation/transition chính và animation trang trí, chỉ tắt `scroll-behavior: smooth` để không còn nhanh bất thường mà cũng không làm mất chuyển động.
- Cập nhật hiệu năng màn mở: preload hai ảnh mây `assets/cloud_left.png` và `assets/cloud_right.png` với `fetchpriority="high"` để giảm trễ tải lần đầu; rút sequence mở thiệp từ `5100ms/8200ms` xuống `4100ms/7200ms`, ngắn hơn 1 giây trước khi chuyển sang hero.
- Cập nhật reveal khi scroll: bỏ `observer.unobserve()` để animation không chỉ chạy một lần; khi người dùng cuộn ngược lên và phần tử rời khỏi vùng xem phía dưới, class `is-visible` được gỡ để lần sau cuộn xuống phần tử replay hiệu ứng như ban đầu.
- Cập nhật mây phải: giao diện hiện dùng trực tiếp `assets/cloud_right.png`; nếu thay asset thủ công thì cần giữ đúng tên file này hoặc cập nhật lại đường dẫn preload và thẻ `<img>` ở cover để tránh mất mây phải do `404`.
- Cập nhật desktop frame: hoàn tác thử nghiệm hero `720px` để hero giữ bố cục cũ. Trên desktop lớn, section nội dung trung tâm dùng chung một khung khoảng `1240px`; riêng section cảm ơn chỉ dùng ảnh `thank.jpg` kiểu `contain` ở desktop lớn để tránh crop đầu ảnh. Mobile/tablet giữ kiểu `cover` với neo ảnh hơi lên trên; riêng mobile hẹp bỏ luôn padding và giới hạn rộng của section `thank` để khối ảnh quay về full-width.
- Tinh chỉnh mobile section cảm ơn: bỏ cách kéo `100vw` và lệch `50vw` vì dễ sinh vệt trắng mép phải trên một số viewport; thay bằng khung `width: 100%` bám parent thật để ảnh thank vẫn full-width nhưng không lệch mép khi đổi tỉ lệ màn hình.

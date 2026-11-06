const CARD_CONFIGS = {
  // Đổi slug để tạo đường dẫn riêng cho thiệp.
  default: {
    brideName: "Huỳnh Lê Hoài Ngọc",
    groomName: "Phan Hiếu Lễ",
    weddingDate: "28/11/2026",
    weddingEndDate: "29/11/2026",
    weddingDisplayDate: "Thứ Bảy - Chủ Nhật | 28–29.11.2026",
    lunarDate: "Nhằm ngày 20–21 tháng 10 năm Bính Ngọ",
    partyTime: "09:00",
    venueName: "Tư gia",
    weddingAddress: "Ấp Tây Bình, Thoại Giang, Thoại Sơn, An Giang",
    mapDirectionUrl: "https://www.google.com/maps/place/10%C2%B015'01.3%22N+105%C2%B015'14.8%22E/@10.2511493,105.2507882,1297m/data=!3m1!1e3!4m4!3m3!8m2!3d10.2503611!4d105.2541111?hl=vi&entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl: "https://www.google.com/maps?q=10.2503611,105.2541111&z=16&output=embed",
    brideImage: "assets/wife.jpg?v=20260512-03",
    groomImage: "assets/husband.jpg?v=20260512-03",
    brideParents: "Ông Huỳnh Văn Hùng\nBà Lê Thị Mỹ Linh",
    groomParents: "Ông Phan Thanh Tân\nBà Phạm Thị Rành",
    brideBio: "Ái nữ của gia đình, trân quý những khoảnh khắc sum vầy.",
    groomBio: "Út nam của gia đình, chân thành và luôn hướng về tổ ấm.",
    gallery: [
      "assets/gallery-1.jpg",
      "assets/gallery-2.jpg",
      "assets/gallery-3.jpg",
      "assets/gallery-4.jpg"
    ],
    story: [
      { icon: "✦", title: "Ngày gặp nhau", date: "Một ngày thật đẹp", text: "Từ những điều giản dị, hai gia đình cùng chứng kiến một hành trình yêu thương lớn dần." },
      { icon: "♡", title: "Ngày yêu nhau", date: "Những tháng ngày thương mến", text: "Tình yêu được vun đắp bằng sự chân thành, tin tưởng và những lời hẹn bình yên." },
      { icon: "◇", title: "Ngày báo tin", date: "28–29.11.2026", text: "Gia đình hai bên trân trọng báo tin lễ cưới của Huỳnh Lê Hoài Ngọc và Phan Hiếu Lễ." },
      { icon: "∞", title: "Ngày chung vui", date: "Thứ Bảy - Chủ Nhật | 28–29.11.2026", text: "Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi." }
    ],
    schedule: [
      { title: "Lễ cưới", time: "09:00", date: "Thứ Bảy - Chủ Nhật | 28–29.11.2026", place: "Tư gia", address: "Ấp Tây Bình, Thoại Giang, Thoại Sơn, An Giang" }
    ]
  },
  "bao-tran-dai-phat": {
    brideName: "Huỳnh Lê Hoài Ngọc",
    groomName: "Phan Hiếu Lễ"
  }
};

const ASSET_VERSION = "20260512-03";
// Paste the deployed Google Apps Script Web App URL here (ending in /exec).
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyhavXWOeGv9BZ0HItTVsxBqn5VxjolCV7gczB65It_q9U024xQLt3wqg8yFnzmxL8/exec";

const state = {
  config: mergeConfig(getCurrentConfig()),
  countdownInterval: null,
  musicStarted: false
};

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const selectors = {
  scrollProgress: document.getElementById("scrollProgress"),
  music: document.getElementById("weddingMusic"),
  musicToggle: document.getElementById("musicToggle"),
  openInvite: document.getElementById("openInvite"),
  backTop: document.getElementById("backTop"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightboxImage"),
  closeLightbox: document.getElementById("closeLightbox"),
  mapEmbed: document.getElementById("mapEmbed"),
  mapFallback: document.getElementById("mapFallback"),
  directionLink: document.getElementById("directionLink")
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  lockInviteAtTop();
  renderStaticFields();
  renderGallery();
  renderSchedule();
  renderDatePieces();
  setupCountdown();
  setupReveal();
  setupMusic();
  setupOpenInvite();
  setupBackTop();
  setupLightbox();
  setupMap();
  setupGuestForms();
  setupGiftBox();
  setupParallax();
  setupScrollProgress();
}

function lockInviteAtTop() {
  if (!document.body.classList.contains("invite-locked")) return;
  window.scrollTo(0, 0);
  window.setTimeout(() => window.scrollTo(0, 0), 0);
}

function getCurrentConfig() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("card") || window.location.hash.replace("#", "") || "default";
  return CARD_CONFIGS[slug] || CARD_CONFIGS.default;
}

function mergeConfig(config) {
  return {
    ...CARD_CONFIGS.default,
    ...config,
    story: config.story || CARD_CONFIGS.default.story,
    schedule: config.schedule || CARD_CONFIGS.default.schedule,
    gallery: config.gallery || CARD_CONFIGS.default.gallery
  };
}

function renderStaticFields() {
  document.querySelectorAll("[data-field]").forEach((element) => {
    const key = element.dataset.field;
    element.textContent = state.config[key] || "";
  });

  document.querySelectorAll("[data-image]").forEach((image) => {
    const key = image.dataset.image;
    image.src = state.config[key] || image.src;
  });
}

function renderDatePieces() {
  const weddingDate = parseVietnameseDate(state.config.weddingDate);
  if (!weddingDate) return;

  const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const day = String(weddingDate.getDate()).padStart(2, "0");
  const month = String(weddingDate.getMonth() + 1).padStart(2, "0");
  const year = String(weddingDate.getFullYear());

  document.querySelectorAll("[data-date-weekday]").forEach((element) => {
    element.textContent = weekdays[weddingDate.getDay()];
  });
  document.querySelectorAll("[data-date-day]").forEach((element) => {
    element.textContent = day;
  });
  document.querySelectorAll("[data-date-month]").forEach((element) => {
    element.textContent = month;
  });
  document.querySelectorAll("[data-date-year]").forEach((element) => {
    element.textContent = year;
  });
  document.querySelectorAll("[data-date-month-name]").forEach((element) => {
    element.textContent = `Tháng ${weddingDate.getMonth() + 1} - ${year}`;
  });

  renderSaveDateCalendar(weddingDate, parseVietnameseDate(state.config.weddingEndDate || state.config.weddingDate) || weddingDate);
}

function renderSaveDateCalendar(weddingDate, weddingEndDate = weddingDate) {
  const calendar = document.getElementById("saveDateCalendar");
  if (!calendar) return;

  const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlank = (firstDay.getDay() + 6) % 7;
  const cells = [`<span class="save-date__month">Tháng ${month + 1} năm ${year}</span>`];

  labels.forEach((label) => cells.push(`<span class="save-date__weekday">${label}</span>`));
  for (let index = 0; index < leadingBlank; index += 1) {
    cells.push("<span></span>");
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const currentDate = new Date(year, month, day);
    const isWeddingDay = currentDate >= new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate())
      && currentDate <= new Date(weddingEndDate.getFullYear(), weddingEndDate.getMonth(), weddingEndDate.getDate());
    cells.push(`<span class="${isWeddingDay ? "is-wedding-day" : ""}"${isWeddingDay ? ' aria-label="Ngày cưới"' : ""}>${day}</span>`);
  }

  calendar.innerHTML = cells.join("");
}

function renderStory() {
  const timeline = document.getElementById("storyTimeline");
  timeline.innerHTML = state.config.story.map((item) => `
    <article class="timeline-item reveal">
      <div class="timeline-item__icon" aria-hidden="true">${item.icon}</div>
      <div class="timeline-item__body">
        <time>${item.date}</time>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join("");
}

function renderGallery() {
  const gallery = document.getElementById("galleryGrid");
  gallery.innerHTML = state.config.gallery.map((src, index) => `
    <button class="gallery__item reveal" type="button" data-full="${withAssetVersion(src)}" aria-label="Mở ảnh cưới ${index + 1}">
      <img src="${withAssetVersion(src)}" alt="Ảnh cưới ${index + 1}">
    </button>
  `).join("");
}

function withAssetVersion(src) {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${ASSET_VERSION}`;
}

function renderSchedule() {
  const schedule = document.getElementById("scheduleGrid");
  const weddingDate = parseVietnameseDate(state.config.weddingDate);
  const weddingEndDate = parseVietnameseDate(state.config.weddingEndDate || state.config.weddingDate);
  const weekday = weddingDate ? ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][weddingDate.getDay()] : "";
  const endWeekday = weddingEndDate ? ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][weddingEndDate.getDay()] : "";
  const day = weddingDate ? String(weddingDate.getDate()).padStart(2, "0") : "11";
  const endDay = weddingEndDate ? String(weddingEndDate.getDate()).padStart(2, "0") : day;
  const month = weddingDate ? String(weddingDate.getMonth() + 1).padStart(2, "0") : "06";
  const endMonth = weddingEndDate ? String(weddingEndDate.getMonth() + 1).padStart(2, "0") : month;
  const year = weddingDate ? String(weddingDate.getFullYear()) : "2026";
  const endYear = weddingEndDate ? String(weddingEndDate.getFullYear()) : year;
  const weekdayLabel = weekday === endWeekday ? weekday : `${weekday} - ${endWeekday}`;
  const dayLabel = day === endDay ? day : `${day}–${endDay}`;
  const monthLabel = month === endMonth ? `Tháng ${month}` : `Tháng ${month}–${endMonth}`;
  const yearLabel = year === endYear ? `Năm ${year}` : `Năm ${year}–${endYear}`;
  schedule.innerHTML = state.config.schedule.map((item) => `
    <article class="schedule-card reveal">
      <div class="schedule-card__event">
        <h3>${item.title}</h3>
        <p>Vào lúc</p>
      </div>
      <div class="schedule-card__ceremony-grid" aria-label="Thời gian lễ vu quy">
        <div class="schedule-card__time-block"><strong>${item.time}</strong><span>Giờ bắt đầu</span></div>
        <div class="schedule-card__day-block ${day === endDay ? "" : "is-range"}">
          <span>${weekdayLabel}</span>
          <strong>${dayLabel}</strong>
          <em>${monthLabel} · ${yearLabel.replace("Năm ", "")}</em>
        </div>
      </div>
      <p class="schedule-card__lunar">(${state.config.lunarDate})</p>
      <p class="schedule-card__venue-line">Tại ${item.place}</p>
      <p class="schedule-card__intro">
        <span class="schedule-card__intro-lead">Kính mời quý vị đến chung vui trong ngày hạnh phúc của</span>
        <span class="schedule-card__intro-person"><small>Chú rể</small><strong>${state.config.groomName}</strong></span>
        <span class="schedule-card__intro-connector" aria-hidden="true">&amp;</span>
        <span class="schedule-card__intro-person"><small>Cô dâu</small><strong>${state.config.brideName}</strong></span>
      </p>
      <div class="countdown countdown--compact" id="countdownTimer" aria-live="polite">
        <div class="countdown__item"><strong data-unit="days">00</strong><span>Ngày</span></div>
        <div class="countdown__item"><strong data-unit="hours">00</strong><span>Giờ</span></div>
        <div class="countdown__item"><strong data-unit="minutes">00</strong><span>Phút</span></div>
        <div class="countdown__item"><strong data-unit="seconds">00</strong><span>Giây</span></div>
      </div>
      <p class="countdown__done" id="countdownDone">Ngày hạnh phúc đã đến</p>
      <div class="save-date-calendar" id="saveDateCalendar" role="group" aria-label="Lịch tháng có đánh dấu ngày cưới"></div>
      <div class="schedule-card__place">
        <strong>Địa điểm tổ chức</strong>
        <p>${item.address || item.place}</p>
      </div>
    </article>
  `).join("");
}

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  selectors.scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

function setupCountdown() {
  updateCountdown();
  state.countdownInterval = window.setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const targetDate = parseVietnameseDate(state.config.weddingDate, state.config.partyTime);
  const countdown = document.getElementById("countdownTimer");
  if (!targetDate) {
    setCountdownUnit("days", "00");
    setCountdownUnit("hours", "00");
    setCountdownUnit("minutes", "00");
    setCountdownUnit("seconds", "00");
    return;
  }

  const distance = targetDate.getTime() - Date.now();
  if (distance <= 0) {
    if (countdown) countdown.classList.add("is-done");
    window.clearInterval(state.countdownInterval);
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  setCountdownUnit("days", days);
  setCountdownUnit("hours", hours);
  setCountdownUnit("minutes", minutes);
  setCountdownUnit("seconds", seconds);
}

function setCountdownUnit(unit, value) {
  const element = document.querySelector(`[data-unit="${unit}"]`);
  if (!element) return;
  element.textContent = String(value).padStart(2, "0");
}

function parseVietnameseDate(dateValue, timeValue = "00:00") {
  const match = String(dateValue).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const timeMatch = String(timeValue).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  const hour = timeMatch ? Number(timeMatch[1]) : 0;
  const minute = timeMatch ? Number(timeMatch[2]) : 0;
  return new Date(Number(year), Number(month) - 1, Number(day), hour, minute, 0);
}

function setupReveal() {
  let previousScrollY = window.scrollY;

  const observer = new IntersectionObserver((entries) => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < previousScrollY;
    previousScrollY = currentScrollY;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        return;
      }

      if (isScrollingUp && entry.boundingClientRect.top > window.innerHeight * 0.72) {
        entry.target.classList.remove("is-visible");
      }
    });
  }, {
    rootMargin: "0px 0px -18% 0px",
    threshold: 0.12
  });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupMusic() {
  selectors.musicToggle.addEventListener("click", toggleMusic);
}

async function toggleMusic() {
  if (selectors.music.paused) {
    await playMusic();
  } else {
    selectors.music.pause();
    selectors.musicToggle.classList.remove("is-playing");
  }
}

async function playMusic() {
  try {
    await selectors.music.play();
    state.musicStarted = true;
    selectors.musicToggle.classList.add("is-playing");
  } catch (error) {
    selectors.musicToggle.classList.remove("is-playing");
    console.warn("Không thể phát nhạc nền. Kiểm tra file assets/Lễ Đường.mp3 hoặc assets/music.mp3.", error);
  }
}

function setupOpenInvite() {
  const curtain = document.getElementById("openingCurtain");
  if (!curtain || !selectors.openInvite) return;

  selectors.openInvite.addEventListener("click", () => {
    selectors.openInvite.disabled = true;
    window.scrollTo(0, 0);
    curtain.classList.add("is-opening");
    document.body.classList.add("invite-opening-out");
    if (!state.musicStarted) {
      playMusic();
    }

    window.setTimeout(() => {
      document.body.classList.remove("invite-locked", "invite-opening-out");
      document.body.classList.add("invite-opened");
      curtain.classList.add("is-open");
      window.scrollTo(0, 0);
    }, 2900);
  });
}

function slowScrollTo(target, duration) {
  const start = window.scrollY;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetTop - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = progress;
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

function setupBackTop() {
  window.addEventListener("scroll", () => {
    selectors.backTop.classList.toggle("is-visible", window.scrollY > 560);
  }, { passive: true });

  selectors.backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupScrollProgress() {
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
}

function setupLightbox() {
  document.getElementById("galleryGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".gallery__item");
    if (!button) return;
    selectors.lightboxImage.src = button.dataset.full;
    selectors.lightbox.classList.add("is-open");
    selectors.lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });

  selectors.closeLightbox.addEventListener("click", closeLightbox);
  selectors.lightbox.addEventListener("click", (event) => {
    if (event.target === selectors.lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function closeLightbox() {
  selectors.lightbox.classList.remove("is-open");
  selectors.lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function setupMap() {
  const hasEmbed = state.config.mapEmbedUrl && !state.config.mapEmbedUrl.includes("[");
  if (hasEmbed) {
    selectors.mapEmbed.src = state.config.mapEmbedUrl;
    selectors.mapFallback.hidden = true;
  }

  const hasDirection = state.config.mapDirectionUrl && !state.config.mapDirectionUrl.includes("[");
  selectors.directionLink.href = hasDirection ? state.config.mapDirectionUrl : "https://www.google.com/maps";
}

function setupGuestForms() {
  loadWishList();
  const thanksModal = document.getElementById("formThanksModal");
  const thanksMessage = document.getElementById("formThanksMessage");
  const thanksClose = document.getElementById("closeFormThanks");
  const thanksDone = document.getElementById("formThanksDone");
  const thanksBackdrop = document.getElementById("formThanksBackdrop");
  let previousFocus = null;

  const closeThanks = () => {
    if (!thanksModal || thanksModal.hidden) return;
    thanksModal.classList.remove("is-visible");
    document.body.classList.remove("no-scroll");
    window.setTimeout(() => {
      if (!thanksModal.classList.contains("is-visible")) thanksModal.hidden = true;
    }, 240);
    previousFocus?.focus();
  };

  const showThanks = (message) => {
    if (!thanksModal || !thanksMessage) return false;
    previousFocus = document.activeElement;
    thanksMessage.textContent = message;
    thanksModal.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => thanksModal.classList.add("is-visible"));
    thanksClose?.focus();
    return true;
  };

  thanksClose?.addEventListener("click", closeThanks);
  thanksDone?.addEventListener("click", closeThanks);
  thanksBackdrop?.addEventListener("click", closeThanks);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeThanks();
  });

  const forms = [
    [document.getElementById("wishForm"), document.getElementById("wishStatus"), "wish"],
    [document.getElementById("rsvpForm"), document.getElementById("rsvpStatus"), "rsvp"]
  ];

  forms.forEach(([form, status, type]) => {
    if (!form || !status) return;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!FORM_ENDPOINT) {
        status.textContent = "Biểu mẫu đang chờ kết nối Google Sheet. Gia đình chưa nhận được nội dung này.";
        return;
      }

      const submitButton = form.querySelector('[type="submit"]');
      const originalLabel = submitButton?.textContent;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Đang gửi…";
      }
      status.hidden = false;
      status.textContent = "Đang gửi đến gia đình…";

      const payload = new URLSearchParams();
      payload.set("type", type);
      new FormData(form).forEach((value, key) => payload.set(key, String(value)));
      const attendance = payload.get("attendance");

      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: payload
        });
        const thankYou = type === "wish"
          ? "Cảm ơn bạn đã gửi lời chúc thân thương. Chúng mình rất trân quý tình cảm của bạn!"
          : attendance === "yes"
            ? "Cảm ơn bạn đã xác nhận tham dự. Chúng mình mong được đón bạn trong ngày vui!"
            : "Cảm ơn bạn đã phản hồi. Chúng mình trân trọng tình cảm của bạn!";
        if (showThanks(thankYou)) {
          status.textContent = "";
          status.hidden = true;
        } else {
          status.hidden = false;
          status.textContent = thankYou;
        }
        form.reset();
        if (type === "wish") loadWishList();
      } catch (error) {
        status.textContent = "Gửi chưa thành công. Vui lòng kiểm tra kết nối rồi thử lại.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalLabel;
        }
      }
    });
  });
}

function loadWishList() {
  const list = document.getElementById("wishList");
  if (!list || !FORM_ENDPOINT) return;

  const cacheKey = `wedding_wishes_v1_${window.location.pathname}${window.location.search}${window.location.hash}`;
  let hasCachedWishes = false;
  try {
    const cached = JSON.parse(window.localStorage.getItem(cacheKey) || "null");
    if (Array.isArray(cached) && cached.length) {
      renderWishList(list, cached);
      hasCachedWishes = true;
    }
  } catch (error) {
    // Continue with the live request if local storage is unavailable.
  }

  list.setAttribute("aria-busy", "true");
  const callbackName = `weddingWishCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const script = document.createElement("script");
  const timeout = window.setTimeout(() => finishWithMessage("Chưa cập nhật được lời chúc mới."), 15000);

  const cleanup = () => {
    window.clearTimeout(timeout);
    script.remove();
    delete window[callbackName];
  };
  const finishWithMessage = (message) => {
    cleanup();
    list.setAttribute("aria-busy", "false");
    if (!hasCachedWishes) list.replaceChildren(createWishText(message, "guestbook__empty"));
  };

  window[callbackName] = (result) => {
    cleanup();
    list.setAttribute("aria-busy", "false");
    if (!result || !result.ok || !Array.isArray(result.wishes)) {
      if (!hasCachedWishes) list.replaceChildren(createWishText("Chưa tải được lời chúc. Vui lòng thử tải lại trang.", "guestbook__empty"));
      return;
    }

    hasCachedWishes = result.wishes.length > 0;
    try {
      window.localStorage.setItem(cacheKey, JSON.stringify(result.wishes));
    } catch (error) {
      // Rendering still works if the browser blocks local storage.
    }
    renderWishList(list, result.wishes);
  };

  script.onerror = () => finishWithMessage("Chưa tải được lời chúc. Vui lòng thử tải lại trang.");
  const url = new URL(FORM_ENDPOINT);
  url.searchParams.set("mode", "wishes");
  url.searchParams.set("callback", callbackName);
  url.searchParams.set("_", String(Date.now()));
  script.src = url.toString();
  document.head.appendChild(script);
}

function renderWishList(list, wishes) {
  list.setAttribute("aria-busy", "false");
  if (!wishes.length) {
    list.replaceChildren(createWishText("Chưa có lời chúc nào. Hãy gửi lời chúc đầu tiên nhé!", "guestbook__empty"));
    return;
  }

  const heading = createWishText("Lời chúc từ khách mời", "guestbook__messages-title");
  const cards = wishes.map((wish) => {
    const card = document.createElement("article");
    card.className = "guestbook__message";
    const name = createWishText(wish.name || "Một vị khách", "guestbook__message-name");
    const message = createWishText(wish.message || "", "guestbook__message-text");
    card.append(name, message);
    if (wish.date) card.append(createWishText(wish.date, "guestbook__message-date"));
    return card;
  });
  list.replaceChildren(heading, ...cards);
}

function createWishText(text, className) {
  const element = document.createElement("p");
  element.className = className;
  element.textContent = String(text || "");
  return element;
}

function setupGiftBox() {
  const openButton = document.getElementById("openGift");
  const modal = document.getElementById("giftModal");
  const closeButton = document.getElementById("closeGift");
  const backdrop = document.getElementById("giftBackdrop");
  if (!openButton || !modal || !closeButton || !backdrop) return;

  const closeModal = () => {
    if (modal.hidden) return;
    modal.classList.remove("is-visible");
    openButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    window.setTimeout(() => { modal.hidden = true; }, 240);
    openButton.focus();
  };

  openButton.addEventListener("click", () => {
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    openButton.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => modal.classList.add("is-visible"));
    closeButton.focus();
  });
  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function setupPetals() {
  window.setInterval(() => {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--petal-x", `${(Math.random() - 0.5) * 90}px`);
    petal.style.animationDuration = `${7 + Math.random() * 5}s`;
    petal.style.opacity = `${0.35 + Math.random() * 0.55}`;
    document.body.appendChild(petal);
    window.setTimeout(() => petal.remove(), 12000);
  }, 900);
}

function setupParallax() {
  const hero = document.querySelector("[data-parallax]");
  if (!hero) return;
  const heroImage = hero.querySelector(".hero__image");
  if (!heroImage) return;
  window.addEventListener("scroll", () => {
    const offset = Math.min(window.scrollY * 0.05, 40);
    heroImage.style.setProperty("--hero-offset", `${offset}px`);
  }, { passive: true });
}

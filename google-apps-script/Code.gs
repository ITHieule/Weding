
const SPREADSHEET_ID = "1BvzKgFkpAou14qO6251ziCuMcUNY1_dlJ8hBq_gGHLc";
const WISHES_CACHE_KEY = "public_wishes_v2";
const WEDDING_TIME_ZONE = "Asia/Ho_Chi_Minh";

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.mode !== "wishes") return jsonResponse({ ok: true, message: "Wedding form endpoint is ready." });

  const callback = String(params.callback || "").trim();
  if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return jsonResponse({ ok: false, error: "invalid_callback" });
  }

  const cache = CacheService.getScriptCache();
  const cachedWishes = cache.get(WISHES_CACHE_KEY);
  if (cachedWishes) return jsonpResponse(callback, JSON.parse(cachedWishes));

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName("Lời chúc");
  const wishes = [];
  if (sheet && sheet.getLastRow() > 1) {
    const lastRow = sheet.getLastRow();
    const firstRow = Math.max(2, lastRow - 49);
    const rows = sheet.getRange(firstRow, 1, lastRow - firstRow + 1, 3).getValues();
    rows.reverse().forEach((row) => {
      const name = displayCell(row[1]);
      const message = displayCell(row[2]);
      if (!name || !message) return;
      wishes.push({
        name,
        message,
        date: row[0] instanceof Date
          ? Utilities.formatDate(row[0], WEDDING_TIME_ZONE, "dd/MM/yyyy 'lúc' HH:mm")
          : String(row[0] || "")
      });
    });
  }

  try {
    cache.put(WISHES_CACHE_KEY, JSON.stringify(wishes), 60);
  } catch (error) {
    // Oversized responses still work; they just skip the optional cache.
  }
  return jsonpResponse(callback, wishes);
}

function jsonpResponse(callback, wishes) {
  return ContentService
    .createTextOutput(`${callback}(${JSON.stringify({ ok: true, wishes })});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const type = String(params.type || "").trim();
  const name = cleanCell(params.name, 120);

  if (!name) return jsonResponse({ ok: false, error: "missing_name" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    spreadsheet.setSpreadsheetTimeZone(WEDDING_TIME_ZONE);
    if (type === "wish") {
      const message = cleanCell(params.message, 2000);
      if (!message) return jsonResponse({ ok: false, error: "missing_message" });
      const sheet = getOrCreateSheet(spreadsheet, "Lời chúc", ["Thời gian", "Tên", "Lời chúc"]);
      sheet.appendRow([new Date(), name, message]);
      CacheService.getScriptCache().remove(WISHES_CACHE_KEY);
      return jsonResponse({ ok: true });
    }

    if (type === "rsvp") {
      const attendance = String(params.attendance || "").trim();
      if (!["yes", "no"].includes(attendance)) {
        return jsonResponse({ ok: false, error: "invalid_attendance" });
      }
      const sheet = getOrCreateSheet(spreadsheet, "Xác nhận tham dự", ["Thời gian", "Tên", "Tham dự"]);
      sheet.appendRow([new Date(), name, attendance === "yes" ? "Sẽ tham dự" : "Không tham dự"]);
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ ok: false, error: "invalid_type" });
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet(spreadsheet, name, headers) {
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function cleanCell(value, maxLength) {
  let result = String(value || "").trim().slice(0, maxLength);
  if (/^[=+@-]/.test(result)) result = "'" + result;
  return result;
}

function displayCell(value) {
  const result = String(value || "").trim();
  return /^'[=+@-]/.test(result) ? result.slice(1) : result;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

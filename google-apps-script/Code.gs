const SPREADSHEET_ID = "1BvzKgFkpAou14qO6251ziCuMcUNY1_dlJ8hBq_gGHLc";

function doPost(e) {
  const params = (e && e.parameter) || {};
  const type = String(params.type || "").trim();
  const name = cleanCell(params.name, 120);

  if (!name) return jsonResponse({ ok: false, error: "missing_name" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (type === "wish") {
      const message = cleanCell(params.message, 2000);
      if (!message) return jsonResponse({ ok: false, error: "missing_message" });
      const sheet = getOrCreateSheet(spreadsheet, "Lời chúc", ["Thời gian", "Tên", "Lời chúc"]);
      sheet.appendRow([new Date(), name, message]);
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

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

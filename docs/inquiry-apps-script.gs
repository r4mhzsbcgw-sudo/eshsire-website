/**
 * Google Apps Script — receive inquiry POST JSON and append to Sheet.
 *
 * Setup:
 * 1. Create sheet tab "Inquiries" with headers (see inquiry-google-sheets-setup.md)
 * 2. Paste this file in Apps Script editor
 * 3. Deploy as Web App (Anyone can access)
 * 4. Set deployment URL as INQUIRY_WEBHOOK_URL
 */

const SHEET_NAME = "Inquiries";

const HEADERS = [
  "createdAt",
  "name",
  "email",
  "whatsapp",
  "country",
  "productInterest",
  "quantity",
  "targetPrice",
  "customerType",
  "message",
  "locale",
  "sourcePage",
  "userAgent",
  "status",
  "nextFollowUpDate",
  "followUpOwner",
  "notes",
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "Missing request body" });
    }

    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ success: false, error: "Sheet not found" });
    }

    // Ensure header row exists on first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    const row = HEADERS.map(function (key) {
      if (key === "followUpOwner" || key === "notes") {
        return data[key] != null ? String(data[key]) : "";
      }
      return data[key] != null ? String(data[key]) : "";
    });

    sheet.appendRow(row);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: "Unable to process inquiry" });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Apps Script - שליחת נתונים מטופס ל-Google Sheet
// עותק את הקוד הזה ל-Google Apps Script Editor

function doPost(e) {
  try {
    // קבל את ה-Sheet ID מהקישור שלך
    const SHEET_ID = "1y3w-R14NSPs5kb3uuFjW8bFYB4eiyTwlY9DDyLS0xtQ";
    const SHEET_NAME = "Sheet1";
    
    // פתח את ה-Spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // קבל את הנתונים מהטופס
    const data = e.postData.contents;
    const params = new URLSearchParams(data);
    
    // בנה שורה חדשה עם כל הנתונים
    const row = [];
    
    // הוסף timestamp
    row.push(new Date().toLocaleString('he-IL'));
    
    // הוסף את כל השדות מהטופס
    const fields = [
      'store_name',
      'store_address',
      'store_phone',
      'store_email',
      'contact_name',
      'contact_phone',
      'business_type',
      'company_number',
      'authorized_number',
      'delivery_days',
      'delivery_zones',
      'business_hours',
      'delivery_schedule',
      'notes',
      'timestamp'
    ];
    
    fields.forEach(field => {
      const value = params.get(field) || '';
      row.push(value);
    });
    
    // הוסף שורה חדשה ל-Sheet
    sheet.appendRow(row);
    
    // החזר תשובה של הצלחה
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'הנתונים נשלחו בהצלחה!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // החזר שגיאה
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// פונקציה ליצירת Web App
function createWebApp() {
  // פתח את ה-Script Editor בדפדפן
  // בחר Deploy > New deployment
  // בחר "Web app"
  // בחר "Execute as: [your email]"
  // בחר "Who has access: Anyone"
  // לחץ Deploy
  // העתק את ה-URL וחבר אותו בטופס
}

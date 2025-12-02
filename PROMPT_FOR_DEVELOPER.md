# פרומט לתיקון טופס הקמת לקוח

## תיקונים שביקש המשתמש:

### 1. **יום ראשון צריך להיות האפשרות הראשונה בסינון**
- כרגע הסדר הוא: יום שני, שלישי, רביעי... ראשון
- צריך להיות: **ראשון, שני, שלישי, רביעי, חמישי, שישי, שבת**
- זה צריך להיות בקטע "שעות משלוח לפי ימים"

### 2. **כשהעסק סגור - לא להציג שעות משלוח**
- אם המשתמש בחר "סגור" ביום מסוים, השדות של שעות משלוח צריכים להיות מוסתרים
- צריך checkbox או toggle: "העסק סגור ביום זה" → אם מסומן, הסתר את שדות השעות
- אם לא סגור, הצג את שדות השעות

### 3. **שדות חובה - כל שדה שלא צריך קובץ הוא חובה**
- שדות חובה צריכים להיות:
  - שם החנות
  - כתובת החנות
  - טלפון
  - אימייל
  - שם איש קשר
  - טלפון איש קשר
  - סוג עסק (חברה / מורשה)
  - מספר חברה / מורשה (תלוי בבחירה)
  - ימי משלוח (לפחות יום אחד)
  - אזורי משלוח (לפחות אזור אחד)
  - שעות משלוח (אם העסק פתוח)
- שדות שלא חובה:
  - הערות (אופציונלי)
  - קבצים (חובה רק אם צריך: תעודת זהות, לוגו, תקנון, נגישות)

### 4. **שליחה לא עובדת - תקן את Google Forms integration**
- כרגע: `fetch("https://docs.google.com/forms/d/e/1xZPYqsqnl6cZeCucfkzDTYlRBBC-rbipHLCAlHmvVnk/formResponse"...)`
- צריך:
  - לוודא שה-Form ID נכון
  - לוודא שכל שדה בטופס מחובר לשדה בטופס ה-Google Forms
  - להוסיף error handling טוב
  - להציג הודעת הצלחה / כישלון בברור

---

## טעויות וטיקונים נוספים שראיתי בקוד:

### 5. **בעיה בשליחה - שדות לא מחוברים**
- הטופס שולח `FormData` אבל Google Forms דורש שדות ספציפיים
- צריך לשלוח עם שמות שדות נכונים: `entry_XXXXXX`
- כל שדה ב-Google Forms יש לו ID ייחודי שצריך להשתמש בו

### 6. **Validation לא עובד כמו שצריך**
- צריך לוודא שכל שדה חובה מולא לפני שליחה
- צריך להציג הודעות שגיאה ברורות לכל שדה

### 7. **סדר הימים בטופס**
- צריך לשנות מ: `['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']`
- ל: `['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']`

### 8. **שדות קבצים**
- צריך לוודא שרק קבצים שצריכים הם חובה
- קבצים שלא צריכים צריכים להיות אופציונליים

---

## קוד שצריך להחליף/להוסיף:

### A. סדר הימים (בקטע JavaScript):
```javascript
// החלף את זה:
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayNames = ['יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת', 'יום ראשון'];

// ל:
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const dayNames = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת'];
```

### B. הוסף checkbox "סגור" לכל יום:
```html
<!-- בתוך .day-body-integrated, הוסף:-->
<div class="form-group">
  <label>
    <input type="checkbox" name="closed_${day}" class="closed-checkbox" data-day="${day}">
    העסק סגור ביום זה
  </label>
</div>
```

### C. JavaScript להסתרת שעות כשסגור:
```javascript
document.querySelectorAll('.closed-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const day = this.dataset.day;
    const hoursSection = document.querySelector(`[data-hours-day="${day}"]`);
    if (this.checked) {
      hoursSection.style.display = 'none';
    } else {
      hoursSection.style.display = 'block';
    }
  });
});
```

### D. תקן את שליחת הטופס:
```javascript
// החלף את ה-fetch הישן ב:
fetch("https://docs.google.com/forms/d/e/1xZPYqsqnl6cZeCucfkzDTYlRBBC-rbipHLCAlHmvVnk/formResponse", {
  method: "POST",
  body: new URLSearchParams({
    // צריך להוסיף את ה-entry IDs הנכונים מה-Google Form
    "entry.XXXXXX": document.getElementById('store_name').value,
    "entry.YYYYYY": document.getElementById('store_address').value,
    // וכו'...
  }),
  mode: 'no-cors'
}).then(() => {
  document.getElementById("successMsg").style.display = "block";
  form.reset();
}).catch(err => {
  alert("אירעה שגיאה בשליחה");
  console.error(err);
});
```

### E. וודא שדות חובה:
```javascript
function validateForm(){
  let isValid = true;
  
  // שדות חובה בסיסיים
  const requiredFields = [
    'store_name', 'store_address', 'store_phone', 'store_email',
    'contact_name', 'contact_phone', 'business_type'
  ];
  
  requiredFields.forEach(field => {
    const value = document.getElementById(field).value.trim();
    if (!value) {
      showError(field);
      isValid = false;
    } else {
      showError(field, false);
    }
  });
  
  // וודא שלפחות יום אחד נבחר
  const anyDaySelected = Array.from(document.querySelectorAll('.closed-checkbox'))
    .some(cb => !cb.checked);
  if (!anyDaySelected) {
    alert("צריך לבחור לפחות יום אחד שהעסק פתוח");
    isValid = false;
  }
  
  return isValid;
}
```

---

## סיכום:
- **סדר הימים**: שנה מיום שני ל-יום ראשון
- **סגור**: הוסף checkbox "סגור" להסתרת שעות
- **שליחה**: תקן את ה-Google Forms integration עם entry IDs נכונים
- **Validation**: וודא שכל שדה חובה מולא

---

## הערות חשובות:
1. **Google Forms Entry IDs**: צריך להשיג את ה-entry IDs מה-Google Form (לחץ F12 בטופס וחפש `entry.`)
2. **CORS**: Google Forms דורש `mode: 'no-cors'` בפעמים מסוימות
3. **Testing**: בדוק שהנתונים מגיעים ל-Google Sheet אחרי כל שינוי


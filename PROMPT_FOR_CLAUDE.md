# פרומט לקלוד - בניית טופס הקמת לקוח מאפס

## מטרה
בנה טופס HTML מלא לקבלת פרטי לקוח עם חיבור מלא ל-Google Sheet.

## דרישות עיקריות

### 1. עיצוב וחוויית משתמש

#### צבעים
- **ירוק ראשי:** #20d85b (כפתורים, כותרות, borders)
- **ירוק כהה:** #1aaf4f (background gradient)
- **צהוב:** #fdf76e (כפתור שליחה)
- **צהוב כהה:** #f0e85e (hover state)
- **אדום:** #dc3545 (שגיאות, required)
- **ירוק בהיר:** #f0fff0 (valid state)
- **אדום בהיר:** #fff0f0 (invalid state)

#### Typography
- **Font:** Rubik, Arial, sans-serif
- **כותרת ראשית (h1):** 28px, bold, ירוק, centered
- **כותרות משנה (h2):** 20px, bold, ירוק, עם border-bottom ירוק
- **Labels:** 14px, bold, אפור כהה
- **Input text:** 16px (חשוב ל-iOS!)
- **Error messages:** 12px, אדום, bold

#### Layout
- **Container:** max-width 800px, centered, padding 30px
- **Mobile:** max-width 100%, padding 15px
- **Gaps:** 15px בין form-groups
- **Border radius:** 10-16px לכל הרכיבים

#### Inputs & Buttons
- **Input border:** 2px solid #e0e0e0
- **Input focus:** border #20d85b, box-shadow ירוק בהיר
- **Input valid:** border #28a745, background #f0fff0
- **Input invalid:** border #dc3545, background #fff0f0
- **Placeholder:** אפור בהיר, עברית

#### Buttons
- **Submit button:** gradient ירוק-צהוב, 16px padding, 25px border-radius
- **Add button:** ירוק, 12px padding, 20px border-radius
- **Delete button:** אדום, 10px padding, 6px border-radius
- **Hover:** translateY(-2px), box-shadow גדול יותר
- **Active:** translateY(0), box-shadow קטן יותר

#### Animations
- **Fade in:** 0.4s ease
- **Slide down:** 0.5s ease
- **Slide up:** 0.4s ease
- **Shake (error):** 0.3s ease
- **Transitions:** 0.3s ease לכל הרכיבים

#### Progress Bar
- **Background:** #e0e0e0
- **Fill:** gradient ירוק-צהוב
- **Height:** 6px
- **Border radius:** 3px
- **Text:** 13px, אפור, centered

#### Responsive
- **Desktop (769px+):** 2 columns, full width inputs
- **Tablet (481-768px):** 2 columns לחלק מהשדות
- **Mobile (max 480px):** 1 column, 16px font size לכל inputs

#### עברית (RTL)
- **dir="rtl"** בכל HTML
- **text-align:** right לכל הטקסט
- **margin-left/right:** הפוך (left = right, right = left)
- **flex-direction:** row-reverse כשצריך

- ✅ עברית (RTL)
- ✅ צבעים: ירוק (#20d85b) וצהוב (#fdf76e)
- ✅ Responsive - טוב בטלפון וממחשב
- ✅ Animations חלקות
- ✅ Progress bar - מראה כמה % מהטופס מולא
- ✅ Placeholders עוזרים למשתמש

### 2. שדות חובה (עם * אדום)
- שם החנות
- כתובת החנות
- טלפון
- מייל
- שם איש קשר
- טלפון איש קשר
- עלות משלוח
- מינימום הזמנה
- סוג עסק (חברה / מורשה)
- מספר חברה / מורשה (תלוי בבחירה)
- ימי משלוח (לפחות יום אחד)

### 3. סדר הימים - חשוב!
**סדר נכון:**
1. יום ראשון (Sunday)
2. יום שני (Monday)
3. יום שלישי (Tuesday)
4. יום רביעי (Wednesday)
5. יום חמישי (Thursday)
6. יום שישי (Friday)
7. שבת (Saturday)

### 4. Checkbox "סגור" - חשוב!
- לכל יום צריך checkbox: "העסק סגור ביום זה"
- **כשמסומן:**
  - הסתר את שדות שעות המשלוח
  - הסתר את חלונות המשלוח
  - הפוך את הטקסט לאפור
- **כשלא מסומן:**
  - הצג את שדות השעות
  - הצג את חלונות המשלוח

### 5. Validation - חשוב!
- וודא שכל שדה חובה מולא
- בדוק פורמט מייל
- בדוק פורמט טלפון
- בדוק שלפחות יום אחד פתוח
- הצג הודעות שגיאה ברורות

### 6. שליחה ל-Google Sheet - חשוב!
**Google Form ID:** `1xZPYqsqnl6cZeCucfkzDTYlRBBC-rbipHLCAlHmvVnk`

**Entry IDs (צריך לתקן את זה):**
```
store_name: entry.123456789
store_address: entry.987654321
store_phone: entry.111111111
store_email: entry.222222222
contact_name: entry.333333333
contact_phone: entry.444444444
website_url: entry.555555555
facebook_url: entry.666666666
instagram_url: entry.777777777
tiktok_url: entry.888888888
business_type: entry.999999999
delivery_cost: entry.101010101
min_order: entry.202020202
free_shipping_from: entry.303030303
gtag: entry.404040404
meta_pixel: entry.505050505
whatsapp: entry.606060606
```

**שליחה:**
```javascript
fetch("https://docs.google.com/forms/d/e/1xZPYqsqnl6cZeCucfkzDTYlRBBC-rbipHLCAlHmvVnk/formResponse", {
  method: "POST",
  body: formData,
  mode: 'no-cors'
})
```

### 7. שדות בטופס

#### פרטים בסיסיים
- שם החנות (חובה)
- כתובת החנות (חובה)
- טלפון (חובה)
- מייל (חובה)
- שם איש קשר (חובה)
- טלפון איש קשר (חובה)

#### רשתות חברתיות (אופציונלי)
- אתר אינטרנט
- דף פייסבוק
- אינסטגרם
- טיקטוק

#### סוג עסק (חובה)
- בחר: חברה בע"מ / עוסק מורשה
- אם חברה: שדה מספר חברה + קובץ תעודה
- אם מורשה: שדה מספר מורשה + קובץ אישור

#### עלויות (חובה)
- עלות משלוח (חובה)
- מינימום הזמנה (חובה)
- משלוח חינם מסכום (אופציונלי)

#### פיקסלים (אופציונלי)
- GTag
- Meta Pixel
- WhatsApp

#### שעות פעילות (חובה)
**לכל יום:**
- Checkbox: "העסק סגור ביום זה"
- שעת התחלה
- שעת סיום

#### שעות משלוח לפי ימים (חובה)
**לכל יום:**
- Checkbox: "העסק סגור ביום זה"
- שעת התחלה משלוח
- שעת סיום משלוח
- גודל חלון משלוח (בדקות)
- תצוגה של חלונות משלוח שנוצרו אוטומטית

#### אזורי משלוח (חובה - לפחות אזור אחד)
- כפתור: "הוסף אזור"
- לכל אזור:
  - שם האזור (חובה)
  - עלות משלוח (חובה)
  - כפתור: "מחק אזור"
- צריך לפחות אזור אחד לפני שליחה
- דוגמה: "תל אביב" - 25 ₪, "ירושלים" - 35 ₪

#### קבצים (אופציונלי)
- לוגו
- תקנון
- הצהרת נגישות

#### הערות (אופציונלי)
- textarea חופשי

### 8. JavaScript דרישות
- ✅ Validation שדות חובה
- ✅ Validation פורמט (מייל, טלפון)
- ✅ Checkbox "סגור" - הסתרת שעות
- ✅ יצירת חלונות משלוח אוטומטית
- ✅ Progress bar - עדכון בזמן אמת
- ✅ שליחה ל-Google Sheet
- ✅ הודעת הצלחה / שגיאה
- ✅ ניקוי הטופס אחרי שליחה

### 9. תכונות נוספות
- ✅ Loading state בכפתור שליחה
- ✅ Disabled state כשמשלחים
- ✅ Scroll to top אחרי הצלחה
- ✅ Error messages ברורות
- ✅ Success message ברורה

## ملاحظات חשובות
1. **סדר הימים** - יום ראשון MUST להיות ראשון!
2. **Checkbox סגור** - MUST להסתיר שעות כשמסומן!
3. **Google Sheet** - צריך entry IDs נכונים!
4. **Validation** - צריך לבדוק שדות חובה בשליחה!
5. **Responsive** - צריך לעבוד על טלפון!

## קוד ההתחלה
```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>טופס הקמת לקוח</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* CSS כאן */
  </style>
</head>
<body>
  <div class="form-container">
    <h1>טופס הקמת לקוח</h1>
    <form id="clientForm" enctype="multipart/form-data">
      <!-- שדות כאן -->
    </form>
  </div>
  <script>
    // JavaScript כאן
  </script>
</body>
</html>
```

## בדיקה
1. מלא את הטופס בנתונים אמיתיים
2. לחץ "שלח"
3. בדוק ש-Google Sheet מתעדכן
4. בדוק שהודעת הצלחה מופיעה

---

**תודה על בניית הטופס! זה צריך להיות מושלם!** 🚀

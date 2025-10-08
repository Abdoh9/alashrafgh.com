# موقع الأشراف للإلكترونيات

## خطوات نشر الموقع

1. إنشاء حساب على GitHub:
   - سجل حساب على https://github.com
   - قم بتأكيد بريدك الإلكتروني

2. إنشاء مستودع جديد:
   - اسم المستودع: alashraf-website
   - اجعله عاماً (public)
   - انسخ رابط المستودع

3. رفع الملفات:
   ```bash
   git init
   git add .
   git commit -m "النسخة الأولى"
   git branch -M main
   git remote add origin <رابط-المستودع>
   git push -u origin main
   ```

4. تفعيل GitHub Pages:
   - افتح إعدادات المستودع على GitHub
   - انتقل إلى قسم "Pages"
   - اختر الفرع "main"
   - احفظ

5. إضافة نطاق مخصص (اختياري):
   - سجل نطاقاً من موقع مثل Namecheap
   - أضف سجلات DNS التالية:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     ```
   - انتظر انتشار DNS (قد يستغرق 24 ساعة)

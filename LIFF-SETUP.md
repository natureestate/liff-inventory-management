# การตั้งค่า LIFF (LINE Front-end Framework)

## ข้อมูล LIFF ที่ได้รับ

### Basic Information
- **LIFF ID**: `2007546326-RqNGeGEX`
- **LIFF URL**: `https://liff.line.me/2007546326-RqNGeGEX`
- **LIFF App Name**: `naturestockapp`

## การตั้งค่า Environment Variables

ข้อมูล LIFF ได้ถูกเพิ่มลงในไฟล์ `.env` แล้ว:

```env
# LIFF Configuration
VITE_LIFF_ID=2007546326-RqNGeGEX
VITE_LIFF_URL=https://liff.line.me/2007546326-RqNGeGEX
VITE_LIFF_APP_NAME=naturestockapp
```

## ไฟล์ที่เกี่ยวข้อง

### 1. Environment Configuration
- `.env` - ข้อมูล environment variables จริง
- `.env.example` - ไฟล์ตัวอย่างสำหรับ developers อื่น
- `src/types/env.d.ts` - TypeScript definitions สำหรับ environment variables

### 2. LIFF Implementation
- `src/lib/liff.ts` - LIFF SDK wrapper functions
- `src/contexts/LiffContext.tsx` - React Context สำหรับ LIFF state management
- `src/types/liff.ts` - TypeScript types สำหรับ LIFF

### 3. Debug Component
- `src/components/common/LiffInfo.tsx` - Component สำหรับแสดงข้อมูล LIFF (debug)

## การใช้งาน

### 1. ตรวจสอบสถานะ LIFF
เมื่อเปิดแอปพลิเคชัน จะแสดงข้อมูล LIFF ในส่วน "LIFF Information" ที่ด้านบนของหน้า:

- สถานะการเชื่อมต่อ LIFF
- ข้อมูลผู้ใช้ (หากเข้าสู่ระบบ)
- การตั้งค่า Environment Variables
- ข้อมูลอุปกรณ์และบริบท

### 2. การใช้งาน LIFF Context
```tsx
import { useLiff } from '../contexts/LiffContext'

function MyComponent() {
  const liff = useLiff()
  
  // ตรวจสอบสถานะ
  if (liff.isLoading) return <div>กำลังโหลด...</div>
  if (liff.error) return <div>ข้อผิดพลาด: {liff.error}</div>
  
  // ใช้งาน LIFF functions
  const handleLogin = () => liff.login()
  const handleLogout = () => liff.logout()
  
  return (
    <div>
      {liff.isLoggedIn ? (
        <div>
          <p>สวัสดี {liff.profile?.displayName}</p>
          <button onClick={handleLogout}>ออกจากระบบ</button>
        </div>
      ) : (
        <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      )}
    </div>
  )
}
```

### 3. การส่งข้อความไปยัง LINE
```tsx
const handleSendMessage = async () => {
  try {
    await liff.sendMessage({
      type: 'text',
      text: 'สวัสดีจาก LIFF App!'
    })
  } catch (error) {
    console.error('ไม่สามารถส่งข้อความได้:', error)
  }
}
```

## การทดสอบ

### 1. ทดสอบใน Browser ปกติ
- เปิด `http://localhost:3100`
- จะแสดงสถานะ "ไม่ใน LINE Client"
- LIFF จะไม่สามารถใช้งานได้เต็มรูปแบบ

### 2. ทดสอบใน LINE Browser
- เปิด LIFF URL: `https://liff.line.me/2007546326-RqNGeGEX`
- จะแสดงสถานะ "ใน LINE Client"
- สามารถใช้งาน LIFF features ได้เต็มรูปแบบ

## หมายเหตุ

1. **Development Mode**: ตอนนี้อยู่ในโหมด development ดังนั้น LIFF จะทำงานใน localhost
2. **Production**: เมื่อ deploy จริง จะต้องอัปเดต LIFF URL ใน LINE Developers Console
3. **Debug Component**: `LiffInfo` component ควรถูกซ่อนหรือลบออกใน production
4. **Security**: ไฟล์ `.env` ถูกเพิ่มใน `.gitignore` เพื่อความปลอดภัย

## ขั้นตอนถัดไป

1. ทดสอบ LIFF ใน LINE Browser
2. Implement LIFF features เพิ่มเติม (QR Scanner, Share Target Picker, etc.)
3. เพิ่ม error handling และ loading states
4. ปรับปรุง UI/UX สำหรับ LINE environment
5. เตรียม deployment configuration 
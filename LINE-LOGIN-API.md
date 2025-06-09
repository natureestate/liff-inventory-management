# LINE Login API Integration

## สรุปการทำความเข้าใจ LINE Login API

จากเอกสาร [LINE Login v2.1 API reference](https://developers.line.biz/en/reference/line-login/#revoke-access-token) มีจุดสำคัญดังนี้:

### 1. OAuth 2.0 Flow และ Token Management

#### Access Token
- **อายุการใช้งาน**: 30 วัน
- **การใช้งาน**: เข้าถึงข้อมูลผู้ใช้ (profile, user info)
- **รูปแบบ**: Bearer Token
- **การได้มา**: ผ่าน authorization code หรือ refresh token

#### Refresh Token
- **อายุการใช้งาน**: 90 วัน (นับจากวันที่ออก access token)
- **การใช้งาน**: ขอ access token ใหม่โดยไม่ต้องให้ผู้ใช้ login ใหม่
- **หมายเหตุ**: การขอ access token ใหม่จะไม่ขยายอายุของ refresh token

#### ID Token (JWT)
- **เงื่อนไข**: ต้องขอ `openid` scope
- **เนื้อหา**: ข้อมูลผู้ใช้ในรูปแบบ JWT
- **การตรวจสอบ**: ต้องใช้ verify endpoint เพื่อความปลอดภัย

### 2. API Endpoints หลัก

#### Issue Access Token
```
POST https://api.line.me/oauth2/v2.1/token
```
- **การใช้งาน**: แลกเปลี่ยน authorization code เป็น access token
- **Parameters**: grant_type, code, redirect_uri, client_id, client_secret
- **Response**: access_token, refresh_token, expires_in, scope, token_type

#### Verify Access Token
```
GET https://api.line.me/oauth2/v2.1/verify?access_token={token}
```
- **การใช้งาน**: ตรวจสอบความถูกต้องและข้อมูลของ access token
- **Response**: scope, client_id, expires_in

#### Get User Profile
```
GET https://api.line.me/v2/profile
Authorization: Bearer {access_token}
```
- **Scope ที่ต้องการ**: `profile`
- **Response**: userId, displayName, pictureUrl, statusMessage

#### Get User Information (OpenID)
```
GET https://api.line.me/oauth2/v2.1/userinfo
Authorization: Bearer {access_token}
```
- **Scope ที่ต้องการ**: `openid`
- **Response**: sub, name, picture

#### Refresh Access Token
```
POST https://api.line.me/oauth2/v2.1/token
```
- **Parameters**: grant_type=refresh_token, refresh_token, client_id, client_secret
- **Response**: access_token, refresh_token, expires_in, scope, token_type

#### Revoke Access Token
```
POST https://api.line.me/oauth2/v2.1/revoke
```
- **Parameters**: access_token, client_id, client_secret
- **Response**: 200 OK (empty body)

### 3. Rate Limits และ Error Handling

#### HTTP Status Codes
- **200 OK**: สำเร็จ
- **400 Bad Request**: พารามิเตอร์ผิดพลาด
- **401 Unauthorized**: Authorization header ผิดพลาด
- **403 Forbidden**: ไม่มีสิทธิ์ใช้ API
- **429 Too Many Requests**: เกิน rate limit
- **500 Internal Server Error**: ข้อผิดพลาดของเซิร์ฟเวอร์

#### Rate Limits
- LINE ไม่เปิดเผยค่า rate limit threshold
- หลีกเลี่ยงการส่ง request จำนวนมากในเวลาสั้น
- ไม่ควรใช้สำหรับ load testing

## การ Implementation ใน LIFF App

### 1. LIFF SDK vs LINE Login API

#### LIFF SDK (ที่เราใช้)
```typescript
// ใช้ LIFF SDK สำหรับ basic operations
liff.login()
liff.logout()
liff.getProfile()
liff.getAccessToken()
```

#### LINE Login API (เพิ่มเติม)
```typescript
// เรียกใช้ LINE Login API โดยตรงสำหรับ advanced features
await verifyAccessToken()
await getLineProfile()
await getLineUserInfo()
await revokeAccessToken()
```

### 2. ไฟล์ที่เกี่ยวข้อง

#### `src/lib/liff.ts`
- เพิ่มฟังก์ชัน `verifyAccessToken()` - ตรวจสอบ access token
- เพิ่มฟังก์ชัน `getLineProfile()` - ดึงข้อมูลจาก /v2/profile
- เพิ่มฟังก์ชัน `getLineUserInfo()` - ดึงข้อมูลจาก /oauth2/v2.1/userinfo
- เพิ่มฟังก์ชัน `revokeAccessToken()` - ยกเลิก access token
- ปรับปรุง `loginWithLiff()` - รองรับ redirect URI และ state parameter

#### `src/components/common/LineLoginTest.tsx`
- Component สำหรับทดสอบ LINE Login API
- ทดสอบการเรียกใช้ API endpoints ต่างๆ
- แสดงผลลัพธ์และ error handling

### 3. การใช้งาน

#### ตรวจสอบ Access Token
```typescript
const tokenInfo = await verifyAccessToken()
// Returns: { scope, client_id, expires_in }
```

#### ดึงข้อมูลผู้ใช้แบบต่างๆ
```typescript
// ผ่าน LIFF SDK (profile scope)
const liffProfile = await getLiffProfile()

// ผ่าน LINE Login API (profile scope)
const lineProfile = await getLineProfile()

// ผ่าน LINE Login API (openid scope)
const userInfo = await getLineUserInfo()
```

#### ยกเลิก Access Token
```typescript
const success = await revokeAccessToken()
if (success) {
  // Token ถูกยกเลิกเรียบร้อย
}
```

### 4. Security Considerations

#### Token Storage
- Access token ถูกจัดการโดย LIFF SDK
- ไม่ควรเก็บ token ใน localStorage หรือ sessionStorage
- ใช้ `liff.getAccessToken()` เพื่อดึง token เมื่อต้องการ

#### Token Validation
- ตรวจสอบ token ด้วย `verifyAccessToken()` ก่อนใช้งาน
- ตรวจสอบ scope ที่ได้รับว่าตรงกับที่ต้องการ
- Handle token expiration gracefully

#### API Calls
- ใช้ HTTPS เสมอ
- ส่ง Authorization header ที่ถูกต้อง
- Handle rate limiting และ error responses

## การทดสอบ

### 1. ใน Development Environment
- เปิด `http://localhost:3100`
- ใช้ "LINE Login API Test" component
- ทดสอบ API calls ต่างๆ

### 2. ใน LINE Browser
- เปิด LIFF URL: `https://liff.line.me/2007546326-RqNGeGEX`
- Login ผ่าน LINE
- ทดสอบ API calls ที่ต้องการ authentication

### 3. Test Cases
1. **Verify Token**: ตรวจสอบ access token validity
2. **Get Profile**: ดึงข้อมูล profile ผ่าน /v2/profile
3. **Get User Info**: ดึงข้อมูล user info ผ่าน /oauth2/v2.1/userinfo
4. **Revoke Token**: ยกเลิก access token

## ข้อควรระวัง

1. **Scope Requirements**: แต่ละ API ต้องการ scope ที่แตกต่างกัน
2. **Token Expiration**: Access token หมดอายุใน 30 วัน
3. **Rate Limiting**: หลีกเลี่ยงการเรียก API บ่อยเกินไป
4. **Error Handling**: จัดการ error cases ให้ครบถ้วน
5. **Security**: ไม่เปิดเผย client_secret ใน frontend code

## ขั้นตอนถัดไป

1. ทดสอบ API calls ใน LINE environment
2. Implement proper error handling และ retry logic
3. เพิ่ม token refresh mechanism
4. เพิ่ม logging และ monitoring
5. เตรียม production deployment 
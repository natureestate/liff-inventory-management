# 🛠️ Port Management Scripts

Scripts สำหรับจัดการ Port 3100 ของ LIFF Inventory Application

## 📋 รายการ Scripts

### 1. Port Manager (เมนูโต้ตอบ)
**ไฟล์:** `scripts/port-manager.sh`

Script หลักที่มีเมนูโต้ตอบสำหรับจัดการ port 3100

#### การใช้งาน:
```bash
# เปิดเมนูโต้ตอบ
./scripts/port-manager.sh

# หรือใช้ command line โดยตรง
./scripts/port-manager.sh [command]
```

#### Commands:
- `check` - ตรวจสอบ process ที่ใช้ port 3100
- `kill` - Kill process ที่ใช้ port 3100 (แบบ graceful)
- `start` - เริ่มต้นแอปพลิเคชัน
- `restart` - Restart แอปพลิเคชัน
- `help` - แสดงวิธีการใช้งาน

### 2. Quick Port (การใช้งานเร็ว)
**ไฟล์:** `scripts/quick-port.sh`

Script สำหรับการดำเนินการเร็วๆ โดยไม่ต้องเปิดเมนู

#### การใช้งาน:
```bash
# Quick actions
./scripts/quick-port.sh [action]
```

#### Actions:
- `kill` หรือ `k` - Kill process ที่ใช้ port 3100 ทันที (force kill)
- `restart` หรือ `r` - Kill และ restart แอปพลิเคชันทันที
- `check` หรือ `c` - ตรวจสอบสถานะ port

## 🚀 NPM Scripts

เพิ่ม scripts ใน `package.json` สำหรับความสะดวก:

### Development Scripts:
```bash
# รัน dev server บน port default
npm run dev

# รัน dev server บน port 3100 โดยตรง
npm run dev:3100
```

### Port Management Scripts:
```bash
# เปิด Port Manager (เมนูโต้ตอบ)
npm run port:manager

# ตรวจสอบ port
npm run port:check
npm run check          # alias สั้น

# Kill process
npm run port:kill
npm run kill           # alias สั้น

# เริ่มต้นแอปพลิเคชัน
npm run port:start

# Restart แอปพลิเคชัน
npm run port:restart
npm run restart        # alias สั้น
```

## 📝 ตัวอย่างการใช้งาน

### การใช้งานพื้นฐาน:

1. **ตรวจสอบ port:**
   ```bash
   npm run check
   # หรือ
   ./scripts/quick-port.sh check
   ```

2. **Kill process ที่ใช้ port:**
   ```bash
   npm run kill
   # หรือ
   ./scripts/quick-port.sh kill
   ```

3. **Restart แอปพลิเคชัน:**
   ```bash
   npm run restart
   # หรือ
   ./scripts/quick-port.sh restart
   ```

### การใช้งานแบบเมนูโต้ตอบ:

```bash
npm run port:manager
```

จะเปิดเมนูให้เลือก:
```
=== 🛠️  Port Manager สำหรับ LIFF Inventory (Port 3100) ===
1. ตรวจสอบ port
2. Kill process ที่ใช้ port
3. เริ่มต้นแอปพลิเคชัน
4. Restart แอปพลิเคชัน
5. ออกจากโปรแกรม
```

## 🔧 ฟีเจอร์ของ Scripts

### Port Manager (เมนูโต้ตอบ):
- ✅ Graceful shutdown (SIGTERM ก่อน SIGKILL)
- ✅ ตรวจสอบสถานะ process แบบละเอียด
- ✅ เมนูโต้ตอบที่เป็นมิตรกับผู้ใช้
- ✅ สีสันในเทอร์มินัล
- ✅ รอระบบให้ process หยุดเองก่อน force kill

### Quick Port (การใช้งานเร็ว):
- ⚡ Force kill ทันที (สำหรับกรณีฉุกเฉิน)
- ⚡ Restart เร็ว
- ⚡ ตรวจสอบเร็ว
- ⚡ รองรับ short form commands (k, r, c)

## 🚨 หมายเหตุ

1. **Port Manager** เหมาะสำหรับการใช้งานปกติ (graceful shutdown)
2. **Quick Port** เหมาะสำหรับกรณีฉุกเฉิน (force operations)
3. ต้องใช้ `chmod +x` กับ scripts ก่อนใช้งาน (ทำไว้แล้ว)
4. Scripts เหล่านี้ทำงานบน macOS/Linux เท่านั้น

## 🎯 การแก้ไขปัญหาที่พบบ่อย

### "Port 3100 is already in use":
```bash
npm run kill
npm run dev:3100
```

### "Cannot kill process":
```bash
# ใช้ sudo (ถ้าจำเป็น)
sudo ./scripts/quick-port.sh kill
```

### ตรวจสอบว่ามี process อื่นใช้ port:
```bash
npm run check
# หรือ
lsof -i :3100
``` 
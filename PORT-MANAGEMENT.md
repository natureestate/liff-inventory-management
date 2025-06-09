# 🚀 วิธีการจัดการ Port 3100

## ⚡ คำสั่งที่ใช้บ่อยที่สุด

```bash
# ตรวจสอบ port
npm run check

# หยุด process ที่ใช้ port 3100
npm run kill

# Restart แอปพลิเคชัน
npm run restart

# เริ่มต้นแอปพลิเคชันบน port 3100
npm run dev
# หรือ
npm run dev:3100
```

## 🛠️ เมนูโต้ตอบ

```bash
# เปิดเมนูจัดการ port (แนะนำสำหรับผู้ใช้ใหม่)
npm run port:manager
```

## 📋 คำสั่งทั้งหมด

| คำสั่ง | ความหมาย |
|--------|-----------|
| `npm run check` | ตรวจสอบสถานะ port 3100 |
| `npm run kill` | หยุด process ที่ใช้ port 3100 |
| `npm run restart` | หยุดและเริ่มใหม่ |
| `npm run dev` | เริ่มแอปบน port 3100 |
| `npm run port:manager` | เปิดเมนูจัดการ |

## 🚨 แก้ปัญหาเบื้องต้น

### ปัญหา: "Port 3100 is already in use"

**วิธีแก้:**
```bash
npm run kill
npm run dev
```

### ปัญหา: ไม่สามารถหยุด process ได้

**วิธีแก้:**
```bash
# ใช้ sudo (macOS/Linux)
sudo npm run kill
```

## 💡 Tips

1. **ใช้ `npm run check`** เพื่อตรวจสอบก่อนเสมอ
2. **ใช้ `npm run restart`** เมื่อต้องการ restart เร็วๆ
3. **ใช้ `npm run port:manager`** เมื่อไม่แน่ใจว่าจะทำอะไร

## 🔧 การติดตั้ง Aliases (ขั้นสูง)

หากต้องการใช้คำสั่งสั้นๆ จากที่ไหนก็ได้:

```bash
# เพิ่ม aliases เข้าไปใน shell
echo 'source /Users/macbooknow/linestock/liff-inventory/scripts/aliases.sh' >> ~/.zshrc
source ~/.zshrc

# ใช้งาน aliases
pc     # = npm run check
pk     # = npm run kill  
pr     # = npm run restart
``` 
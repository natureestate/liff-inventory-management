# ShadCN UI Components สำหรับ LIFF Inventory System

## 📦 Components ที่ติดตั้งแล้ว (20 ตัว)

### 🔤 Form & Input Components
- ✅ **Button** - ปุ่มต่างๆ (primary, secondary, outline, destructive)
- ✅ **Input** - ช่องกรอกข้อความ
- ✅ **Textarea** - ช่องกรอกข้อความหลายบรรทัด
- ✅ **Label** - ป้ายชื่อสำหรับ form fields
- ✅ **Form** - การจัดการ form แบบ integrated
- ✅ **Select** - Dropdown เลือกตัวเลือก
- ✅ **Checkbox** - เลือกหลายรายการ
- ✅ **Switch** - Toggle on/off

### 📋 Layout & Container Components
- ✅ **Card** - กล่องเนื้อหา (Header, Content, Footer)
- ✅ **Sheet** - Sidebar แบบ slide-out (mobile-friendly)
- ✅ **Separator** - เส้นแบ่งส่วน
- ✅ **Tabs** - แท็บสำหรับแยกหมวดหมู่เนื้อหา

### 💬 Feedback & Display Components
- ✅ **Badge** - ป้ายสถานะ (default, destructive, outline)
- ✅ **Alert** - ข้อความแจ้งเตือน
- ✅ **Sonner** - Toast notifications (ทดแทน toast)
- ✅ **Tooltip** - คำอธิบายเพิ่มเติมเมื่อ hover
- ✅ **Progress** - แถบความคืบหน้า
- ✅ **Skeleton** - Loading placeholder

### 📊 Data Display Components
- ✅ **Table** - ตารางข้อมูล (Header, Body, Cell, Caption)

### 🪟 Modal & Overlay Components
- ✅ **Dialog** - Modal popup (Header, Content, Footer)

## 🎯 การใช้งานในระบบ Inventory

### 1. **Dashboard (StockOverview)**
```tsx
import { Card, CardContent, Badge, Tabs, TabsContent } from '@/components/ui'

// Stats Cards - แสดงสถิติ
<Card>
  <CardContent>
    <Badge variant="destructive">สต็อกต่ำ</Badge>
  </CardContent>
</Card>

// Tabs - แยกหมวดหมู่
<Tabs defaultValue="overview">
  <TabsContent value="overview">ภาพรวม</TabsContent>
  <TabsContent value="inventory">รายการสต็อก</TabsContent>
</Tabs>
```

### 2. **Inventory Table (InventoryTable)**
```tsx
import { Table, Dialog, Form, Select, Progress } from '@/components/ui'

// ตารางข้อมูล
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>รหัส</TableHead>
      <TableHead>ชื่อวัตถุดิบ</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>MAT001</TableCell>
      <TableCell>เหล็กเส้น 12mm</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Progress Bar - แสดงเปอร์เซ็นต์สต็อก
<Progress value={75} />

// Dialog - เพิ่ม/แก้ไขข้อมูล
<Dialog>
  <DialogTrigger asChild>
    <Button>เพิ่มวัตถุดิบ</Button>
  </DialogTrigger>
  <DialogContent>
    <Form>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="เลือกหมวดหมู่" />
        </SelectTrigger>
      </Select>
    </Form>
  </DialogContent>
</Dialog>
```

## 🎨 Theme Variables ที่ใช้

```css
/* สีหลัก */
--background: พื้นหลังหลัก
--foreground: ข้อความหลัก
--primary: สีหลักแบรนด์
--secondary: สีรอง
--muted-foreground: ข้อความรอง

/* สีแจ้งเตือน */
--destructive: สีแดง (ข้อผิดพลาด, สต็อกต่ำ)
--border: เส้นขอบ
--card: พื้นหลัง card
```

## 📱 Responsive Design

- **Mobile First**: ใช้ Tailwind responsive classes
- **Sheet Component**: สำหรับ mobile sidebar
- **Grid System**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## 🔄 การ Import Components

### วิธีที่ 1: Import แต่ละตัว
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
```

### วิธีที่ 2: Import จาก index (แนะนำ)
```tsx
import { Button, Card, CardContent, Badge } from '@/components/ui'
```

## 🚀 Features หลัก

### ✨ **Dark Mode Support**
- รองรับ dark mode อัตโนมัติผ่าน CSS variables

### ♿ **Accessibility**
- มี ARIA attributes
- รองรับ keyboard navigation
- Screen reader friendly

### 🎨 **Customizable**
- ปรับ theme ได้ผ่าน `src/index.css`
- ใช้ `cn()` function สำหรับ conditional classes

### 📱 **Mobile Optimized**
- Touch-friendly
- Responsive design
- Performance optimized

## 🔧 การปรับแต่ง

### เปลี่ยนสีหลัก
```css
:root {
  --primary: 222.2 47.4% 11.2%; /* เปลี่ยนเป็นสีที่ต้องการ */
}
```

### เพิ่ม Variant ใหม่
```tsx
// ใน button.tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        custom: "bg-orange-500 text-white", // เพิ่ม variant ใหม่
      }
    }
  }
)
```

## 📄 ตัวอย่างการใช้งานเต็มรูปแบบ

ดูได้ที่:
- `src/components/inventory/StockOverview.tsx` - Dashboard
- `src/components/inventory/InventoryTable.tsx` - Table with Dialog
- `src/components/layout/Navigation.tsx` - Navigation with Cards

---

🎉 **ระบบ LIFF Inventory พร้อมใช้งาน ShadCN UI แบบสมบูรณ์!** 
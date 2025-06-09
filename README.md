# LIFF Inventory Management System

ระบบจัดการสต็อกวัตถุดิบผ่าน LINE Front-end Framework (LIFF) พร้อมการเชื่อมต่อ Firebase และ LINE Login API

## 🚀 Live Demo

- **GitHub Repository**: [https://github.com/natureestate/liff-inventory-management](https://github.com/natureestate/liff-inventory-management)
- **Production URL**: [https://linestock-e253f.web.app](https://linestock-e253f.web.app)
- **LIFF URL**: [https://liff.line.me/2007546326-RqNGeGEX](https://liff.line.me/2007546326-RqNGeGEX)

## ✨ Features

- 🔐 **LINE Login Integration** - เข้าสู่ระบบผ่าน LINE Account
- 📱 **LIFF Support** - ทำงานใน LINE Browser และ Web Browser
- 🔥 **Firebase Integration** - Firestore, Authentication, Hosting
- 🎨 **Modern UI** - ShadCN UI Components with Tailwind CSS
- 🌐 **Thai Language Support** - รองรับภาษาไทยเต็มรูปแบบ
- 📊 **Inventory Management** - จัดการสต็อกวัตถุดิบ
- 🔍 **Real-time Data** - ข้อมูลแบบ real-time ผ่าน Firestore
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: ShadCN UI + Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Hosting)
- **LINE Integration**: LIFF SDK + LINE Login API
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

## 📋 Prerequisites

- Node.js 18+ 
- npm หรือ yarn
- Firebase CLI
- LINE Developers Account

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/natureestate/liff-inventory-management.git
cd liff-inventory-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
สร้างไฟล์ `.env` จาก `.env.example`:
```bash
cp .env.example .env
```

แก้ไขค่าใน `.env`:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# LIFF Configuration
VITE_LIFF_ID=your-liff-id
VITE_LIFF_URL=https://liff.line.me/your-liff-id
VITE_LIFF_APP_NAME=your-app-name
```

### 4. Development
```bash
npm run dev
```

เปิด [http://localhost:3100](http://localhost:3100)

### 5. Build & Deploy
```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## 📁 Project Structure

```
src/
├── components/          # React Components
│   ├── auth/           # Authentication components
│   ├── common/         # Common/shared components
│   ├── inventory/      # Inventory management components
│   ├── layout/         # Layout components
│   └── ui/             # ShadCN UI components
├── contexts/           # React Contexts
│   └── LiffContext.tsx # LIFF state management
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── firebase.ts     # Firebase configuration
│   ├── liff.ts         # LIFF SDK wrapper
│   └── utils.ts        # Utility functions
├── services/           # API services
├── types/              # TypeScript type definitions
│   ├── env.d.ts        # Environment variables types
│   └── liff.ts         # LIFF types
└── pages/              # Page components
```

## 🔧 Configuration Files

- `firebase.json` - Firebase Hosting configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - ShadCN UI configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration

## 📚 Documentation

- [LIFF Setup Guide](./LIFF-SETUP.md) - การตั้งค่า LIFF
- [LINE Login API Guide](./LINE-LOGIN-API.md) - การใช้งาน LINE Login API
- [Deployment Guide](./DEPLOYMENT.md) - คู่มือการ deploy
- [ShadCN Components](./SHADCN-UI-COMPONENTS.md) - รายการ UI components

## 🔐 Environment Variables

### Required Variables
```env
VITE_FIREBASE_API_KEY=          # Firebase API Key
VITE_FIREBASE_AUTH_DOMAIN=      # Firebase Auth Domain
VITE_FIREBASE_PROJECT_ID=       # Firebase Project ID
VITE_FIREBASE_STORAGE_BUCKET=   # Firebase Storage Bucket
VITE_FIREBASE_MESSAGING_SENDER_ID= # Firebase Messaging Sender ID
VITE_FIREBASE_APP_ID=           # Firebase App ID
VITE_LIFF_ID=                   # LINE LIFF ID
```

### Optional Variables
```env
VITE_LIFF_URL=                  # LIFF URL
VITE_LIFF_APP_NAME=             # LIFF App Name
VITE_APP_NAME=                  # Application Name
VITE_APP_VERSION=               # Application Version
VITE_APP_ENVIRONMENT=           # Environment (development/production)
VITE_DEBUG_MODE=                # Debug Mode (true/false)
VITE_ENABLE_LOGGING=            # Enable Logging (true/false)
```

## 🧪 Testing

### Development Testing
```bash
# Local development
npm run dev
# เปิด http://localhost:3100
```

### LIFF Testing
```bash
# ใน LINE Browser
https://liff.line.me/2007546326-RqNGeGEX
```

### Production Testing
```bash
# Production URL
https://linestock-e253f.web.app
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Build project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Environment Setup
1. ตั้งค่า Firebase project
2. ตั้งค่า LIFF app ใน LINE Developers Console
3. อัปเดต environment variables
4. Deploy และทดสอบ

## 🔍 Troubleshooting

### Common Issues

1. **LIFF ไม่ทำงาน**
   - ตรวจสอบ LIFF ID และ URL
   - ตรวจสอบ domain settings ใน LINE Developers Console

2. **Firebase Connection Error**
   - ตรวจสอบ Firebase configuration
   - ตรวจสอบ API keys และ project ID

3. **Build Errors**
   - ตรวจสอบ TypeScript errors
   - ตรวจสอบ dependencies versions

### Debug Mode
เปิด debug mode ใน `.env`:
```env
VITE_DEBUG_MODE=true
VITE_ENABLE_LOGGING=true
```

## 📄 License

MIT License - ดูรายละเอียดใน [LICENSE](./LICENSE) file

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

หากมีปัญหาหรือข้อสงสัย:
- สร้าง Issue ใน GitHub repository
- ติดต่อผ่าน LINE Official Account
- อ่านเอกสารใน `/docs` folder

## 🎯 Roadmap

- [ ] เพิ่ม QR Code Scanner
- [ ] เพิ่ม Barcode Management
- [ ] เพิ่ม Report Generation
- [ ] เพิ่ม Multi-language Support
- [ ] เพิ่ม Offline Support
- [ ] เพิ่ม Push Notifications

---

**Made with ❤️ for LINE LIFF Platform**

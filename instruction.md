# LINE LIFF Inventory Management System

## Project Overview
ระบบจัดการคลังวัตถุดิบผ่าน LINE LIFF สำหรับงานก่อสร้าง งานผลิต งานติดตั้ง และงานจัดส่ง

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Functions)
- **LINE Integration**: @line/liff SDK
- **State Management**: React Context + useState/useReducer
- **Deployment**: Firebase Hosting

## Project Structure
```
liff-inventory/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── table.tsx
│   │   │   ├── form.tsx
│   │   │   ├── select.tsx
│   │   │   └── toast.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── inventory/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── StockCheck.tsx
│   │   │   ├── StockForm.tsx
│   │   │   ├── MaterialCard.tsx
│   │   │   ├── StockAlerts.tsx
│   │   │   └── TransactionHistory.tsx
│   │   ├── auth/
│   │   │   ├── LoginGuard.tsx
│   │   │   └── RoleGuard.tsx
│   │   └── common/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── QRScanner.tsx
│   ├── hooks/
│   │   ├── useLiff.ts
│   │   ├── useAuth.ts
│   │   ├── useInventory.ts
│   │   ├── usePermissions.ts
│   │   └── useFirestore.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── InventoryContext.tsx
│   │   └── LiffContext.tsx
│   ├── types/
│   │   ├── inventory.ts
│   │   ├── auth.ts
│   │   └── liff.ts
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── liff.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── services/
│   │   ├── inventoryService.ts
│   │   ├── authService.ts
│   │   └── notificationService.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── StockCheck.tsx
│   │   ├── StockManagement.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── firebase/
│   ├── functions/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── inventory.ts
│   │   │   ├── notifications.ts
│   │   │   └── auth.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── firestore.rules
│   ├── firebase.json
│   └── .firebaserc
├── docs/
│   ├── setup.md
│   ├── deployment.md
│   └── api-reference.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── components.json
├── vite.config.ts
├── .env.example
└── README.md
```

## Installation Steps

### 1. Initialize Project
```bash
# Create Vite project
npm create vite@latest liff-inventory -- --template react-ts
cd liff-inventory
npm install

# Install dependencies
npm install @line/liff firebase
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs
npm install @radix-ui/react-alert-dialog @radix-ui/react-select

# Note: ไม่ต้องติดตั้ง Firebase Auth เพราะใช้ LINE Login ผ่าน LIFF

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node

# Initialize Tailwind
npx tailwindcss init -p
```

### 2. Setup shadcn/ui
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add required components
npx shadcn-ui@latest add button card input badge alert dialog sheet
npx shadcn-ui@latest add tabs table form select toast
```

### 3. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init

# Select:
# - Firestore
# - Functions (TypeScript)
# - Hosting
```

## Environment Variables (.env)
```env
# LINE LIFF
VITE_LIFF_ID=your_liff_id_here

# Firebase (สำหรับ Firestore เท่านั้น)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id

# App Settings
VITE_APP_NAME=LIFF Inventory
VITE_APP_VERSION=1.0.0
```

## Key Features to Implement

### 1. Authentication & RBAC
- LINE LIFF automatic authentication (ใช้ LINE profile โดยตรง)
- Custom user management in Firestore
- Role-based access control (Admin, Manager, Operator, Viewer)
- Permission-based UI rendering

### 2. Inventory Management
- Real-time stock tracking
- Material categorization
- Stock alerts (low stock, out of stock, expiring soon)
- Barcode/QR code scanning
- Location-based inventory

### 3. Stock Transactions
- Stock IN (receiving)
- Stock OUT (issuing)
- Transaction history
- Approval workflow
- Reference number tracking

### 4. Dashboard & Reports
- Real-time dashboard
- Stock level indicators
- Financial summaries
- Transaction reports
- Export functionality

### 5. Mobile Optimization
- Touch-friendly UI
- Responsive design
- Offline capability (PWA)
- Push notifications via LINE

## Firebase Collections Structure

### users
```javascript
{
  id: "auto_generated_id",
  lineUserId: "U123456789", // Primary key from LINE
  displayName: "ชื่อจาก LINE Profile",
  pictureUrl: "https://profile.line.me/...", // LINE profile image
  email: "user@company.com", // Optional, manual input
  role: "manager", // admin, manager, operator, viewer
  department: "warehouse",
  employeeId: "EMP001", // Optional company employee ID
  isActive: true,
  permissions: {
    canViewStock: true,
    canAddStock: true,
    // ... other permissions
  },
  createdAt: timestamp,
  updatedAt: timestamp,
  lastLoginAt: timestamp
}
```

### materials
```javascript
{
  id: "material_id",
  code: "STEEL001",
  name: "เหล็กเส้น 12mm",
  category: "เหล็ก",
  unit: "ตัน",
  currentStock: 5.5,
  minStock: 2.0,
  maxStock: 10.0,
  unitPrice: 25000,
  location: "คลัง A-01",
  expiryDate: "2025-12-31", // optional
  supplier: "บริษัท ABC จำกัด",
  barcode: "123456789",
  isActive: true,
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: "user_id"
}
```

### transactions
```javascript
{
  id: "transaction_id",
  materialId: "material_id",
  type: "IN", // IN, OUT
  quantity: 2.5,
  reason: "รับของใหม่",
  referenceNo: "PO-2025-001",
  userId: "user_id",
  userName: "User Name",
  approvedBy: "approver_user_id", // optional
  status: "completed", // pending, approved, completed, cancelled
  notes: "หมายเหตุ",
  timestamp: timestamp,
  location: "คลัง A-01"
}
```

### categories
```javascript
{
  id: "category_id",
  name: "เหล็ก",
  description: "วัตถุดิบเหล็กทุกประเภท",
  isActive: true,
  createdAt: timestamp
}
```

## LIFF Configuration
- Display Mode: Full (เหมาะสำหรับ dashboard)
- Endpoint URL: https://your-project.web.app
- Scope: profile, openid
- Bot Link Feature: Enabled

## Development Workflow

### 1. Local Development
```bash
# Start development server
npm run dev

# Test LIFF locally (use ngrok for HTTPS)
npx ngrok http 5173
```

### 2. Firebase Functions Development
```bash
cd firebase/functions
npm run serve
```

### 3. Deployment
```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## Security Rules (Firestore)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write based on LINE User ID
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        resource.data.lineUserId == request.auth.token.sub;
    }
    
    // Materials - role-based access using custom claims
    match /materials/{materialId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role in ['admin', 'manager'];
    }
    
    // Transactions - authenticated users can read, operators+ can write
    match /transactions/{transactionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.token.role in ['admin', 'manager', 'operator'];
    }
  }
}
```

## LINE Bot Integration (Optional)
- Notification messages for low stock
- Daily/weekly inventory reports
- Quick stock check commands
- Alert forwarding to managers

## Performance Optimizations
- Lazy loading for components
- Virtual scrolling for large lists
- Image optimization for material photos
- Firestore pagination
- Offline-first architecture

## Testing Strategy
- Unit tests for utility functions
- Integration tests for Firebase operations
- E2E tests for critical user flows
- LIFF-specific testing scenarios

## Monitoring & Analytics
- Firebase Analytics
- Performance monitoring
- Error tracking (Sentry/Firebase Crashlytics)
- Usage analytics

## Future Enhancements
- Photo capture for materials
- Advanced reporting with charts
- Integration with ERP systems
- Multi-language support
- Batch operations
- Advanced search and filtering
- Material forecasting
- Vendor management

---

## Getting Started Commands
```bash
# Clone and setup
git clone <repository>
cd liff-inventory
npm install
cp .env.example .env
# Edit .env with your credentials

# Setup Firebase
firebase login
firebase init

# Start development
npm run dev
```

This project structure provides a solid foundation for building a comprehensive inventory management system using LINE LIFF with modern web technologies.
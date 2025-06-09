import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { LiffProvider } from './contexts/LiffContext'
import { Navigation } from './components/layout/Navigation'
import { BottomNavigation } from './components/layout/BottomNavigation'
import { HomePage } from './pages/HomePage.tsx'
import { InventoryPage } from './pages/InventoryPage.tsx'
import { AddStockPage } from './pages/AddStockPage.tsx'
import { WithdrawStockPage } from './pages/WithdrawStockPage.tsx'
import { ReportsPage } from './pages/ReportsPage.tsx'
import { ScanPage } from './pages/ScanPage.tsx'
import { SettingsPage } from './pages/SettingsPage.tsx'

/**
 * AppContent Component
 * เนื้อหาหลักของแอปที่ต้องการ access location
 */
const AppContent: React.FC = () => {
  const location = useLocation()
  const hasBottomNav = location.pathname !== '/' && location.pathname !== '/settings'

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <Navigation />
      
      {/* Main Content with conditional padding */}
      <main className={`container mx-auto px-4 py-6 ${hasBottomNav ? 'pb-20' : ''}`}>
        <Routes>
          {/* หน้าแรก - Dashboard */}
          <Route path="/" element={<HomePage />} />
          
          {/* หน้าสต็อกทั้งหมด */}
          <Route path="/inventory" element={<InventoryPage />} />
          
          {/* หน้าเพิ่มสต็อก */}
          <Route path="/add-stock" element={<AddStockPage />} />
          
          {/* หน้าเบิกสต็อก */}
          <Route path="/withdraw-stock" element={<WithdrawStockPage />} />
          
          {/* หน้ารายงาน */}
          <Route path="/reports" element={<ReportsPage />} />
          
          {/* หน้าสแกน QR */}
          <Route path="/scan" element={<ScanPage />} />
          
          {/* หน้าตั้งค่า */}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      
      {/* Bottom Navigation - แสดงเฉพาะหน้าที่เหมาะสม */}
      <BottomNavigation />
    </div>
  )
}

/**
 * Main App Component
 * จุดเริ่มต้นของแอปพลิเคชัน LIFF Inventory Management System
 * รองรับการ routing ระหว่างหน้าต่างๆ พร้อม bottom navigation
 */
function App() {
  return (
    <LiffProvider>
      <Router>
        <AppContent />
      </Router>
    </LiffProvider>
  )
}

export default App

import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Package, 
  Plus, 
  Minus, 
  QrCode,
  Home
} from 'lucide-react'

/**
 * BottomNavigation Component
 * แสดงเมนูล่างแบบ mobile app สำหรับหน้าอื่นๆ (ยกเว้นหน้าแรกและตั้งค่า)
 * ประกอบด้วย 5 เมนูหลัก: หน้าแรก, สต็อกทั้งหมด, เพิ่มสต็อก, เบิกสต็อก, รายงาน, สแกน QR
 */
export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // เมนูสำหรับ bottom navigation (5 เมนูหลัก ไม่รวมตั้งค่า และรายงาน)
  const bottomNavItems = [
    {
      icon: Home,
      title: 'หน้าแรก',
      href: '/'
    },
    {
      icon: Package,
      title: 'สต็อก',
      href: '/inventory'
    },
    {
      icon: QrCode,
      title: 'สแกน',
      href: '/scan'
    },
    {
      icon: Plus,
      title: 'เพิ่ม',
      href: '/add-stock'
    },
    {
      icon: Minus,
      title: 'เบิก',
      href: '/withdraw-stock'
    }
  ]

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  const isActive = (href: string) => {
    return location.pathname === href
  }

  // ไม่แสดง bottom navigation ในหน้าแรกและหน้าตั้งค่า
  if (location.pathname === '/' || location.pathname === '/settings') {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.href)}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
              isActive(item.href)
                ? 'text-primary bg-primary/5'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-primary' : 'text-gray-600'}`} />
            <span className={`text-xs font-medium ${isActive(item.href) ? 'text-primary' : 'text-gray-600'}`}>
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNavigation 
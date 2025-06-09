import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { 
  Package, 
  Plus, 
  Minus, 
  BarChart3, 
  QrCode, 
  Settings, 
  Bell,
  User
} from 'lucide-react'

/**
 * Navigation Component
 * แสดงเมนูหลักของแอปพลิเคชัน
 * - หน้าแรก: แสดงเมนูใหญ่แบบเต็ม
 * - หน้าอื่นๆ: แสดงแค่ header
 */
export const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  // Mock ข้อมูล notifications
  const mockNotifications = 3

  const navigationItems = [
    {
      icon: Package,
      title: 'สต็อกทั้งหมด',
      subtitle: 'ดูรายการวัตถุดิบ',
      href: '/inventory'
    },
    {
      icon: Plus,
      title: 'เพิ่มสต็อก',
      subtitle: 'รับเข้าวัตถุดิบ',
      href: '/add-stock'
    },
    {
      icon: Minus,
      title: 'เบิกสต็อก',
      subtitle: 'เบิกจ่ายวัตถุดิบ',
      href: '/withdraw-stock'
    },
    {
      icon: BarChart3,
      title: 'รายงาน',
      subtitle: 'สถิติและรายงาน',
      href: '/reports'
    },
    {
      icon: QrCode,
      title: 'สแกน QR',
      subtitle: 'สแกน QR Code',
      href: '/scan'
    },
    {
      icon: Settings,
      title: 'ตั้งค่า',
      subtitle: 'จัดการระบบ',
      href: '/settings'
    }
  ]

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  return (
    <nav className="bg-card border-b shadow-sm">
      {/* Header */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleNavigation('/')}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Inventory</h1>
            <p className="text-sm text-muted-foreground">สต็อกวัตถุดิบ</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="outline" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {mockNotifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {mockNotifications}
              </Badge>
            )}
          </Button>
          
          {/* User Profile */}
          <Button variant="outline" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline text-sm">เข้าสู่ระบบ</span>
          </Button>
        </div>
      </div>

      {/* Navigation Grid - แสดงเฉพาะหน้าแรก */}
      {isHomePage && (
        <div className="container mx-auto px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {navigationItems.map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-all duration-200 cursor-pointer group border hover:border-primary/20"
                onClick={() => handleNavigation(item.href)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary/10">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation 
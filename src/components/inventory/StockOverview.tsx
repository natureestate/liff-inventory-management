import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  Minus,
  ArrowRight,
  Clock
} from 'lucide-react'
import { InventoryTable } from './InventoryTable'

/**
 * StockOverview Component
 * แสดงภาพรวมสถานะการจัดการสต็อกวัตถุดิบ
 */
export const StockOverview: React.FC = () => {
  // ข้อมูล Mock สำหรับสถิติ
  const stats = [
    {
      title: 'วัตถุดิบทั้งหมด',
      value: '156',
      unit: 'รายการ',
      icon: Package
    },
    {
      title: 'มูลค่ารวม',
      value: '฿2,850,000.00',
      unit: 'บาท',
      icon: DollarSign
    },
    {
      title: 'สต็อกต่ำ',
      value: '8',
      unit: 'รายการ',
      icon: AlertTriangle
    },
    {
      title: 'รายการวันนี้',
      value: '24',
      unit: 'รายการ',
      icon: TrendingUp
    }
  ]

  // ข้อมูล Mock สำหรับรายการเคลื่อนไหวล่าสุด
  const recentTransactions = [
    {
      id: 'TXN001',
      materialName: 'เหล็กเส้น 12mm',
      type: 'IN' as const,
      quantity: 50,
      unit: 'เส้น',
      operator: 'วิชัย สมชาย',
      time: '00:49',
      avatar: '👨‍💼'
    },
    {
      id: 'TXN002',
      materialName: 'ปูนซีเมนต์',
      type: 'OUT' as const,
      quantity: 20,
      unit: 'ถุง',
      operator: 'สมหญิง ใจดี',
      time: '00:19',
      avatar: '👩‍💼'
    },
    {
      id: 'TXN003',
      materialName: 'ไม้แบบ',
      type: 'IN' as const,
      quantity: 100,
      unit: 'แผ่น',
      operator: 'ประเสริฐ ขยัน',
      time: '23:49',
      avatar: '👨‍🔧'
    }
  ]

  // ข้อมูล Mock สำหรับสต็อกที่ต้องเติม
  const lowStockItems = [
    {
      id: 'ST001',
      name: 'เหล็กเส้น 16mm',
      currentStock: 5,
      minStock: 20,
      unit: 'เส้น'
    },
    {
      id: 'CT002',
      name: 'ปูนขาว',
      currentStock: 2,
      minStock: 10,
      unit: 'ถุง'
    },
    {
      id: 'WD003',
      name: 'ไม้สน 2x4',
      currentStock: 8,
      minStock: 25,
      unit: 'เส้น'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">แดชบอร์ด</h1>
        <p className="text-muted-foreground">ภาพรวมการจัดการสต็อกวัตถุดิบ</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.unit}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
          <TabsTrigger value="inventory">รายการสต็อก</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>รายการเคลื่อนไหวล่าสุด</span>
                </CardTitle>
                <CardDescription>การเข้า-ออกสต็อกล่าสุด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg">
                          {transaction.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.materialName}</p>
                          <p className="text-sm text-muted-foreground">{transaction.operator}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {transaction.type === 'IN' ? (
                            <Plus className="w-4 h-4 text-green-600" />
                          ) : (
                            <Minus className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`font-medium ${transaction.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity} {transaction.unit}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <span>ดูทั้งหมด</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span>สต็อกที่ต้องเติม</span>
                </CardTitle>
                <CardDescription>วัตถุดิบที่มีจำนวนต่ำกว่าขั้นต่ำ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <Badge variant="destructive" className="text-xs">
                            วิกฤติ
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-destructive">{item.currentStock} {item.unit}</p>
                        <p className="text-sm text-muted-foreground">ขั้นต่ำ: {item.minStock} {item.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="destructive" className="w-full mt-4">
                  <span>ดำเนินการเติมสต็อก</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTable />
        </TabsContent>
      </Tabs>
    </div>
  )
} 
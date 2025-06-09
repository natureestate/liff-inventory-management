import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { Separator } from '../components/ui/separator'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Calendar,
  Download,
  FileText,
  PieChart,
  Activity
} from 'lucide-react'

/**
 * ReportsPage Component
 * หน้ารายงานและสถิติการจัดการสต็อก
 */
export const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // ข้อมูล Mock สำหรับสถิติรายงาน
  const overallStats = [
    {
      title: 'มูลค่าสต็อกรวม',
      value: '฿2,850,000',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: DollarSign
    },
    {
      title: 'รายการทั้งหมด',
      value: '156',
      change: '+8',
      changeType: 'increase' as const,
      icon: Package
    },
    {
      title: 'เคลื่อนไหววันนี้',
      value: '42',
      change: '-3',
      changeType: 'decrease' as const,
      icon: Activity
    },
    {
      title: 'อัตราการหมุนเวียน',
      value: '85%',
      change: '+5%',
      changeType: 'increase' as const,
      icon: TrendingUp
    }
  ]

  // ข้อมูล Mock สำหรับการเคลื่อนไหวรายสัปดาห์
  const weeklyMovement = [
    { day: 'จันทร์', inbound: 120, outbound: 80 },
    { day: 'อังคาร', inbound: 95, outbound: 110 },
    { day: 'พุธ', inbound: 140, outbound: 90 },
    { day: 'พฤหัสบดี', inbound: 85, outbound: 120 },
    { day: 'ศุกร์', inbound: 160, outbound: 95 },
    { day: 'เสาร์', inbound: 75, outbound: 60 },
    { day: 'อาทิตย์', inbound: 45, outbound: 30 }
  ]

  // ข้อมูล Mock สำหรับหมวดหมู่สินค้า
  const categoryStats = [
    { name: 'เหล็ก', percentage: 35, value: '฿997,500', color: 'bg-blue-500' },
    { name: 'ปูน', percentage: 25, value: '฿712,500', color: 'bg-green-500' },
    { name: 'ไม้', percentage: 20, value: '฿570,000', color: 'bg-yellow-500' },
    { name: 'วัสดุอื่นๆ', percentage: 20, value: '฿570,000', color: 'bg-purple-500' }
  ]

  // ข้อมูล Mock สำหรับสินค้าขายดี
  const topMovingItems = [
    { name: 'เหล็กเส้น 12mm', movements: 245, trend: 'up', percentage: '+15%' },
    { name: 'ปูนซีเมนต์', movements: 189, trend: 'up', percentage: '+8%' },
    { name: 'ไม้แบบ', movements: 156, trend: 'down', percentage: '-3%' },
    { name: 'ทราย', movements: 134, trend: 'up', percentage: '+12%' },
    { name: 'อิฐแดง', movements: 98, trend: 'down', percentage: '-5%' }
  ]

  // ข้อมูล Mock สำหรับสต็อกต่ำ
  const lowStockAlerts = [
    { name: 'ปูนซีเมนต์', current: 25, minimum: 30, percentage: 83 },
    { name: 'อิฐแดง', current: 15, minimum: 25, percentage: 60 },
    { name: 'ไม้แบบ', current: 0, minimum: 20, percentage: 0 }
  ]

  const getChangeIcon = (type: 'increase' | 'decrease') => {
    return type === 'increase' ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />
  }

  const getChangeColor = (type: 'increase' | 'decrease') => {
    return type === 'increase' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">รายงาน</h1>
          <p className="text-muted-foreground">สถิติและรายงานการจัดการสต็อก</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">วันนี้</SelectItem>
              <SelectItem value="week">สัปดาห์นี้</SelectItem>
              <SelectItem value="month">เดือนนี้</SelectItem>
              <SelectItem value="year">ปีนี้</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(stat.changeType)}
                    <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                      {stat.change}
                    </span>
                  </div>
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
          <TabsTrigger value="movements">การเคลื่อนไหว</TabsTrigger>
          <TabsTrigger value="categories">หมวดหมู่</TabsTrigger>
          <TabsTrigger value="alerts">แจ้งเตือน</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Movement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>การเคลื่อนไหวรายสัปดาห์</span>
                </CardTitle>
                <CardDescription>การรับเข้าและจ่ายออกรายวัน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyMovement.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <div className="space-x-4">
                          <span className="text-green-600">+{day.inbound}</span>
                          <span className="text-red-600">-{day.outbound}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${(day.inbound / 200) * 100}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-red-500" 
                            style={{ width: `${(day.outbound / 200) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Moving Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>สินค้าเคลื่อนไหวมากที่สุด</span>
                </CardTitle>
                <CardDescription>อันดับสินค้าที่มีการเคลื่อนไหวสูงสุด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMovingItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.movements} การเคลื่อนไหว</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {item.trend === 'up' ? 
                          <TrendingUp className="w-4 h-4 text-green-600" /> : 
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        }
                        <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.percentage}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Movements Tab */}
        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดการเคลื่อนไหว</CardTitle>
              <CardDescription>ข้อมูลการรับเข้าและจ่ายออกรายละเอียด</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p>กราฟรายละเอียดการเคลื่อนไหวจะแสดงที่นี่</p>
                <p className="text-sm">ฟีเจอร์นี้จะพัฒนาในเร็วๆ นี้</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-primary" />
                <span>สัดส่วนตามหมวดหมู่</span>
              </CardTitle>
              <CardDescription>การกระจายมูลค่าสต็อกตามหมวดหมู่</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${category.color}`} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{category.percentage}%</span>
                        <p className="text-sm text-muted-foreground">{category.value}</p>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-700">
                <Package className="w-5 h-5" />
                <span>แจ้งเตือนสต็อกต่ำ</span>
              </CardTitle>
              <CardDescription>รายการวัตถุดิบที่มีสต็อกต่ำกว่าขั้นต่ำ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockAlerts.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-orange-700 border-orange-300">
                        {item.current}/{item.minimum}
                      </Badge>
                    </div>
                    <Progress value={item.percentage} className="h-2 mb-2" />
                    <p className="text-xs text-orange-600">
                      สต็อกปัจจุบัน {item.current} หน่วย จากขั้นต่ำ {item.minimum} หน่วย
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ReportsPage 
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { 
  Search, 
  Filter, 
  Package, 
  ArrowUpDown,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react'
import { InventoryTable } from '../components/inventory/InventoryTable'

/**
 * InventoryPage Component
 * หน้าแสดงรายการสต็อกวัตถุดิบทั้งหมด พร้อมฟีเจอร์ค้นหาและจัดการ
 */
export const InventoryPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'low' | 'normal' | 'high'>('all')

  // ข้อมูล Mock สำหรับสถิติย่อย
  const inventoryStats = [
    {
      title: 'รายการทั้งหมด',
      value: '156',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'สต็อกปกติ',
      value: '128',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'สต็อกต่ำ',
      value: '8',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'สต็อกหมด',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    // TODO: ใช้ค้นหาข้อมูลจริง
  }

  const handleFilter = (status: 'all' | 'low' | 'normal' | 'high') => {
    setFilterStatus(status)
    // TODO: ใช้กรองข้อมูลจริง
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">สต็อกทั้งหมด</h1>
          <p className="text-muted-foreground">จัดการและตรวจสอบรายการวัตถุดิบทั้งหมด</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/reports')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            รายงาน
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => navigate('/add-stock')}
          >
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มสต็อก
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/withdraw-stock')}
          >
            <Minus className="w-4 h-4 mr-2" />
            เบิกสต็อก
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
          <CardDescription>ค้นหารายการวัตถุดิบและกรองตามสถานะ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ค้นหาชื่อวัตถุดิบ, รหัส, หรือประเภท..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilter('all')}
              >
                ทั้งหมด
              </Button>
              <Button 
                variant={filterStatus === 'normal' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilter('normal')}
              >
                ปกติ
              </Button>
              <Button 
                variant={filterStatus === 'low' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilter('low')}
              >
                สต็อกต่ำ
              </Button>
              <Button 
                variant={filterStatus === 'high' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilter('high')}
              >
                <Filter className="w-4 h-4 mr-1" />
                อื่นๆ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>รายการสต็อกวัตถุดิบ</CardTitle>
              <CardDescription>
                แสดงรายการทั้งหมด {searchTerm && `"${searchTerm}"`} 
                {filterStatus !== 'all' && ` (${filterStatus})`}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              เรียงลำดับ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <InventoryTable searchTerm={searchTerm} filterStatus={filterStatus} />
        </CardContent>
      </Card>
    </div>
  )
}

export default InventoryPage 
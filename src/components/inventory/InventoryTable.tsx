import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Progress } from '../ui/progress'
import { Separator } from '../ui/separator'
import { Alert, AlertDescription } from '../ui/alert'
import { Skeleton } from '../ui/skeleton'
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

/**
 * InventoryTable Component
 * ตัวอย่างการใช้งาน ShadCN UI Components สำหรับระบบ Inventory
 */

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  price: number
  supplier: string
  lastUpdated: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

export const InventoryTable: React.FC = () => {
  const [isLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // ข้อมูล Mock
  const inventoryItems: InventoryItem[] = [
    {
      id: 'MAT001',
      name: 'เหล็กเส้น 12mm',
      category: 'เหล็ก',
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unit: 'เส้น',
      price: 250,
      supplier: 'บริษัท เหล็ก A',
      lastUpdated: '2024-01-15',
      status: 'in_stock'
    },
    {
      id: 'MAT002',
      name: 'ปูนซีเมนต์',
      category: 'ปูน',
      currentStock: 25,
      minStock: 30,
      maxStock: 200,
      unit: 'ถุง',
      price: 180,
      supplier: 'บริษัท ปูน B',
      lastUpdated: '2024-01-14',
      status: 'low_stock'
    },
    {
      id: 'MAT003',
      name: 'ไม้แบบ',
      category: 'ไม้',
      currentStock: 0,
      minStock: 20,
      maxStock: 100,
      unit: 'แผ่น',
      price: 120,
      supplier: 'บริษัท ไม้ C',
      lastUpdated: '2024-01-13',
      status: 'out_of_stock'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />พร้อมใช้</Badge>
      case 'low_stock':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />สต็อกต่ำ</Badge>
      case 'out_of_stock':
        return <Badge variant="destructive" className="bg-red-600"><Trash2 className="w-3 h-3 mr-1" />หมด</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบ</Badge>
    }
  }

  const getStockProgress = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">รายการสต็อกวัตถุดิบ</h2>
          <p className="text-muted-foreground">จัดการข้อมูลวัตถุดิบในคลังสินค้า</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มวัตถุดิบ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>เพิ่มวัตถุดิบใหม่</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลวัตถุดิบที่ต้องการเพิ่มเข้าสู่ระบบ
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  ชื่อวัตถุดิบ
                </Label>
                <Input id="name" placeholder="ระบุชื่อวัตถุดิบ" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  หมวดหมู่
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="เลือกหมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steel">เหล็ก</SelectItem>
                    <SelectItem value="cement">ปูน</SelectItem>
                    <SelectItem value="wood">ไม้</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  จำนวนสต็อก
                </Label>
                <Input id="stock" type="number" placeholder="0" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  รายละเอียด
                </Label>
                <Textarea id="description" placeholder="รายละเอียดเพิ่มเติม..." className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">บันทึก</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {/* Alert for Low Stock */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          มีวัตถุดิบ 2 รายการที่มีสต็อกต่ำกว่าขั้นต่ำ กรุณาตรวจสอบและเติมสต็อก
        </AlertDescription>
      </Alert>

      {/* Inventory Table */}
      <div className="rounded-md border">
        <Table>
          <TableCaption>รายการวัตถุดิบทั้งหมดในระบบ</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัส</TableHead>
              <TableHead>ชื่อวัตถุดิบ</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>จำนวนปัจจุบัน</TableHead>
              <TableHead>ความคืบหน้า</TableHead>
              <TableHead>ราคา/หน่วย</TableHead>
              <TableHead>ผู้จำหน่าย</TableHead>
              <TableHead className="text-right">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <span className="text-sm font-medium">
                      {item.currentStock} {item.unit}
                    </span>
                    <div className="text-xs text-muted-foreground">
                      ขั้นต่ำ: {item.minStock} {item.unit}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Progress 
                      value={getStockProgress(item.currentStock, item.maxStock)} 
                      className="w-20" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {Math.round(getStockProgress(item.currentStock, item.maxStock))}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>฿{item.price.toLocaleString()}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.supplier}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 
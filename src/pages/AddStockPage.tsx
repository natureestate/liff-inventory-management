import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Separator } from '../components/ui/separator'
import { 
  Plus, 
  Search, 
  Package,
  CheckCircle,
  AlertCircle,
  Truck,
  Calendar,
  User
} from 'lucide-react'

/**
 * AddStockPage Component
 * หน้าสำหรับเพิ่มสต็อกวัตถุดิบเข้าสู่ระบบ
 */
export const AddStockPage: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [supplier, setSupplier] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ข้อมูล Mock สำหรับวัตถุดิบที่มีอยู่
  const availableMaterials = [
    { id: 'MAT001', name: 'เหล็กเส้น 12mm', unit: 'เส้น', currentStock: 150 },
    { id: 'MAT002', name: 'ปูนซีเมนต์', unit: 'ถุง', currentStock: 25 },
    { id: 'MAT003', name: 'ไม้แบบ', unit: 'แผ่น', currentStock: 0 },
    { id: 'MAT004', name: 'ทราย', unit: 'ตัน', currentStock: 80 },
    { id: 'MAT005', name: 'อิฐแดง', unit: 'แถว', currentStock: 15 }
  ]

  // ข้อมูล Mock สำหรับผู้จำหน่าย
  const suppliers = [
    'บริษัท เหล็ก A',
    'บริษัท ปูน B', 
    'บริษัท ไม้ C',
    'บริษัท ทราย D',
    'บริษัท อิฐ E'
  ]

  // รายการเพิ่มสต็อกล่าสุด (Mock)
  const recentAdditions = [
    {
      id: 'ADD001',
      materialName: 'เหล็กเส้น 12mm',
      quantity: 50,
      unit: 'เส้น',
      supplier: 'บริษัท เหล็ก A',
      addedBy: 'วิชัย สมชาย',
      timestamp: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: 'ADD002', 
      materialName: 'ปูนซีเมนต์',
      quantity: 30,
      unit: 'ถุง',
      supplier: 'บริษัท ปูน B',
      addedBy: 'สมหญิง ใจดี',
      timestamp: '2024-01-15 10:15',
      status: 'completed'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // TODO: ส่งข้อมูลไปยัง API
      console.log({
        material: selectedMaterial,
        quantity: parseInt(quantity),
        notes,
        supplier,
        timestamp: new Date().toISOString()
      })
      
      // Reset form
      setSelectedMaterial('')
      setQuantity('')
      setNotes('')
      setSupplier('')
      setIsSubmitting(false)
      
      alert('เพิ่มสต็อกสำเร็จ!')
    }, 1000)
  }

  const selectedMaterialInfo = availableMaterials.find(m => m.id === selectedMaterial)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">เพิ่มสต็อก</h1>
        <p className="text-muted-foreground">รับเข้าวัตถุดิบใหม่เข้าสู่ระบบ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-primary" />
                <span>ฟอร์มเพิ่มสต็อก</span>
              </CardTitle>
              <CardDescription>กรอกข้อมูลวัตถุดิบที่ต้องการเพิ่มเข้าสู่ระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Material Selection */}
                <div className="space-y-2">
                  <Label htmlFor="material">วัตถุดิบ</Label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกวัตถุดิบ" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMaterials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4" />
                            <span>{material.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {material.currentStock} {material.unit}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Material Info Display */}
                {selectedMaterialInfo && (
                  <Alert>
                    <Package className="h-4 w-4" />
                    <AlertDescription>
                      สต็อกปัจจุบัน: <strong>{selectedMaterialInfo.currentStock} {selectedMaterialInfo.unit}</strong>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Quantity Input */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">จำนวนที่เพิ่ม</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      required
                      className="flex-1"
                    />
                    {selectedMaterialInfo && (
                      <Badge variant="outline">
                        {selectedMaterialInfo.unit}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Supplier Selection */}
                <div className="space-y-2">
                  <Label htmlFor="supplier">ผู้จำหน่าย</Label>
                  <Select value={supplier} onValueChange={setSupplier}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกผู้จำหน่าย" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((sup, index) => (
                        <SelectItem key={index} value={sup}>
                          <div className="flex items-center space-x-2">
                            <Truck className="w-4 h-4" />
                            <span>{sup}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">หมายเหตุ (ไม่บังคับ)</Label>
                  <Textarea
                    id="notes"
                    placeholder="รายละเอียดเพิ่มเติม..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Separator />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting || !selectedMaterial || !quantity || !supplier}
                >
                  {isSubmitting ? (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      บันทึกการเพิ่มสต็อก
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">สถิติวันนี้</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">รายการเพิ่ม</span>
                <Badge variant="outline">24</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">มูลค่ารวม</span>
                <Badge variant="outline">฿125,000</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ผู้จำหน่าย</span>
                <Badge variant="outline">8 ราย</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Additions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>เพิ่มล่าสุด</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAdditions.map((addition) => (
                  <div key={addition.id} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{addition.materialName}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        +{addition.quantity} {addition.unit}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{addition.addedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{addition.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddStockPage 
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
  Minus, 
  Package,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Calendar,
  User,
  Building,
  FileText
} from 'lucide-react'

/**
 * WithdrawStockPage Component  
 * หน้าสำหรับเบิกสต็อกวัตถุดิบออกจากระบบ
 */
export const WithdrawStockPage: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purpose, setPurpose] = useState('')
  const [department, setDepartment] = useState('')
  const [requester, setRequester] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ข้อมูล Mock สำหรับวัตถุดิบที่มีอยู่
  const availableMaterials = [
    { id: 'MAT001', name: 'เหล็กเส้น 12mm', unit: 'เส้น', currentStock: 150, minStock: 50 },
    { id: 'MAT002', name: 'ปูนซีเมนต์', unit: 'ถุง', currentStock: 25, minStock: 30 },
    { id: 'MAT003', name: 'ไม้แบบ', unit: 'แผ่น', currentStock: 0, minStock: 20 },
    { id: 'MAT004', name: 'ทราย', unit: 'ตัน', currentStock: 80, minStock: 40 },
    { id: 'MAT005', name: 'อิฐแดง', unit: 'แถว', currentStock: 15, minStock: 25 }
  ]

  // ข้อมูล Mock สำหรับแผนก
  const departments = [
    'แผนกก่อสร้าง',
    'แผนกวิศวกรรม',
    'แผนกผลิต',
    'แผนกบำรุงรักษา',
    'แผนกคุณภาพ'
  ]

  // ข้อมูล Mock สำหรับวัตถุประสงค์
  const purposes = [
    'งานก่อสร้างโครงการ A',
    'งานซ่อมบำรุง',
    'งานทดสอบคุณภาพ',
    'งานผลิตสินค้า',
    'งานวิจัยและพัฒนา'
  ]

  // รายการเบิกสต็อกล่าสุด (Mock)
  const recentWithdrawals = [
    {
      id: 'WTH001',
      materialName: 'เหล็กเส้น 12mm',
      quantity: 30,
      unit: 'เส้น',
      department: 'แผนกก่อสร้าง',
      requester: 'ประเสริฐ ขยัน',
      timestamp: '2024-01-15 16:20',
      status: 'completed'
    },
    {
      id: 'WTH002',
      materialName: 'ปูนซีเมนต์',
      quantity: 10,
      unit: 'ถุง',
      department: 'แผนกผลิต',
      requester: 'วิมล รุ่งเรือง',
      timestamp: '2024-01-15 14:45',
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
        purpose,
        department,
        requester,
        notes,
        timestamp: new Date().toISOString()
      })
      
      // Reset form
      setSelectedMaterial('')
      setQuantity('')
      setPurpose('')
      setDepartment('')
      setRequester('')
      setNotes('')
      setIsSubmitting(false)
      
      alert('เบิกสต็อกสำเร็จ!')
    }, 1000)
  }

  const selectedMaterialInfo = availableMaterials.find(m => m.id === selectedMaterial)
  const willBeLowStock = selectedMaterialInfo && 
    parseInt(quantity || '0') > 0 && 
    (selectedMaterialInfo.currentStock - parseInt(quantity)) < selectedMaterialInfo.minStock

  const insufficientStock = selectedMaterialInfo && 
    parseInt(quantity || '0') > selectedMaterialInfo.currentStock

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">เบิกสต็อก</h1>
        <p className="text-muted-foreground">เบิกจ่ายวัตถุดิบออกจากระบบ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minus className="w-5 h-5 text-red-600" />
                <span>ฟอร์มเบิกสต็อก</span>
              </CardTitle>
              <CardDescription>กรอกข้อมูลการเบิกจ่ายวัตถุดิบ</CardDescription>
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
                        <SelectItem 
                          key={material.id} 
                          value={material.id}
                          disabled={material.currentStock === 0}
                        >
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4" />
                            <span>{material.name}</span>
                            <Badge 
                              variant={material.currentStock === 0 ? "destructive" : "outline"}
                              className="ml-2"
                            >
                              {material.currentStock} {material.unit}
                            </Badge>
                            {material.currentStock <= material.minStock && (
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            )}
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
                      {selectedMaterialInfo.currentStock <= selectedMaterialInfo.minStock && (
                        <span className="text-orange-600 ml-2">(สต็อกต่ำ)</span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Insufficient Stock Warning */}
                {insufficientStock && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      จำนวนที่เบิกมากกว่าสต็อกที่มีอยู่! มีเพียง {selectedMaterialInfo?.currentStock} {selectedMaterialInfo?.unit}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Low Stock Warning */}
                {willBeLowStock && !insufficientStock && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      หากเบิกจำนวนนี้ สต็อกจะต่ำกว่าขั้นต่ำ ({selectedMaterialInfo?.minStock} {selectedMaterialInfo?.unit})
                    </AlertDescription>
                  </Alert>
                )}

                {/* Quantity Input */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">จำนวนที่เบิก</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={selectedMaterialInfo?.currentStock}
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

                {/* Department Selection */}
                <div className="space-y-2">
                  <Label htmlFor="department">แผนกที่เบิก</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกแผนก" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept, index) => (
                        <SelectItem key={index} value={dept}>
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4" />
                            <span>{dept}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Requester Input */}
                <div className="space-y-2">
                  <Label htmlFor="requester">ผู้เบิก</Label>
                  <Input
                    id="requester"
                    placeholder="ชื่อ-นามสกุลผู้เบิก"
                    value={requester}
                    onChange={(e) => setRequester(e.target.value)}
                    required
                  />
                </div>

                {/* Purpose Selection */}
                <div className="space-y-2">
                  <Label htmlFor="purpose">วัตถุประสงค์</Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกวัตถุประสงค์" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((purp, index) => (
                        <SelectItem key={index} value={purp}>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>{purp}</span>
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
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting || !selectedMaterial || !quantity || !department || !requester || !purpose || insufficientStock}
                >
                  {isSubmitting ? (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      บันทึกการเบิกสต็อก
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
                <span className="text-sm text-muted-foreground">รายการเบิก</span>
                <Badge variant="outline">18</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">มูลค่ารวม</span>
                <Badge variant="outline">฿85,000</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">แผนกที่เบิก</span>
                <Badge variant="outline">5 แผนก</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Withdrawals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>เบิกล่าสุด</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWithdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{withdrawal.materialName}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        -{withdrawal.quantity} {withdrawal.unit}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Building className="w-3 h-3" />
                        <span>{withdrawal.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{withdrawal.requester}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{withdrawal.timestamp}</span>
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

export default WithdrawStockPage 
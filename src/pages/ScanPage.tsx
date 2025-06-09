import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Separator } from '../components/ui/separator'
import { 
  QrCode, 
  Camera, 
  Package,
  CheckCircle,
  AlertTriangle,
  History,
  Smartphone,
  Scan,
  RefreshCw
} from 'lucide-react'

/**
 * ScanPage Component
 * หน้าสแกน QR Code สำหรับการจัดการสต็อกแบบไร้กระดาษ
 */
export const ScanPage: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScannedItem, setLastScannedItem] = useState<any>(null)
  const [scanHistory, setScanHistory] = useState<any[]>([])

  // ข้อมูล Mock สำหรับการสแกนล่าสุด
  const mockScanHistory = [
    {
      id: 'SCAN001',
      qrCode: 'MAT001-LOT20240115',
      materialName: 'เหล็กเส้น 12mm',
      action: 'เพิ่มสต็อก',
      quantity: 50,
      unit: 'เส้น',
      timestamp: '2024-01-15 14:30:25',
      status: 'success'
    },
    {
      id: 'SCAN002',
      qrCode: 'MAT002-LOT20240114',
      materialName: 'ปูนซีเมนต์',
      action: 'เบิกสต็อก',
      quantity: 20,
      unit: 'ถุง',
      timestamp: '2024-01-15 13:15:18',
      status: 'success'
    },
    {
      id: 'SCAN003',
      qrCode: 'MAT999-INVALID',
      materialName: 'QR Code ไม่ถูกต้อง',
      action: 'ไม่ระบุ',
      quantity: 0,
      unit: '',
      timestamp: '2024-01-15 12:45:10',
      status: 'error'
    }
  ]

  // จำลองการสแกน QR Code
  const simulateScan = () => {
    setIsScanning(true)
    
    // จำลองเวลาการสแกน
    setTimeout(() => {
      const mockResult = {
        qrCode: 'MAT004-LOT20240116',
        materialName: 'ทราย',
        currentStock: 80,
        unit: 'ตัน',
        location: 'คลัง A-001',
        lastUpdated: '2024-01-16 09:30:00'
      }
      
      setLastScannedItem(mockResult)
      setIsScanning(false)
      
      // เพิ่มในประวัติ
      const newScan = {
        id: `SCAN${Date.now()}`,
        qrCode: mockResult.qrCode,
        materialName: mockResult.materialName,
        action: 'ตรวจสอบสต็อก',
        quantity: mockResult.currentStock,
        unit: mockResult.unit,
        timestamp: new Date().toLocaleString('th-TH'),
        status: 'success'
      }
      
      setScanHistory([newScan, ...scanHistory.slice(0, 4)])
    }, 2000)
  }

  const startCamera = () => {
    // TODO: เชื่อมต่อกับ Camera API หรือ Web RTC
    alert('เปิดใช้งานกล้องสำหรับสแกน QR Code')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />สำเร็จ</Badge>
      case 'error':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />ข้อผิดพลาด</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบ</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">สแกน QR</h1>
        <p className="text-muted-foreground">สแกน QR Code เพื่อจัดการสต็อกแบบไร้กระดาษ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera View */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-primary" />
                <span>สแกนเนอร์ QR Code</span>
              </CardTitle>
              <CardDescription>จ่อ QR Code ที่ติดบนวัตถุดิบเข้าหากล้อง</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {isScanning ? (
                  <div className="text-center">
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-lg font-medium">กำลังสแกน...</p>
                    <p className="text-sm text-muted-foreground">กรุณารอสักครู่</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-600 mb-2">พร้อมสำหรับการสแกน</p>
                    <p className="text-sm text-gray-500 mb-4">วาง QR Code ให้อยู่ในกรอบ</p>
                    <div className="flex justify-center space-x-3">
                      <Button onClick={startCamera} variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        เปิดกล้อง
                      </Button>
                      <Button onClick={simulateScan} disabled={isScanning}>
                        <Scan className="w-4 h-4 mr-2" />
                        ทดสอบสแกน
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scan Result */}
          {lastScannedItem && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span>ผลการสแกน</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-green-700">QR Code</Label>
                    <p className="font-mono text-sm bg-white p-2 rounded border">
                      {lastScannedItem.qrCode}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-green-700">วัตถุดิบ</Label>
                    <p className="text-lg font-semibold">{lastScannedItem.materialName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-green-700">สต็อกปัจจุบัน</Label>
                    <p className="text-lg font-semibold">
                      {lastScannedItem.currentStock} {lastScannedItem.unit}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-green-700">ตำแหน่ง</Label>
                    <p className="text-lg font-semibold">{lastScannedItem.location}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-green-600">
                    อัปเดตล่าสุด: {lastScannedItem.lastUpdated}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      เพิ่มสต็อก
                    </Button>
                    <Button size="sm" variant="outline">
                      เบิกสต็อก
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <span>วิธีการใช้งาน</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">เปิดกล้อง</p>
                    <p className="text-sm text-muted-foreground">กดปุ่ม "เปิดกล้อง" เพื่อเริ่มใช้งานสแกนเนอร์</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">จ่อ QR Code</p>
                    <p className="text-sm text-muted-foreground">วาง QR Code ที่ติดบนวัตถุดิบให้อยู่ในกรอบสแกน</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">ดูผลลัพธ์</p>
                    <p className="text-sm text-muted-foreground">ข้อมูลสต็อกจะแสดงขึ้นมา พร้อมตัวเลือกการจัดการ</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">สถิติการสแกนวันนี้</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">การสแกนทั้งหมด</span>
                <Badge variant="outline">89</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">สำเร็จ</span>
                <Badge className="bg-green-500">85</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ข้อผิดพลาด</span>
                <Badge variant="destructive">4</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Scan History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>ประวัติการสแกน</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(scanHistory.length > 0 ? scanHistory : mockScanHistory).slice(0, 5).map((scan) => (
                  <div key={scan.id} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{scan.materialName}</span>
                      {getStatusBadge(scan.status)}
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>QR: {scan.qrCode}</div>
                      <div>{scan.action}: {scan.quantity} {scan.unit}</div>
                      <div>{scan.timestamp}</div>
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

// Component สำหรับ Label (ถ้ายังไม่มี)
const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`text-sm font-medium ${className}`}>{children}</div>
)

export default ScanPage 
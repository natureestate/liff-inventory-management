import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Separator } from '../components/ui/separator'
import { Alert, AlertDescription } from '../components/ui/alert'
import { 
  Settings, 
  User, 
  Bell, 
  Database,
  Shield,
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Globe,
  ArrowLeft
} from 'lucide-react'

/**
 * SettingsPage Component
 * หน้าตั้งค่าระบบและการจัดการผู้ใช้
 */
export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    // ตั้งค่าทั่วไป
    companyName: 'บริษัท ก่อสร้าง ABC จำกัด',
    language: 'th',
    timezone: 'Asia/Bangkok',
    currency: 'THB',
    
    // ตั้งค่าการแจ้งเตือน
    enableLowStockAlerts: true,
    lowStockThreshold: 20,
    enableEmailNotifications: true,
    enableLineNotifications: true,
    
    // ตั้งค่าระบบ
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365,
    
    // ตั้งค่าผู้ใช้
    userName: 'Admin User',
    userEmail: 'admin@company.com',
    userRole: 'admin'
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // จำลองการบันทึก
    setTimeout(() => {
      setIsSaving(false)
      alert('บันทึกการตั้งค่าสำเร็จ!')
    }, 1000)
  }

  const handleExportData = () => {
    alert('ส่งออกข้อมูลเสร็จสิ้น!')
  }

  const handleImportData = () => {
    alert('นำเข้าข้อมูลเสร็จสิ้น!')
  }

  const handleBackupNow = () => {
    alert('สำรองข้อมูลเสร็จสิ้น!')
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>หน้าแรก</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ตั้งค่า</h1>
            <p className="text-muted-foreground">จัดการการตั้งค่าระบบและผู้ใช้งาน</p>
          </div>
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSaving ? (
            <>
              <AlertTriangle className="w-4 h-4 mr-2 animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              บันทึกการตั้งค่า
            </>
          )}
        </Button>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">ทั่วไป</TabsTrigger>
          <TabsTrigger value="notifications">การแจ้งเตือน</TabsTrigger>
          <TabsTrigger value="system">ระบบ</TabsTrigger>
          <TabsTrigger value="account">บัญชีผู้ใช้</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>ตั้งค่าทั่วไป</span>
              </CardTitle>
              <CardDescription>ตั้งค่าพื้นฐานของระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">ชื่อบริษัท</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">ภาษา</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="th">ไทย</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">เขตเวลา</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                      <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">สกุลเงิน</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="THB">บาท (THB)</SelectItem>
                      <SelectItem value="USD">ดอลลาร์ (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <span>ตั้งค่าการแจ้งเตือน</span>
              </CardTitle>
              <CardDescription>จัดการการแจ้งเตือนและการเตือนภัย</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>แจ้งเตือนสต็อกต่ำ</Label>
                    <p className="text-sm text-muted-foreground">
                      เปิดใช้งานการแจ้งเตือนเมื่อสต็อกต่ำกว่าที่กำหนด
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableLowStockAlerts}
                    onCheckedChange={(checked) => handleSettingChange('enableLowStockAlerts', checked)}
                  />
                </div>

                {settings.enableLowStockAlerts && (
                  <div className="ml-6">
                    <Label htmlFor="lowStockThreshold">เกณฑ์สต็อกต่ำ (%)</Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={settings.lowStockThreshold}
                      onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                      min="1"
                      max="100"
                      className="w-32 mt-2"
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนทาง Email</Label>
                    <p className="text-sm text-muted-foreground">
                      ส่งการแจ้งเตือนผ่านอีเมล
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('enableEmailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>การแจ้งเตือนทาง LINE</Label>
                    <p className="text-sm text-muted-foreground">
                      ส่งการแจ้งเตือนผ่าน LINE Notify
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableLineNotifications}
                    onCheckedChange={(checked) => handleSettingChange('enableLineNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <span>ตั้งค่าระบบ</span>
              </CardTitle>
              <CardDescription>จัดการข้อมูลและการสำรองข้อมูล</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>สำรองข้อมูลอัตโนมัติ</Label>
                    <p className="text-sm text-muted-foreground">
                      เปิดใช้งานการสำรองข้อมูลแบบอัตโนมัติ
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                  />
                </div>

                {settings.autoBackup && (
                  <div className="ml-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">ความถี่ในการสำรอง</Label>
                      <Select 
                        value={settings.backupFrequency} 
                        onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">ทุกชั่วโมง</SelectItem>
                          <SelectItem value="daily">ทุกวัน</SelectItem>
                          <SelectItem value="weekly">ทุกสัปดาห์</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">เก็บข้อมูลเป็นเวลา (วัน)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    min="30"
                    max="3650"
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    ข้อมูลเก่าจะถูกลบออกหลังจากเวลาที่กำหนด
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">การจัดการข้อมูล</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleBackupNow} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      สำรองข้อมูลทันที
                    </Button>
                    <Button onClick={handleExportData} variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      ส่งออกข้อมูล
                    </Button>
                    <Button onClick={handleImportData} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      นำเข้าข้อมูล
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                <span>โซนอันตราย</span>
              </CardTitle>
              <CardDescription className="text-red-600">
                การดำเนินการเหล่านี้ไม่สามารถย้อนกลับได้
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  การลบข้อมูลทั้งหมดจะไม่สามารถกู้คืนได้ กรุณาสำรองข้อมูลก่อนดำเนินการ
                </AlertDescription>
              </Alert>
              <div className="mt-4">
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  ลบข้อมูลทั้งหมด
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>ข้อมูลบัญชีผู้ใช้</span>
              </CardTitle>
              <CardDescription>จัดการข้อมูลส่วนตัวและการเข้าถึง</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="userName">ชื่อผู้ใช้</Label>
                  <Input
                    id="userName"
                    value={settings.userName}
                    onChange={(e) => handleSettingChange('userName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail">อีเมล</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={settings.userEmail}
                    onChange={(e) => handleSettingChange('userEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userRole">บทบาท</Label>
                  <Select value={settings.userRole} onValueChange={(value) => handleSettingChange('userRole', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                      <SelectItem value="manager">ผู้จัดการ</SelectItem>
                      <SelectItem value="staff">พนักงาน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">การรักษาความปลอดภัย</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    เปลี่ยนรหัสผ่าน
                  </Button>
                  <Button variant="outline">
                    <Smartphone className="w-4 h-4 mr-2" />
                    ตั้งค่า 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LIFF Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>ข้อมูล LINE LIFF</span>
              </CardTitle>
              <CardDescription>ข้อมูลการเชื่อมต่อกับ LINE</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">LIFF ID</Label>
                    <p className="font-mono text-sm bg-secondary p-2 rounded">
                      2007546326-RqNGeGEX
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Firebase Project</Label>
                    <p className="font-mono text-sm bg-secondary p-2 rounded">
                      linestock-e253f
                    </p>
                  </div>
                </div>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    เชื่อมต่อกับ LINE LIFF และ Firebase เรียบร้อยแล้ว
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage 
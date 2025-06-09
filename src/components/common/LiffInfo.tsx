import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { useLiff } from '../../contexts/LiffContext'

/**
 * Component สำหรับแสดงข้อมูล LIFF Configuration
 * ใช้สำหรับ debug และตรวจสอบการตั้งค่า
 */
export function LiffInfo() {
  const liff = useLiff()

  // ข้อมูล Environment Variables
  const envInfo = {
    liffId: import.meta.env.VITE_LIFF_ID,
    liffUrl: import.meta.env.VITE_LIFF_URL,
    liffAppName: import.meta.env.VITE_LIFF_APP_NAME,
    appName: import.meta.env.VITE_APP_NAME,
    appVersion: import.meta.env.VITE_APP_VERSION,
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
    debugMode: import.meta.env.VITE_DEBUG_MODE,
  }

  return (
    <div className="space-y-4">
      {/* LIFF Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            สถานะ LIFF
            <Badge variant={liff.isReady ? 'default' : 'destructive'}>
              {liff.isReady ? 'พร้อมใช้งาน' : 'ไม่พร้อม'}
            </Badge>
          </CardTitle>
          <CardDescription>
            ข้อมูลสถานะการเชื่อมต่อ LIFF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">พร้อมใช้งาน:</span>
              <Badge variant={liff.isReady ? 'default' : 'secondary'} className="ml-2">
                {liff.isReady ? 'ใช่' : 'ไม่'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">เข้าสู่ระบบ:</span>
              <Badge variant={liff.isLoggedIn ? 'default' : 'secondary'} className="ml-2">
                {liff.isLoggedIn ? 'ใช่' : 'ไม่'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">ใน LINE Client:</span>
              <Badge variant={liff.isInClient ? 'default' : 'secondary'} className="ml-2">
                {liff.isInClient ? 'ใช่' : 'ไม่'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">กำลังโหลด:</span>
              <Badge variant={liff.isLoading ? 'destructive' : 'default'} className="ml-2">
                {liff.isLoading ? 'ใช่' : 'ไม่'}
              </Badge>
            </div>
          </div>

          {liff.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">
                <span className="font-medium">ข้อผิดพลาด:</span> {liff.error}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Profile */}
      {liff.profile && (
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลผู้ใช้</CardTitle>
            <CardDescription>
              ข้อมูลโปรไฟล์จาก LINE
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-4">
              {liff.profile.pictureUrl && (
                <img
                  src={liff.profile.pictureUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{liff.profile.displayName}</p>
                <p className="text-sm text-gray-500">{liff.profile.userId}</p>
                {liff.profile.statusMessage && (
                  <p className="text-sm text-gray-600">{liff.profile.statusMessage}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>การตั้งค่า Environment</CardTitle>
          <CardDescription>
            ข้อมูลการตั้งค่าจาก Environment Variables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">LIFF ID:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {envInfo.liffId || 'ไม่ได้ตั้งค่า'}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">LIFF URL:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {envInfo.liffUrl || 'ไม่ได้ตั้งค่า'}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">LIFF App Name:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {envInfo.liffAppName || 'ไม่ได้ตั้งค่า'}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">App Name:</span>
              <span>{envInfo.appName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Version:</span>
              <Badge variant="outline">{envInfo.appVersion}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Environment:</span>
              <Badge variant={envInfo.environment === 'production' ? 'default' : 'secondary'}>
                {envInfo.environment}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Debug Mode:</span>
              <Badge variant={envInfo.debugMode === 'true' ? 'destructive' : 'default'}>
                {envInfo.debugMode === 'true' ? 'เปิด' : 'ปิด'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device & Context Info */}
      {(liff.os || liff.context || liff.language) && (
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลอุปกรณ์และบริบท</CardTitle>
            <CardDescription>
              ข้อมูลอุปกรณ์และบริบทการใช้งาน
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {liff.os && (
              <div className="flex justify-between text-sm">
                <span className="font-medium">ระบบปฏิบัติการ:</span>
                <span>{liff.os.os} {liff.os.version}</span>
              </div>
            )}
            {liff.language && (
              <div className="flex justify-between text-sm">
                <span className="font-medium">ภาษา:</span>
                <span>{liff.language}</span>
              </div>
            )}
            {liff.context && (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">ประเภท:</span>
                  <span>{liff.context.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">View Type:</span>
                  <span>{liff.context.viewType}</span>
                </div>
                {liff.context.roomId && (
                  <div className="flex justify-between">
                    <span className="font-medium">Room ID:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">{liff.context.roomId}</code>
                  </div>
                )}
                {liff.context.groupId && (
                  <div className="flex justify-between">
                    <span className="font-medium">Group ID:</span>
                    <code className="bg-gray-100 px-1 rounded text-xs">{liff.context.groupId}</code>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 
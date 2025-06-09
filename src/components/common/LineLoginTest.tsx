import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useLiff } from '../../contexts/LiffContext'
import { 
  verifyAccessToken, 
  getLineProfile, 
  getLineUserInfo, 
  revokeAccessToken,
  getAccessToken 
} from '../../lib/liff'

/**
 * Component สำหรับทดสอบ LINE Login API
 * ใช้สำหรับทดสอบการเรียกใช้ LINE Login API endpoints
 */
export function LineLoginTest() {
  const liff = useLiff()
  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [lineProfile, setLineProfile] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // ทดสอบ Verify Access Token
  const handleVerifyToken = async () => {
    setLoading('verify')
    setError(null)
    try {
      const result = await verifyAccessToken()
      setTokenInfo(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify token')
    } finally {
      setLoading(null)
    }
  }

  // ทดสอบ Get LINE Profile
  const handleGetLineProfile = async () => {
    setLoading('profile')
    setError(null)
    try {
      const result = await getLineProfile()
      setLineProfile(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get LINE profile')
    } finally {
      setLoading(null)
    }
  }

  // ทดสอบ Get User Info (OpenID)
  const handleGetUserInfo = async () => {
    setLoading('userinfo')
    setError(null)
    try {
      const result = await getLineUserInfo()
      setUserInfo(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get user info')
    } finally {
      setLoading(null)
    }
  }

  // ทดสอบ Revoke Access Token
  const handleRevokeToken = async () => {
    setLoading('revoke')
    setError(null)
    try {
      const result = await revokeAccessToken()
      if (result) {
        alert('Access Token ถูกยกเลิกเรียบร้อยแล้ว')
        // รีเซ็ตข้อมูล
        setTokenInfo(null)
        setLineProfile(null)
        setUserInfo(null)
      } else {
        throw new Error('Failed to revoke token')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke token')
    } finally {
      setLoading(null)
    }
  }

  // ล้างข้อมูล
  const handleClearData = () => {
    setTokenInfo(null)
    setLineProfile(null)
    setUserInfo(null)
    setError(null)
  }

  const accessToken = getAccessToken()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          LINE Login API Test
          <Badge variant={liff.isLoggedIn ? 'default' : 'secondary'}>
            {liff.isLoggedIn ? 'Logged In' : 'Not Logged In'}
          </Badge>
        </CardTitle>
        <CardDescription>
          ทดสอบการเรียกใช้ LINE Login API endpoints ต่างๆ
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Access Token Info */}
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium mb-2">Access Token:</p>
          {accessToken ? (
            <code className="text-xs bg-white p-2 rounded border block break-all">
              {accessToken.substring(0, 50)}...
            </code>
          ) : (
            <p className="text-sm text-gray-500">ไม่มี Access Token</p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              <span className="font-medium">ข้อผิดพลาด:</span> {error}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleVerifyToken}
            disabled={!liff.isLoggedIn || loading === 'verify'}
            variant="outline"
            size="sm"
          >
            {loading === 'verify' ? 'กำลังตรวจสอบ...' : 'Verify Token'}
          </Button>

          <Button
            onClick={handleGetLineProfile}
            disabled={!liff.isLoggedIn || loading === 'profile'}
            variant="outline"
            size="sm"
          >
            {loading === 'profile' ? 'กำลังดึงข้อมูล...' : 'Get Profile'}
          </Button>

          <Button
            onClick={handleGetUserInfo}
            disabled={!liff.isLoggedIn || loading === 'userinfo'}
            variant="outline"
            size="sm"
          >
            {loading === 'userinfo' ? 'กำลังดึงข้อมูล...' : 'Get User Info'}
          </Button>

          <Button
            onClick={handleRevokeToken}
            disabled={!liff.isLoggedIn || loading === 'revoke'}
            variant="destructive"
            size="sm"
          >
            {loading === 'revoke' ? 'กำลังยกเลิก...' : 'Revoke Token'}
          </Button>
        </div>

        <Button
          onClick={handleClearData}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          ล้างข้อมูล
        </Button>

        {/* Token Verification Result */}
        {tokenInfo && (
          <div className="space-y-2">
            <h4 className="font-medium">Token Verification Result:</h4>
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Scope:</span>
                  <span>{tokenInfo.scope}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Client ID:</span>
                  <span className="font-mono text-xs">{tokenInfo.client_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Expires In:</span>
                  <span>{tokenInfo.expires_in} วินาที</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LINE Profile Result */}
        {lineProfile && (
          <div className="space-y-2">
            <h4 className="font-medium">LINE Profile API Result:</h4>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">User ID:</span>
                  <span className="font-mono text-xs">{lineProfile.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Display Name:</span>
                  <span>{lineProfile.displayName}</span>
                </div>
                {lineProfile.pictureUrl && (
                  <div className="flex justify-between">
                    <span className="font-medium">Picture URL:</span>
                    <span className="font-mono text-xs truncate">{lineProfile.pictureUrl}</span>
                  </div>
                )}
                {lineProfile.statusMessage && (
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span>{lineProfile.statusMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* User Info Result */}
        {userInfo && (
          <div className="space-y-2">
            <h4 className="font-medium">User Info API Result (OpenID):</h4>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Subject (User ID):</span>
                  <span className="font-mono text-xs">{userInfo.sub}</span>
                </div>
                {userInfo.name && (
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{userInfo.name}</span>
                  </div>
                )}
                {userInfo.picture && (
                  <div className="flex justify-between">
                    <span className="font-medium">Picture:</span>
                    <span className="font-mono text-xs truncate">{userInfo.picture}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* API Documentation Links */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">API Documentation:</h4>
          <div className="space-y-1 text-sm">
            <p>• <strong>Verify Token:</strong> GET /oauth2/v2.1/verify</p>
            <p>• <strong>Get Profile:</strong> GET /v2/profile</p>
            <p>• <strong>Get User Info:</strong> GET /oauth2/v2.1/userinfo</p>
            <p>• <strong>Revoke Token:</strong> POST /oauth2/v2.1/revoke</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
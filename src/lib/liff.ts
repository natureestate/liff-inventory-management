import liff from '@line/liff'
import type { LiffProfile, LiffContext, LiffOS } from '../types/liff'

/**
 * LIFF Configuration
 */
const LIFF_ID = import.meta.env.VITE_LIFF_ID

/**
 * ตรวจสอบว่า LIFF ID ถูกกำหนดหรือไม่
 */
function validateLiffConfig() {
  if (!LIFF_ID) {
    throw new Error('LIFF ID is not configured. Please set VITE_LIFF_ID in .env file')
  }
}

/**
 * เริ่มต้น LIFF
 */
export async function initializeLiff(): Promise<void> {
  validateLiffConfig()
  
  try {
    await liff.init({ liffId: LIFF_ID })
    console.log('LIFF initialized successfully')
  } catch (error) {
    console.error('Failed to initialize LIFF:', error)
    throw error
  }
}

/**
 * ตรวจสอบว่า LIFF พร้อมใช้งานหรือไม่
 */
export function isLiffReady(): boolean {
  return liff.ready !== undefined
}

/**
 * ตรวจสอบว่าผู้ใช้ล็อกอินใน LINE หรือไม่
 */
export function isLoggedIn(): boolean {
  return liff.isLoggedIn()
}

/**
 * ตรวจสอบว่าแอปรันใน LINE Browser หรือไม่
 */
export function isInClient(): boolean {
  return liff.isInClient()
}

/**
 * เข้าสู่ระบบผ่าน LINE
 * รองรับ redirect URL และ state parameter
 */
export async function loginWithLiff(redirectUri?: string, state?: string): Promise<void> {
  try {
    if (!isLoggedIn()) {
      const loginOptions: any = {}
      
      // เพิ่ม redirect URI หากมีการระบุ
      if (redirectUri) {
        loginOptions.redirectUri = redirectUri
      }
      
      // เพิ่ม state parameter หากมีการระบุ
      if (state) {
        loginOptions.state = state
      }
      
      liff.login(loginOptions)
    }
  } catch (error) {
    console.error('Failed to login with LIFF:', error)
    throw error
  }
}

/**
 * ออกจากระบบ
 */
export async function logoutFromLiff(): Promise<void> {
  try {
    if (isLoggedIn()) {
      liff.logout()
    }
  } catch (error) {
    console.error('Failed to logout from LIFF:', error)
    throw error
  }
}

/**
 * ดึงข้อมูล Profile ของผู้ใช้จาก LINE
 */
export async function getLiffProfile(): Promise<LiffProfile | null> {
  try {
    if (!isLoggedIn()) {
      return null
    }

    const profile = await liff.getProfile()
    return {
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage
    }
  } catch (error) {
    console.error('Failed to get LIFF profile:', error)
    return null
  }
}

/**
 * ดึงข้อมูล Context ของ LIFF
 */
export function getLiffContext(): LiffContext | null {
  try {
    const context = liff.getContext()
    if (!context) return null

    return {
      type: context.type as any,
      viewType: context.viewType as any,
      userId: context.userId,
      utouId: context.utouId,
      roomId: context.roomId,
      groupId: context.groupId,
      squareChatId: context.squareChatId
    }
  } catch (error) {
    console.error('Failed to get LIFF context:', error)
    return null
  }
}

/**
 * ดึงข้อมูล OS ของอุปกรณ์
 */
export function getLiffOS(): LiffOS | null {
  try {
    const os = liff.getOS()
    return {
      os: os as any,
      version: liff.getVersion()
    }
  } catch (error) {
    console.error('Failed to get LIFF OS info:', error)
    return null
  }
}

/**
 * ดึงภาษาของผู้ใช้
 */
export function getLiffLanguage(): string {
  try {
    return liff.getLanguage()
  } catch (error) {
    console.error('Failed to get LIFF language:', error)
    return 'th'
  }
}

/**
 * ส่งข้อความไปยัง LINE Chat
 */
export async function sendMessage(message: string): Promise<void> {
  try {
    if (!isInClient()) {
      console.warn('Cannot send message: not in LINE client')
      return
    }

    await liff.sendMessages([
      {
        type: 'text',
        text: message
      }
    ])
  } catch (error) {
    console.error('Failed to send message:', error)
    throw error
  }
}

/**
 * เปิดหน้าต่างใหม่
 */
export function openWindow(url: string, external: boolean = false): void {
  try {
    liff.openWindow({
      url,
      external
    })
  } catch (error) {
    console.error('Failed to open window:', error)
    // Fallback: ใช้ window.open ปกติ
    window.open(url, external ? '_blank' : '_self')
  }
}

/**
 * ปิดหน้าต่าง LIFF
 */
export function closeWindow(): void {
  try {
    liff.closeWindow()
  } catch (error) {
    console.error('Failed to close window:', error)
    // Fallback: ปิดหน้าต่างปกติ
    window.close()
  }
}

/**
 * สแกน QR Code
 */
export async function scanCode(): Promise<string | null> {
  try {
    if (!liff.scanCode) {
      throw new Error('QR Code scanning is not supported')
    }

    const result = await liff.scanCode()
    return result.value
  } catch (error) {
    console.error('Failed to scan QR code:', error)
    return null
  }
}

/**
 * ดึง Access Token สำหรับ API calls
 * Access Token นี้สามารถใช้กับ LINE Login API ได้
 */
export function getAccessToken(): string | null {
  try {
    if (!isLoggedIn()) {
      return null
    }
    return liff.getAccessToken()
  } catch (error) {
    console.error('Failed to get access token:', error)
    return null
  }
}

/**
 * ตรวจสอบความถูกต้องของ Access Token
 * เรียกใช้ LINE Login API: GET https://api.line.me/oauth2/v2.1/verify
 */
export async function verifyAccessToken(): Promise<{
  scope: string
  client_id: string
  expires_in: number
} | null> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(`https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to verify access token:', error)
    return null
  }
}

/**
 * ดึงข้อมูลผู้ใช้จาก LINE Login API
 * เรียกใช้ LINE Login API: GET https://api.line.me/v2/profile
 */
export async function getLineProfile(): Promise<{
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
} | null> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to get LINE profile:', error)
    return null
  }
}

/**
 * ดึงข้อมูลผู้ใช้จาก LINE Login API (OpenID)
 * เรียกใช้ LINE Login API: GET https://api.line.me/oauth2/v2.1/userinfo
 */
export async function getLineUserInfo(): Promise<{
  sub: string
  name?: string
  picture?: string
} | null> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch('https://api.line.me/oauth2/v2.1/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to get LINE user info:', error)
    return null
  }
}

/**
 * ยกเลิก Access Token
 * เรียกใช้ LINE Login API: POST https://api.line.me/oauth2/v2.1/revoke
 */
export async function revokeAccessToken(): Promise<boolean> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch('https://api.line.me/oauth2/v2.1/revoke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        access_token: accessToken,
        client_id: import.meta.env.VITE_FIREBASE_PROJECT_ID || '', // ใช้ project ID เป็น client_id
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Failed to revoke access token:', error)
    return false
  }
}

/**
 * ตรวจสอบว่า LIFF รองรับฟีเจอร์หรือไม่
 */
export function isFeatureSupported(feature: string): boolean {
  try {
    return liff.isApiAvailable(feature)
  } catch (error) {
    console.error(`Failed to check feature support for ${feature}:`, error)
    return false
  }
}

export default liff 
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { LiffContextType, LiffState, LiffProfile } from '../types/liff'
import { 
  initializeLiff, 
  isLiffReady, 
  isLoggedIn, 
  isInClient,
  loginWithLiff,
  logoutFromLiff,
  getLiffProfile,
  getLiffContext,
  getLiffOS,
  getLiffLanguage
} from '../lib/liff'

// สร้าง Context
const LiffContext = createContext<LiffContextType | undefined>(undefined)

// Provider Props
interface LiffProviderProps {
  children: ReactNode
}

/**
 * LIFF Provider Component
 * จัดการ LIFF initialization และ state
 */
export function LiffProvider({ children }: LiffProviderProps) {
  const [state, setState] = useState<LiffState>({
    isReady: false,
    isLoggedIn: false,
    isInClient: false,
    profile: null,
    context: null,
    os: null,
    version: null,
    language: null,
    isLoading: true,
    error: null
  })

  /**
   * เริ่มต้น LIFF
   */
  const initialize = async (_liffId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // เริ่มต้น LIFF SDK
      await initializeLiff()

      // อัปเดต state เมื่อ LIFF พร้อม
      const ready = isLiffReady()
      const loggedIn = isLoggedIn()
      const inClient = isInClient()
      const context = getLiffContext()
      const os = getLiffOS()
      const language = getLiffLanguage()

      let profile: LiffProfile | null = null
      if (loggedIn) {
        profile = await getLiffProfile()
      }

      setState({
        isReady: ready,
        isLoggedIn: loggedIn,
        isInClient: inClient,
        profile,
        context,
        os,
        version: os?.version || null,
        language,
        isLoading: false,
        error: null
      })

    } catch (error) {
      console.error('Failed to initialize LIFF:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize LIFF'
      }))
    }
  }

  /**
   * เข้าสู่ระบบ
   */
  const login = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      await loginWithLiff()

      // หลังจากล็อกอินสำเร็จ ดึงข้อมูล profile ใหม่
      const profile = await getLiffProfile()
      setState(prev => ({
        ...prev,
        isLoggedIn: true,
        profile,
        isLoading: false
      }))

    } catch (error) {
      console.error('Failed to login:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to login'
      }))
    }
  }

  /**
   * ออกจากระบบ
   */
  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      await logoutFromLiff()

      setState(prev => ({
        ...prev,
        isLoggedIn: false,
        profile: null,
        isLoading: false
      }))

    } catch (error) {
      console.error('Failed to logout:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to logout'
      }))
    }
  }

  /**
   * ดึงข้อมูล Profile ใหม่
   */
  const getProfile = async (): Promise<LiffProfile | null> => {
    try {
      const profile = await getLiffProfile()
      setState(prev => ({ ...prev, profile }))
      return profile
    } catch (error) {
      console.error('Failed to get profile:', error)
      return null
    }
  }

  /**
   * ส่งข้อความไปยัง LINE
   */
  const sendMessage = async (message: any) => {
    // จะ implement ใน lib/liff.ts
    console.log('Sending message:', message)
  }

  /**
   * เปิดหน้าต่างใหม่
   */
  const openWindow = (url: string, external?: boolean) => {
    // จะ implement ใน lib/liff.ts
    console.log('Opening window:', url, external)
  }

  /**
   * ปิดหน้าต่าง
   */
  const closeWindow = () => {
    // จะ implement ใน lib/liff.ts
    console.log('Closing window')
  }

  /**
   * Share Target Picker
   */
  const shareTargetPicker = async (messages: any[], options?: any) => {
    // จะ implement ใน lib/liff.ts
    console.log('Share target picker:', messages, options)
  }

  /**
   * สแกน QR Code
   */
  const scanCode = async () => {
    // จะ implement ใน lib/liff.ts
    console.log('Scanning QR code')
    return { value: '' }
  }

  /**
   * Bluetooth
   */
  const getBluetooth = async (options: any) => {
    // จะ implement ใน lib/liff.ts
    console.log('Getting bluetooth:', options)
    return {}
  }

  // เริ่มต้น LIFF เมื่อ component mount
  useEffect(() => {
    const liffId = import.meta.env.VITE_LIFF_ID
    if (liffId) {
      initialize(liffId)
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'LIFF ID is not configured'
      }))
    }
  }, [])

  // Context value
  const contextValue: LiffContextType = {
    ...state,
    initialize,
    login,
    logout,
    getProfile,
    sendMessage,
    openWindow,
    closeWindow,
    shareTargetPicker,
    scanCode,
    getBluetooth
  }

  return (
    <LiffContext.Provider value={contextValue}>
      {children}
    </LiffContext.Provider>
  )
}

/**
 * Hook สำหรับใช้ LIFF Context
 */
export function useLiff(): LiffContextType {
  const context = useContext(LiffContext)
  if (context === undefined) {
    throw new Error('useLiff must be used within a LiffProvider')
  }
  return context
}

export default LiffContext 
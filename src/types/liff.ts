/**
 * LIFF Configuration
 */
export interface LiffConfig {
  liffId: string
  shareTargetPicker?: boolean
  permanentLink?: boolean
}

/**
 * LIFF Profile (ข้อมูลจาก LINE)
 */
export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

/**
 * LIFF Context
 */
export interface LiffContext {
  type: 'utou' | 'room' | 'group' | 'square_chat' | 'external'
  viewType: 'compact' | 'tall' | 'full'
  userId?: string
  utouId?: string
  roomId?: string
  groupId?: string
  squareChatId?: string
}

/**
 * LIFF OS Info
 */
export interface LiffOS {
  os: 'ios' | 'android' | 'web'
  version?: string
}

/**
 * LIFF Send Message Options
 */
export interface LiffSendMessageOptions {
  type: 'text' | 'sticker' | 'image' | 'video' | 'audio' | 'file' | 'location' | 'template'
  text?: string
  packageId?: string
  stickerId?: string
  originalContentUrl?: string
  previewImageUrl?: string
  title?: string
  address?: string
  latitude?: number
  longitude?: number
  altText?: string
  template?: any
}

/**
 * LIFF Share Target Picker Options
 */
export interface LiffShareTargetPickerOptions {
  isMultiple?: boolean
  isExternalDefault?: boolean
}

/**
 * LIFF QR Code Scanner Result
 */
export interface LiffScanCodeResult {
  value: string
}

/**
 * LIFF Bluetooth Options
 */
export interface LiffBluetoothOptions {
  filters: Array<{
    deviceId?: string
    name?: string
    namePrefix?: string
    services?: string[]
  }>
  optionalServices?: string[]
}

/**
 * LIFF State
 */
export interface LiffState {
  isReady: boolean
  isLoggedIn: boolean
  isInClient: boolean
  profile: LiffProfile | null
  context: LiffContext | null
  os: LiffOS | null
  version: string | null
  language: string | null
  isLoading: boolean
  error: string | null
}

/**
 * LIFF Actions
 */
export interface LiffActions {
  initialize: (liffId: string) => Promise<void>
  login: () => Promise<void>
  logout: () => Promise<void>
  getProfile: () => Promise<LiffProfile | null>
  sendMessage: (message: LiffSendMessageOptions) => Promise<void>
  openWindow: (url: string, external?: boolean) => void
  closeWindow: () => void
  shareTargetPicker: (messages: LiffSendMessageOptions[], options?: LiffShareTargetPickerOptions) => Promise<void>
  scanCode: () => Promise<LiffScanCodeResult>
  getBluetooth: (options: LiffBluetoothOptions) => Promise<any>
}

/**
 * LIFF Context Type
 */
export interface LiffContextType extends LiffState, LiffActions {}

/**
 * LIFF Error Types
 */
export interface LiffError {
  code: string
  message: string
}

/**
 * LIFF Ready Event
 */
export interface LiffReadyEvent {
  language: string
  context: LiffContext
  os: LiffOS
  version: string
} 
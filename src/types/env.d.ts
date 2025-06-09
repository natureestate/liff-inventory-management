/// <reference types="vite/client" />

/**
 * Environment Variables Type Definitions
 * กำหนด types สำหรับ environment variables ที่ใช้ในแอปพลิเคชัน
 */
interface ImportMetaEnv {
  // Firebase Configuration
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string

  // LIFF Configuration
  readonly VITE_LIFF_ID: string
  readonly VITE_LIFF_URL: string
  readonly VITE_LIFF_APP_NAME: string

  // Application Configuration
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENVIRONMENT: 'development' | 'staging' | 'production'

  // API Configuration
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string

  // Debug Configuration
  readonly VITE_DEBUG_MODE: 'true' | 'false'
  readonly VITE_ENABLE_LOGGING: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 
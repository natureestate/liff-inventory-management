import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

/**
 * Firebase Configuration
 * ใช้ environment variables จากไฟล์ .env
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// ตรวจสอบว่ามี environment variables ครบถ้วนหรือไม่
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !import.meta.env[envVar]
)

if (missingEnvVars.length > 0) {
  console.error(
    '❌ Missing required environment variables:',
    missingEnvVars.join(', ')
  )
  console.error('Please check your .env file and make sure all Firebase configuration variables are set.')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Export the app instance
export default app

// Debug logging (เฉพาะใน development mode)
if (import.meta.env.VITE_DEBUG_MODE === 'true') {
  console.log('🔥 Firebase initialized successfully')
  console.log('📊 Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID)
  console.log('🌍 Environment:', import.meta.env.VITE_APP_ENVIRONMENT)
} 
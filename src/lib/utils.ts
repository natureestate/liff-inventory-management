import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * รวม CSS classes โดยใช้ clsx และ tailwind-merge
 * สำหรับใช้งานกับ shadcn/ui components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * จัดรูปแบบตัวเลขเป็นสกุลเงินไทย
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(amount)
}

/**
 * จัดรูปแบบตัวเลขด้วยคอมม่า
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

/**
 * จัดรูปแบบวันที่เป็นภาษาไทย
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

/**
 * จัดรูปแบบวันที่และเวลาเป็นภาษาไทย
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * สร้าง reference number แบบอัตโนมัติ
 */
export function generateReferenceNumber(prefix: string = 'REF'): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const time = String(now.getTime()).slice(-6) // ใช้ 6 หลักสุดท้ายของ timestamp
  
  return `${prefix}-${year}${month}${day}-${time}`
}

/**
 * ตรวจสอบว่าสต็อกต่ำกว่าขั้นต่ำหรือไม่
 */
export function isLowStock(currentStock: number, minStock: number): boolean {
  return currentStock <= minStock
}

/**
 * คำนวณเปอร์เซ็นต์สต็อกที่เหลือ
 */
export function calculateStockPercentage(currentStock: number, maxStock: number): number {
  if (maxStock === 0) return 0
  return Math.min((currentStock / maxStock) * 100, 100)
}

/**
 * สร้าง barcode/QR code แบบง่าย
 */
export function generateBarcode(prefix: string = 'MAT'): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${timestamp.slice(-8)}${random}`
}

/**
 * ตรวจสอบ user agent ว่าเป็น LINE Browser หรือไม่
 */
export function isLINEBrowser(): boolean {
  if (typeof window === 'undefined') return false
  return /Line/i.test(window.navigator.userAgent)
}

/**
 * copy text ไปยัง clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * debounce function สำหรับการค้นหา
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
} 
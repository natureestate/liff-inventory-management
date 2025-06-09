import type { TransactionType, TransactionStatus } from '../lib/constants'

/**
 * ข้อมูลวัตถุดิบ/สินค้า
 */
export interface Material {
  id: string
  code: string // รหัสวัตถุดิบ
  name: string // ชื่อวัตถุดิบ
  category: string // หมวดหมู่
  unit: string // หน่วยนับ
  currentStock: number // สต็อกปัจจุบัน
  minStock: number // สต็อกขั้นต่ำ
  maxStock: number // สต็อกสูงสุด
  unitPrice: number // ราคาต่อหน่วย
  location: string // ที่เก็บ
  expiryDate?: string // วันหมดอายุ (ถ้ามี)
  supplier: string // ผู้จำหน่าย
  barcode?: string // บาร์โค้ด
  description?: string // รายละเอียดเพิ่มเติม
  imageUrl?: string // รูปภาพวัตถุดิบ
  isActive: boolean // สถานะใช้งาน
  createdAt: Date
  updatedAt: Date
  createdBy: string // User ID ผู้สร้าง
}

/**
 * ข้อมูลการทำธุรกรรมสต็อก
 */
export interface Transaction {
  id: string
  materialId: string // ID ของวัตถุดิบ
  materialCode: string // รหัสวัตถุดิบ (เก็บไว้เพื่อความสะดวก)
  materialName: string // ชื่อวัตถุดิบ (เก็บไว้เพื่อความสะดวก)
  type: TransactionType // IN หรือ OUT
  quantity: number // จำนวน
  reason: string // เหตุผล
  referenceNo?: string // เลขที่อ้างอิง (PO, DO, etc.)
  userId: string // User ID ผู้ทำรายการ
  userName: string // ชื่อผู้ทำรายการ
  approvedBy?: string // User ID ผู้อนุมัติ
  approvedByName?: string // ชื่อผู้อนุมัติ
  status: TransactionStatus // สถานะ
  notes?: string // หมายเหตุ
  location: string // ที่เก็บ
  unitPrice?: number // ราคาต่อหน่วย ณ เวลาทำรายการ
  totalValue?: number // มูลค่ารวม
  timestamp: Date // วันเวลาที่ทำรายการ
  approvedAt?: Date // วันเวลาที่อนุมัติ
}

/**
 * ข้อมูลหมวดหมู่วัตถุดิบ
 */
export interface Category {
  id: string
  name: string
  description?: string
  isActive: boolean
  createdAt: Date
}

/**
 * ข้อมูลสำหรับ Dashboard
 */
export interface DashboardStats {
  totalMaterials: number
  totalValue: number
  lowStockCount: number
  outOfStockCount: number
  todayTransactions: number
  monthlyTransactions: number
  recentTransactions: Transaction[]
  lowStockMaterials: Material[]
}

/**
 * ข้อมูลการค้นหาและกรอง
 */
export interface MaterialFilter {
  search?: string
  category?: string
  location?: string
  stockStatus?: 'all' | 'normal' | 'low' | 'out'
  isActive?: boolean
  sortBy?: 'name' | 'code' | 'currentStock' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

/**
 * ข้อมูลการค้นหาธุรกรรม
 */
export interface TransactionFilter {
  search?: string
  materialId?: string
  type?: TransactionType
  status?: TransactionStatus
  userId?: string
  dateFrom?: Date
  dateTo?: Date
  sortBy?: 'timestamp' | 'materialName' | 'quantity'
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

/**
 * ข้อมูลสำหรับสร้างธุรกรรมใหม่
 */
export interface CreateTransactionRequest {
  materialId: string
  type: TransactionType
  quantity: number
  reason: string
  referenceNo?: string
  notes?: string
  location: string
}

/**
 * ข้อมูลสำหรับสร้างวัตถุดิบใหม่
 */
export interface CreateMaterialRequest {
  code: string
  name: string
  category: string
  unit: string
  minStock: number
  maxStock: number
  unitPrice: number
  location: string
  supplier: string
  description?: string
  expiryDate?: string
  barcode?: string
}

/**
 * ข้อมูลสำหรับอัปเดตวัตถุดิบ
 */
export interface UpdateMaterialRequest extends Partial<CreateMaterialRequest> {
  id: string
}

/**
 * ข้อมูล Stock Alert
 */
export interface StockAlert {
  id: string
  materialId: string
  materialCode: string
  materialName: string
  currentStock: number
  minStock: number
  maxStock: number
  alertType: 'low' | 'out' | 'expired'
  severity: 'info' | 'warning' | 'critical'
  message: string
  createdAt: Date
  isRead: boolean
}

/**
 * ข้อมูลรายงาน
 */
export interface InventoryReport {
  period: {
    from: Date
    to: Date
  }
  summary: {
    totalMaterials: number
    totalValue: number
    totalTransactions: number
    stockInValue: number
    stockOutValue: number
  }
  materials: Array<{
    material: Material
    stockIn: number
    stockOut: number
    currentStock: number
    value: number
  }>
  transactions: Transaction[]
}

/**
 * Inventory Context State
 */
export interface InventoryState {
  materials: Material[]
  transactions: Transaction[]
  categories: Category[]
  alerts: StockAlert[]
  dashboardStats: DashboardStats | null
  isLoading: boolean
  error: string | null
}

/**
 * Inventory Context Actions
 */
export interface InventoryActions {
  loadMaterials: (filter?: MaterialFilter) => Promise<void>
  loadTransactions: (filter?: TransactionFilter) => Promise<void>
  loadDashboardStats: () => Promise<void>
  loadCategories: () => Promise<void>
  loadAlerts: () => Promise<void>
  createMaterial: (material: CreateMaterialRequest) => Promise<Material>
  updateMaterial: (material: UpdateMaterialRequest) => Promise<Material>
  deleteMaterial: (id: string) => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<Transaction>
  approveTransaction: (id: string) => Promise<void>
  cancelTransaction: (id: string) => Promise<void>
  generateReport: (from: Date, to: Date) => Promise<InventoryReport>
}

/**
 * Inventory Context Type
 */
export interface InventoryContextType extends InventoryState, InventoryActions {} 
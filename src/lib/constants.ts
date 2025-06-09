// ค่าคงที่สำหรับ User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager', 
  OPERATOR: 'operator',
  VIEWER: 'viewer'
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// ค่าคงที่สำหรับ Transaction Types
export const TRANSACTION_TYPES = {
  IN: 'IN',
  OUT: 'OUT'
} as const

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES]

// ค่าคงที่สำหรับ Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved', 
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export type TransactionStatus = typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS]

// ค่าคงที่สำหรับ Material Categories
export const MATERIAL_CATEGORIES = [
  'เหล็ก',
  'คอนกรีต', 
  'ไม้',
  'ก่ออิฐ',
  'สี',
  'เครื่องมือ',
  'อุปกรณ์ไฟฟ้า',
  'อุปกรณ์ประปา',
  'อื่นๆ'
] as const

// ค่าคงที่สำหรับ Units
export const UNITS = [
  'ชิ้น',
  'กิโลกรัม',
  'ตัน', 
  'ลิตร',
  'ถุง',
  'กล่อง',
  'แผ่น',
  'เมตร',
  'ตารางเมตร',
  'ลูกบาศก์เมตร'
] as const

// ค่าคงที่สำหรับ Departments
export const DEPARTMENTS = [
  'คลังสินค้า',
  'การผลิต',
  'การก่อสร้าง',
  'การติดตั้ง',
  'การจัดส่ง',
  'ธุรการ',
  'บัญชี'
] as const

// ค่าคงที่สำหรับ Stock Alert Levels
export const STOCK_ALERT_LEVELS = {
  CRITICAL: 0.1, // 10% ของ max stock
  LOW: 0.25,     // 25% ของ max stock
  NORMAL: 0.5    // 50% ของ max stock
} as const

// ค่าคงที่สำหรับ Permission Types
export const PERMISSIONS = {
  VIEW_STOCK: 'canViewStock',
  ADD_STOCK: 'canAddStock',
  REMOVE_STOCK: 'canRemoveStock',
  EDIT_MATERIAL: 'canEditMaterial',
  DELETE_MATERIAL: 'canDeleteMaterial',
  APPROVE_TRANSACTION: 'canApproveTransaction',
  VIEW_REPORTS: 'canViewReports',
  MANAGE_USERS: 'canManageUsers',
  MANAGE_SETTINGS: 'canManageSettings'
} as const

// Default Permissions สำหรับแต่ละ Role
export const DEFAULT_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    [PERMISSIONS.VIEW_STOCK]: true,
    [PERMISSIONS.ADD_STOCK]: true,
    [PERMISSIONS.REMOVE_STOCK]: true,
    [PERMISSIONS.EDIT_MATERIAL]: true,
    [PERMISSIONS.DELETE_MATERIAL]: true,
    [PERMISSIONS.APPROVE_TRANSACTION]: true,
    [PERMISSIONS.VIEW_REPORTS]: true,
    [PERMISSIONS.MANAGE_USERS]: true,
    [PERMISSIONS.MANAGE_SETTINGS]: true
  },
  [USER_ROLES.MANAGER]: {
    [PERMISSIONS.VIEW_STOCK]: true,
    [PERMISSIONS.ADD_STOCK]: true,
    [PERMISSIONS.REMOVE_STOCK]: true,
    [PERMISSIONS.EDIT_MATERIAL]: true,
    [PERMISSIONS.DELETE_MATERIAL]: false,
    [PERMISSIONS.APPROVE_TRANSACTION]: true,
    [PERMISSIONS.VIEW_REPORTS]: true,
    [PERMISSIONS.MANAGE_USERS]: false,
    [PERMISSIONS.MANAGE_SETTINGS]: false
  },
  [USER_ROLES.OPERATOR]: {
    [PERMISSIONS.VIEW_STOCK]: true,
    [PERMISSIONS.ADD_STOCK]: true,
    [PERMISSIONS.REMOVE_STOCK]: true,
    [PERMISSIONS.EDIT_MATERIAL]: false,
    [PERMISSIONS.DELETE_MATERIAL]: false,
    [PERMISSIONS.APPROVE_TRANSACTION]: false,
    [PERMISSIONS.VIEW_REPORTS]: false,
    [PERMISSIONS.MANAGE_USERS]: false,
    [PERMISSIONS.MANAGE_SETTINGS]: false
  },
  [USER_ROLES.VIEWER]: {
    [PERMISSIONS.VIEW_STOCK]: true,
    [PERMISSIONS.ADD_STOCK]: false,
    [PERMISSIONS.REMOVE_STOCK]: false,
    [PERMISSIONS.EDIT_MATERIAL]: false,
    [PERMISSIONS.DELETE_MATERIAL]: false,
    [PERMISSIONS.APPROVE_TRANSACTION]: false,
    [PERMISSIONS.VIEW_REPORTS]: true,
    [PERMISSIONS.MANAGE_USERS]: false,
    [PERMISSIONS.MANAGE_SETTINGS]: false
  }
} as const

// ค่าคงที่สำหรับ Firebase Collections
export const COLLECTIONS = {
  USERS: 'users',
  MATERIALS: 'materials',
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories'
} as const

// ค่าคงที่สำหรับ Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'liff_inventory_user_preferences',
  LAST_SEARCH: 'liff_inventory_last_search',
  DRAFT_TRANSACTION: 'liff_inventory_draft_transaction'
} as const

// ค่าคงที่สำหรับ Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
} as const

// ค่าคงที่สำหรับ Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  FILENAME: 'yyyyMMdd_HHmmss'
} as const 
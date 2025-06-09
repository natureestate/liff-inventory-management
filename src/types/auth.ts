import type { UserRole } from '../lib/constants'

/**
 * ข้อมูล User จาก LINE Profile
 */
export interface LINEProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

/**
 * ข้อมูล User ในระบบ
 */
export interface User {
  id: string
  lineUserId: string // Primary key จาก LINE
  displayName: string
  pictureUrl?: string
  email?: string // Optional, manual input
  role: UserRole
  department: string
  employeeId?: string // Optional company employee ID
  isActive: boolean
  permissions: UserPermissions
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

/**
 * User Permissions
 */
export interface UserPermissions {
  canViewStock: boolean
  canAddStock: boolean
  canRemoveStock: boolean
  canEditMaterial: boolean
  canDeleteMaterial: boolean
  canApproveTransaction: boolean
  canViewReports: boolean
  canManageUsers: boolean
  canManageSettings: boolean
}

/**
 * Auth Context State
 */
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

/**
 * Auth Context Actions
 */
export interface AuthActions {
  login: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  checkPermission: (permission: keyof UserPermissions) => boolean
}

/**
 * Auth Context Type
 */
export interface AuthContextType extends AuthState, AuthActions {}

/**
 * Login Response
 */
export interface LoginResponse {
  user: User
  isNewUser: boolean
} 
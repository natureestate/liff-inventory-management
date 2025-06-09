import React from 'react'
import { StockOverview } from '../components/inventory/StockOverview'
import { LiffInfo } from '../components/common/LiffInfo'
import { LineLoginTest } from '../components/common/LineLoginTest'

/**
 * HomePage Component
 * หน้าแรกของแอปพลิเคชัน แสดง Dashboard และภาพรวมต่างๆ
 */
export const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* LIFF Information (Debug) - แสดงเฉพาะใน development */}
      {process.env.NODE_ENV === 'development' && <LiffInfo />}
      
      {/* LINE Login API Test - แสดงเฉพาะใน development */}
      {process.env.NODE_ENV === 'development' && <LineLoginTest />}
      
      {/* Stock Overview - Dashboard หลัก */}
      <StockOverview />
    </div>
  )
}

export default HomePage 
import { LiffProvider } from './contexts/LiffContext'
import { Navigation } from './components/layout/Navigation'
import { StockOverview } from './components/inventory/StockOverview'
import { LiffInfo } from './components/common/LiffInfo'
import { LineLoginTest } from './components/common/LineLoginTest'

/**
 * Main App Component
 * จุดเริ่มต้นของแอปพลิเคชัน LIFF Inventory Management System
 */
function App() {
  return (
    <LiffProvider>
      <div className="min-h-screen bg-background">
        {/* Navigation Bar */}
        <Navigation />
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* LIFF Information (Debug) */}
          <LiffInfo />
          
          {/* LINE Login API Test */}
          <LineLoginTest />
          
          {/* Stock Overview */}
          <StockOverview />
        </main>
      </div>
    </LiffProvider>
  )
}

export default App

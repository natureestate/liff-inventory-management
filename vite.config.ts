import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // กำหนดค่า server สำหรับ development
  server: {
    port: 3100, // ใช้ port 3100 เป็น default
    host: true, // รองรับการเข้าถึงจาก network อื่น
    strictPort: true, // ถ้า port 3100 ถูกใช้แล้วจะไม่เปลี่ยนไปใช้ port อื่น
  },
  // กำหนด path aliases สำหรับ import
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
})

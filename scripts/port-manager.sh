#!/bin/bash

# สคริปต์สำหรับจัดการ Port 3100
# ใช้สำหรับ kill process, หยุด PID, และ restart แอปพลิเคชัน

PORT=3100
APP_NAME="LIFF Inventory"

# ฟังก์ชันแสดงสีในเทอร์มินัล
print_color() {
    case $2 in
        "green") echo -e "\033[32m$1\033[0m" ;;
        "red") echo -e "\033[31m$1\033[0m" ;;
        "yellow") echo -e "\033[33m$1\033[0m" ;;
        "blue") echo -e "\033[34m$1\033[0m" ;;
        *) echo "$1" ;;
    esac
}

# ฟังก์ชันตรวจสอบ process ที่ใช้ port
check_port() {
    print_color "🔍 ตรวจสอบ process ที่ใช้ port $PORT..." "blue"
    PID=$(lsof -ti tcp:$PORT)
    
    if [ -z "$PID" ]; then
        print_color "✅ Port $PORT ว่างอยู่" "green"
        return 1
    else
        print_color "⚠️  Port $PORT ถูกใช้งานโดย PID: $PID" "yellow"
        # แสดงรายละเอียดของ process
        ps -p $PID -o pid,ppid,cmd
        return 0
    fi
}

# ฟังก์ชัน kill process ที่ใช้ port
kill_port() {
    print_color "🔄 กำลัง kill process ที่ใช้ port $PORT..." "blue"
    
    # ค้นหา PID ที่ใช้ port
    PID=$(lsof -ti tcp:$PORT)
    
    if [ -z "$PID" ]; then
        print_color "✅ ไม่มี process ใช้ port $PORT" "green"
        return 0
    fi
    
    # พยายาม kill แบบ graceful ก่อน (SIGTERM)
    print_color "📤 ส่งสัญญาณ SIGTERM ไปยัง PID $PID..." "yellow"
    kill $PID
    
    # รอ 3 วินาทีให้ process หยุดเอง
    sleep 3
    
    # ตรวจสอบว่า process ยังทำงานอยู่หรือไม่
    if kill -0 $PID 2>/dev/null; then
        print_color "⚡ Force kill PID $PID ด้วย SIGKILL..." "red"
        kill -9 $PID
        sleep 1
    fi
    
    # ตรวจสอบอีกครั้ง
    if ! kill -0 $PID 2>/dev/null; then
        print_color "✅ Process PID $PID ถูก kill เรียบร้อยแล้ว" "green"
    else
        print_color "❌ ไม่สามารถ kill process PID $PID ได้" "red"
        return 1
    fi
}

# ฟังก์ชันเริ่มต้นแอปพลิเคชัน
start_app() {
    print_color "🚀 กำลังเริ่มต้น $APP_NAME บน port $PORT..." "blue"
    
    # ตรวจสอบว่ามี package.json หรือไม่
    if [ ! -f "package.json" ]; then
        print_color "❌ ไม่พบ package.json ในไดเรกทอรีปัจจุบัน" "red"
        return 1
    fi
    
    # เริ่มต้นแอปพลิเคชัน
    npm run dev -- --port $PORT &
    
    # รอให้แอปพลิเคชันเริ่มต้น
    sleep 3
    
    # ตรวจสอบว่าแอปพลิเคชันเริ่มต้นเรียบร้อยหรือไม่
    if check_port > /dev/null; then
        print_color "✅ $APP_NAME เริ่มต้นเรียบร้อยแล้วบน port $PORT" "green"
        print_color "🌐 เปิดในเบราว์เซอร์: http://localhost:$PORT" "blue"
    else
        print_color "❌ ไม่สามารถเริ่มต้น $APP_NAME ได้" "red"
        return 1
    fi
}

# ฟังก์ชัน restart แอปพลิเคชัน
restart_app() {
    print_color "🔄 กำลัง restart $APP_NAME..." "blue"
    
    # หยุด process ที่ใช้ port
    kill_port
    
    # รอสักครู่
    sleep 2
    
    # เริ่มต้นแอปพลิเคชันใหม่
    start_app
}

# ฟังก์ชันแสดงเมนู
show_menu() {
    echo ""
    print_color "=== 🛠️  Port Manager สำหรับ $APP_NAME (Port $PORT) ===" "blue"
    echo "1. ตรวจสอบ port"
    echo "2. Kill process ที่ใช้ port"
    echo "3. เริ่มต้นแอปพลิเคชัน"
    echo "4. Restart แอปพลิเคชัน"
    echo "5. ออกจากโปรแกรม"
    echo ""
}

# ฟังก์ชันหลัก
main() {
    # ถ้ามี argument เป็น command
    case $1 in
        "check")
            check_port
            ;;
        "kill")
            kill_port
            ;;
        "start")
            start_app
            ;;
        "restart")
            restart_app
            ;;
        "help"|"-h"|"--help")
            echo "การใช้งาน: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  check    - ตรวจสอบ process ที่ใช้ port $PORT"
            echo "  kill     - Kill process ที่ใช้ port $PORT"
            echo "  start    - เริ่มต้นแอปพลิเคชัน"
            echo "  restart  - Restart แอปพลิเคชัน"
            echo "  help     - แสดงวิธีการใช้งาน"
            echo ""
            echo "หากไม่ระบุ command จะเปิดเมนูโต้ตอบ"
            ;;
        "")
            # โหมดโต้ตอบ
            while true; do
                show_menu
                read -p "🎯 เลือกตัวเลือก (1-5): " choice
                
                case $choice in
                    1)
                        check_port
                        ;;
                    2)
                        kill_port
                        ;;
                    3)
                        start_app
                        ;;
                    4)
                        restart_app
                        ;;
                    5)
                        print_color "👋 ขอบคุณที่ใช้งาน Port Manager!" "green"
                        exit 0
                        ;;
                    *)
                        print_color "❌ กรุณาเลือกตัวเลือก 1-5" "red"
                        ;;
                esac
                
                echo ""
                read -p "⏸️  กด Enter เพื่อดำเนินการต่อ..."
            done
            ;;
        *)
            print_color "❌ Command ไม่ถูกต้อง: $1" "red"
            print_color "ใช้ '$0 help' เพื่อดูวิธีการใช้งาน" "yellow"
            exit 1
            ;;
    esac
}

# เรียกใช้ฟังก์ชันหลัก
main "$@" 
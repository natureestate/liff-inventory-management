#!/bin/bash

# Quick Port Management Script สำหรับ Port 3100
# ใช้สำหรับการดำเนินการเร็วๆ โดยไม่ต้องเปิดเมนู

PORT=3100

# ฟังก์ชัน quick kill port
quick_kill() {
    echo "🔄 กำลัง kill process ที่ใช้ port $PORT..."
    PID=$(lsof -ti tcp:$PORT)
    
    if [ -z "$PID" ]; then
        echo "✅ Port $PORT ว่างอยู่"
    else
        echo "⚡ Force killing PID: $PID"
        kill -9 $PID
        echo "✅ Process ถูก kill เรียบร้อยแล้ว"
    fi
}

# ฟังก์ชัน quick restart
quick_restart() {
    echo "🔄 Quick restart port $PORT..."
    
    # Kill process ที่ใช้ port
    PID=$(lsof -ti tcp:$PORT)
    if [ ! -z "$PID" ]; then
        echo "⚡ Killing PID: $PID"
        kill -9 $PID
        sleep 1
    fi
    
    # เริ่มต้นแอปพลิเคชันใหม่
    echo "🚀 Starting application on port $PORT..."
    npm run dev:3100 &
    echo "✅ Application started! Opening http://localhost:$PORT"
}

# ฟังก์ชัน quick check
quick_check() {
    PID=$(lsof -ti tcp:$PORT)
    
    if [ -z "$PID" ]; then
        echo "✅ Port $PORT ว่างอยู่"
    else
        echo "⚠️  Port $PORT ถูกใช้งานโดย PID: $PID"
        ps -p $PID -o pid,ppid,cmd
    fi
}

# เรียกใช้ฟังก์ชันตาม argument
case $1 in
    "kill"|"k")
        quick_kill
        ;;
    "restart"|"r")
        quick_restart
        ;;
    "check"|"c")
        quick_check
        ;;
    *)
        echo "🛠️  Quick Port Manager for Port $PORT"
        echo ""
        echo "Usage: $0 [action]"
        echo ""
        echo "Actions:"
        echo "  kill, k      - Quick kill process on port $PORT"
        echo "  restart, r   - Quick restart application on port $PORT"
        echo "  check, c     - Quick check port status"
        echo ""
        echo "Examples:"
        echo "  $0 kill      # Kill process on port $PORT"
        echo "  $0 k         # Same as above (short form)"
        echo "  $0 restart   # Kill and restart application"
        echo "  $0 r         # Same as above (short form)"
        echo "  $0 check     # Check port status"
        echo "  $0 c         # Same as above (short form)"
        ;;
esac 
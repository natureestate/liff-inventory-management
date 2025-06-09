#!/bin/bash

# Alias Commands สำหรับ Port Management
# เพิ่มไฟล์นี้เข้าไปใน .bashrc หรือ .zshrc เพื่อใช้ alias commands

# กำหนด path ของ project
PROJECT_PATH="/Users/macbooknow/linestock/liff-inventory"

# Port Management Aliases
alias p3100-check="cd $PROJECT_PATH && npm run check"
alias p3100-kill="cd $PROJECT_PATH && npm run kill"
alias p3100-restart="cd $PROJECT_PATH && npm run restart"
alias p3100-start="cd $PROJECT_PATH && npm run dev:3100"
alias p3100-manager="cd $PROJECT_PATH && npm run port:manager"

# Short Aliases
alias pcheck="cd $PROJECT_PATH && npm run check"
alias pkill="cd $PROJECT_PATH && npm run kill"
alias prestart="cd $PROJECT_PATH && npm run restart"
alias pstart="cd $PROJECT_PATH && npm run dev:3100"
alias pmanager="cd $PROJECT_PATH && npm run port:manager"

# Super Short Aliases
alias pc="cd $PROJECT_PATH && npm run check"
alias pk="cd $PROJECT_PATH && npm run kill"
alias pr="cd $PROJECT_PATH && npm run restart"
alias ps3100="cd $PROJECT_PATH && npm run dev:3100"

echo "🎯 Port Management Aliases สำหรับ LIFF Inventory"
echo ""
echo "📋 Available Aliases:"
echo ""
echo "🔍 การตรวจสอบ:"
echo "  p3100-check, pcheck, pc     - ตรวจสอบ port 3100"
echo ""
echo "⚡ การหยุด process:"
echo "  p3100-kill, pkill, pk       - Kill process ที่ใช้ port 3100"
echo ""
echo "🔄 การ restart:"
echo "  p3100-restart, prestart, pr - Restart แอปพลิเคชัน"
echo ""
echo "🚀 การเริ่มต้น:"
echo "  p3100-start, pstart, ps3100 - เริ่มต้นแอปพลิเคชันบน port 3100"
echo ""
echo "🛠️ การจัดการ:"
echo "  p3100-manager, pmanager     - เปิด Port Manager"
echo ""
echo "📝 วิธีการติดตั้ง aliases:"
echo "  echo 'source $PROJECT_PATH/scripts/aliases.sh' >> ~/.zshrc"
echo "  source ~/.zshrc" 
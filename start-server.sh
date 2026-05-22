#!/bin/bash
# 快速启动本地服务器脚本

echo "================================"
echo "启动静态应用本地服务器"
echo "================================"
echo ""

cd "$(dirname "$0")/static" || exit 1

echo "服务器启动在 http://localhost:8000"
echo "按 Ctrl+C 停止服务器"
echo ""

# 检查 Python 版本
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "错误：未找到 Python，请先安装 Python 3"
    exit 1
fi

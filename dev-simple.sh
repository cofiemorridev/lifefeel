#!/bin/bash

# Start API Gateway in background
echo "🚀 Starting API Gateway on port 4000..."
cd services/api-gateway
npm run dev &
GATEWAY_PID=$!

# Start Auth Service in background
echo "🔐 Starting Auth Service on port 4001..."
cd ../auth-service
npm run dev &
AUTH_PID=$!

echo ""
echo "✅ Services are starting up..."
echo "📡 API Gateway: http://localhost:4000"
echo "📡 Auth Service: http://localhost:4001"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait $GATEWAY_PID $AUTH_PID

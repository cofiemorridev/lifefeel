#!/bin/bash

# Start API Gateway
echo "Starting API Gateway..."
cd services/api-gateway
npm run dev &
GATEWAY_PID=$!

# Start Auth Service
echo "Starting Auth Service..."
cd ../auth-service
npm run dev &
AUTH_PID=$!

# Wait for user to press Ctrl+C
echo "Services are running. Press Ctrl+C to stop."
wait $GATEWAY_PID $AUTH_PID

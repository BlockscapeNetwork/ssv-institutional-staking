#!/bin/bash


# This script is used to run the application locally
echo "This script is designed to run on macOS"
echo "Make sure docker is running and you have the latest version of docker-compose installed"
echo ""
echo "Starting application..."
npm --prefix ./backend install ./backend >/dev/null 2>&1
npm --prefix ./ui install ./ui >/dev/null 2>&1
kill -9 $(lsof -ti:3000) >/dev/null 2>&1
kill -9 $(lsof -ti:3001) >/dev/null 2>&1
kill -9 $(lsof -ti:8080) >/dev/null 2>&1
(cd ./backend && docker-compose down) >/dev/null 2>&1
(cd ./backend && docker-compose up -d) >/dev/null 2>&1
(cd ./backend && npm run start:dev&)  >/dev/null 2>&1
(cd ./ui && npm run dev&) >/dev/null 2>&1
echo ""
echo "Application is running on http://localhost:8080/ssv-institutional-staking/stake"
echo ""

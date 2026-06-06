#!/bin/bash
# EngMate Backend Startup Script

echo "🚀 Starting EngMate Backend..."

# Activate virtual environment
source venv/bin/activate

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

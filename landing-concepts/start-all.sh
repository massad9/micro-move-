#!/bin/bash

# A helper script to start all 3 Vite instances simultaneously on different ports.

echo "Starting Design 1 (Elegant) on port 5174..."
cd design-1-elegant
npm run dev -- --port 5174 &
cd ..

echo "Starting Design 2 (Tech) on port 5175..."
cd design-2-tech
npm run dev -- --port 5175 &
cd ..

echo "Starting Design 3 (Creative) on port 5176..."
cd design-3-creative
npm run dev -- --port 5176 &
cd ..

echo "=================================================="
echo "All servers are starting in the background."
echo "Press Ctrl+C to stop them all."
echo "=================================================="

# Wait for all background processes to finish (which means forever, until Ctrl+C)
wait

#!/bin/bash

# Install dependencies with flags to ensure optional deps are installed
npm ci --legacy-peer-deps --force 2>/dev/null || npm install --legacy-peer-deps --force

# Build the project
npm run build

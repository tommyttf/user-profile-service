# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production --ignore-scripts

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Run migrations
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

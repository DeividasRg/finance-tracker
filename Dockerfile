# 1. Base image
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy files and install deps
COPY package*.json ./
RUN npm install

# 4. Copy rest of the code
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Use a lightweight image for the final container
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 7. Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 8. Start the app
CMD ["npm", "start"]

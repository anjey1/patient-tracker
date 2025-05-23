# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install pnpm globally in production stage
RUN npm install -g pnpm

# Copy only necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

ENV NODE_ENV=production
EXPOSE $PORT

CMD ["npm", "start"]
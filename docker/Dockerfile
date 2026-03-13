# Use official Bun image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS install
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Development image
FROM install AS dev
COPY . .
# Set metadata
ENV NODE_ENV=development
EXPOSE 3000

# Production image
FROM base AS release
COPY --from=install /app/node_modules ./node_modules
COPY . .

# Set metadata
ENV NODE_ENV=production
EXPOSE 3000

# Bun runs TypeScript directly, no build step needed
CMD ["bun", "run", "src/index.ts"]

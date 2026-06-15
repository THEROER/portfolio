# syntax=docker/dockerfile:1.7

# Builder stage
FROM oven/bun:1.3.5-slim AS builder
WORKDIR /app

# Native build deps some transitive packages need to compile.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Install deps first for layer caching. The UI kit is vendored (vendor/), and
# package.json references it via "file:./vendor/leavepulse-ui", so the vendor
# dir must be present before install — no private registry / token needed.
COPY package.json bun.lock ./
COPY vendor ./vendor
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Runtime stage
FROM oven/bun:1.3.5-slim
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]

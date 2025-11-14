# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy everything (simple & robust)
COPY . .

# Install deps respecting your lockfile
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

# Build Angular (no extra 'ng' token when specifying package)
ARG CONFIG=production
ARG BASE_HREF=/
RUN npx -y @angular/cli@latest build --configuration=${CONFIG} --base-href=${BASE_HREF}

# Normalize build output to /app/site regardless of Angular version/layout
# (works for dist/, dist/<project>/, dist/<project>/browser, etc.)
RUN set -eux; \
  mkdir -p /app/site; \
  if [ -f dist/index.html ]; then \
    echo "Found index at dist/index.html"; \
    cp -R dist/. /app/site/; \
  else \
    found="$(find dist -type f -name index.html | head -n 1)"; \
    if [ -z "$found" ]; then echo "ERROR: index.html not found under dist/"; exit 1; fi; \
    srcdir="$(dirname "$found")"; \
    echo "Using built site from: $srcdir"; \
    cp -R "$srcdir/." /app/site/; \
  fi

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine
# Copy your repo's nginx.conf (adjust path if you keep it elsewhere)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Serve the normalized site
COPY --from=build /app/site/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#!/bin/bash

echo "🧹 Auto cleaning project before push..."

# 1. Hapus folder app/ kalau ada
if [ -d "app" ]; then
  rm -rf app
  echo "✅ Folder app/ dihapus"
else
  echo "ℹ️ Tidak ada folder app/"
fi

# 2. Fix next.config.js
cat > next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config;
  },
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
EOF
echo "✅ next.config.js difix (disable turbopack)"

# 3. Fix package.json scripts
tmpfile=$(mktemp)
jq '.scripts = {
  "dev": "next dev -p 3000",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}' package.json > "$tmpfile" && mv "$tmpfile" package.json
echo "✅ package.json script difix"

# 4. Git add, commit, push
git add .
git commit -m "chore: auto-clean fix before deploy" || echo "ℹ️ Tidak ada perubahan untuk commit"
git push origin main --force

echo "🚀 Done! Sekarang coba redeploy di Vercel"

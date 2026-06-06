# Railway Frontend Deployment Guide

## Environment Variable

### ✅ Variable Name: `VITE_BACKEND_URL`

Berdasarkan code di `frontend/src/context/EngMateContext.jsx`:
```javascript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';
```

## Railway Setup Steps

### 1. Create New Service untuk Frontend

Di Railway Dashboard:
1. Click "New" → "Service"
2. Select "GitHub Repo"
3. Choose repository: `abeachmad/engmate`
4. Set Root Directory: `/frontend`

### 2. Set Environment Variables

Set variable ini di Railway Dashboard → Variables:

```bash
VITE_BACKEND_URL=https://your-backend-url.railway.app
```

**PENTING**: 
- Ganti `your-backend-url.railway.app` dengan URL backend yang sudah deploy
- **JANGAN** tambahkan `/api` di akhir URL (code sudah handle otomatis)
- URL harus lengkap dengan `https://`

### 3. Railway Configuration

Railway akan auto-detect Vite project. Tapi untuk memastikan, buat file konfigurasi:

#### Create: `frontend/railway.toml`
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run preview"
healthcheckPath = "/"
healthcheckTimeout = 100
```

**Atau** gunakan build output static:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run build && npx serve -s dist -l $PORT"
```

### 4. Verify Build Settings

Check `frontend/package.json` scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --host 0.0.0.0 --port $PORT"
  }
}
```

**Note**: Railway akan set `PORT` environment variable otomatis.

## Deployment Options

### Option 1: Vite Preview (Recommended untuk testing)
```toml
startCommand = "npm run preview -- --host 0.0.0.0 --port $PORT"
```

**Pros**: 
- Simple setup
- Fast deployment

**Cons**: 
- Not recommended for production (Vite preview mode)

### Option 2: Static Serve (Recommended untuk production)
```toml
startCommand = "npm run build && npx serve -s dist -l $PORT"
```

**Pros**: 
- Production-ready
- Static file serving
- Better performance

**Cons**: 
- Slightly longer build time

### Option 3: Nginx (Most production-ready)
Requires custom Dockerfile:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variable Examples

### Development (Local)
```bash
VITE_BACKEND_URL=http://localhost:8000
```

### Production (Railway)
```bash
VITE_BACKEND_URL=https://engmate-backend-production.up.railway.app
```

**Format**: `https://{your-backend-service-name}.up.railway.app`

## Update Backend CORS

Setelah frontend deploy, update environment variable di **Backend Service**:

```bash
CORS_ORIGINS=https://your-frontend-url.railway.app
```

Atau untuk multiple origins:
```bash
CORS_ORIGINS=https://your-frontend-url.railway.app,https://custom-domain.com
```

## Verification Steps

### 1. Check Build Logs
Di Railway Dashboard → Deployment → Logs:
```
✓ npm install
✓ npm run build
✓ Vite build completed
✓ Starting preview server
```

### 2. Check Environment Variables
Di Railway Dashboard → Variables:
```
VITE_BACKEND_URL = https://engmate-backend-xxx.up.railway.app
```

### 3. Test Frontend
Open frontend URL:
```
https://your-frontend-url.railway.app
```

### 4. Test API Connection
Open browser console (F12) dan cek:
- Network tab harus show requests ke backend URL
- No CORS errors
- API responses successful

## Common Issues

### Issue 1: CORS Error
**Error**: `Access to XMLHttpRequest ... has been blocked by CORS policy`

**Fix**: Update backend `CORS_ORIGINS`:
```bash
# Backend service environment variables
CORS_ORIGINS=https://your-frontend-url.railway.app
```

### Issue 2: 404 on Routes (SPA)
**Error**: Refresh page gives 404

**Fix**: Add `_redirects` file for static hosting:
```
# frontend/public/_redirects
/*    /index.html   200
```

Or configure nginx:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Issue 3: Environment Variable Not Working
**Error**: `VITE_BACKEND_URL is undefined`

**Fix**: 
- Variable MUST start with `VITE_`
- Set in Railway Dashboard → Variables
- Redeploy after setting variable

### Issue 4: Build Fails - Out of Memory
**Error**: `JavaScript heap out of memory`

**Fix**: Add to `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
  }
}
```

## Quick Start Checklist

- [ ] Create new Railway service for frontend
- [ ] Set root directory to `/frontend`
- [ ] Set `VITE_BACKEND_URL` environment variable
- [ ] Create `frontend/railway.toml` config
- [ ] Deploy and check build logs
- [ ] Update backend `CORS_ORIGINS`
- [ ] Test frontend → backend connection
- [ ] Verify all API calls work

## File Structure

```
frontend/
├── railway.toml           # Railway config (create this)
├── package.json           # Check scripts
├── vite.config.js         # Vite config
├── .env.example          # Development example
├── .env.production.example  # Production example
└── src/
    └── context/
        └── EngMateContext.jsx  # Uses VITE_BACKEND_URL
```

## Next Steps

1. **Get Backend URL**
   ```
   Backend Railway URL: https://engmate-backend-xxx.up.railway.app
   ```

2. **Set Frontend Variable**
   ```bash
   VITE_BACKEND_URL=https://engmate-backend-xxx.up.railway.app
   ```

3. **Deploy Frontend**
   - Railway auto-deploys from GitHub push
   - Or manual deploy from Dashboard

4. **Update Backend CORS**
   ```bash
   CORS_ORIGINS=https://engmate-frontend-xxx.up.railway.app
   ```

5. **Test Everything**
   - Open frontend URL
   - Try login/register
   - Check API calls in Network tab

## Custom Domain (Optional)

Di Railway Dashboard → Settings → Domains:
1. Add custom domain
2. Update DNS records
3. Update `CORS_ORIGINS` di backend

---

**Ready to deploy!** 🚀

# Railway Domain & Port Configuration

## Port Configuration

### ❗ JANGAN Hardcode Port!

Railway menggunakan **dynamic port allocation**. Port di-inject via environment variable `$PORT`.

### Frontend Port Configuration

#### ✅ Current Setup (CORRECT)
```toml
# frontend/railway.toml
[deploy]
startCommand = "npm run build && npx serve -s dist -l $PORT"
```

**`$PORT`** adalah environment variable yang Railway inject otomatis (biasanya random port seperti 3001, 8080, dll).

#### ❌ WRONG - Hardcoded Port
```toml
# DON'T DO THIS!
startCommand = "npm run build && npx serve -s dist -l 8080"
```

### Backend Port Configuration

Backend juga menggunakan `$PORT`:
```toml
# backend/railway.toml
[deploy]
startCommand = "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
```

## Domain Generation di Railway

### Automatic Domain (Default)

Railway otomatis generate domain saat deploy berhasil:
```
Format: https://{service-name}-{environment}-{random}.up.railway.app
Example: https://engmate-frontend-production-abc123.up.railway.app
```

### Manual Domain Generation

Jika domain tidak otomatis muncul:

#### Option 1: Via Railway Dashboard (Recommended)

1. **Open Service**
   - Railway Dashboard → Select your service (Frontend atau Backend)

2. **Go to Settings**
   - Click "Settings" tab di sidebar

3. **Generate Domain**
   - Scroll ke "Networking" section
   - Click "Generate Domain" button
   - Railway akan create: `{service-name}.up.railway.app`

4. **Custom Domain (Optional)**
   - Di section yang sama, click "Add Custom Domain"
   - Enter your domain: `engmate.com`
   - Railway akan kasih DNS records untuk di-setup

#### Option 2: Via Railway CLI

Install Railway CLI:
```bash
npm i -g @railway/cli
```

Login dan link project:
```bash
railway login
railway link
```

Generate domain:
```bash
railway domain
```

### Service Configuration for Public Access

Pastikan service exposed ke public:

#### Check in Dashboard:
1. Service → Settings
2. "Networking" section
3. Pastikan "Public Networking" enabled
4. Port harus detected atau set manual

#### Set Port Explicitly (if needed):
Di Railway Dashboard → Service → Settings → Networking:
- **Public Port**: Leave as automatic (Railway detects from `$PORT`)
- Atau set manual jika Railway tidak detect

## Complete Setup Flow

### 1. Deploy Service

```bash
# Push ke GitHub, Railway auto-deploy
git push origin main
```

### 2. Wait for Build & Deploy

Di Railway Dashboard → Deployment tab:
- ✅ Build success
- ✅ Deploy success
- ✅ Healthcheck pass

### 3. Generate Domain

**Method A: Automatic**
- Railway auto-generate domain setelah deploy success
- Check di Settings → Networking → Domains

**Method B: Manual**
- Settings → Networking → "Generate Domain"
- Domain akan muncul setelah generate

### 4. Copy Domain URL

Format:
```
https://engmate-frontend-production.up.railway.app
```

### 5. Update Environment Variables

#### Frontend Service:
```bash
VITE_BACKEND_URL=https://engmate-backend-production.up.railway.app
```

#### Backend Service:
```bash
CORS_ORIGINS=https://engmate-frontend-production.up.railway.app
```

### 6. Redeploy (if needed)

Jika update environment variables:
- Railway Dashboard → Service
- Click "Deploy" → "Redeploy"

## Troubleshooting

### Issue 1: Domain Tidak Muncul

**Possible Causes**:
- Deploy belum selesai
- Healthcheck failed
- Public networking tidak enabled

**Fix**:
1. Check deployment logs - pastikan success
2. Check healthcheck - pastikan pass
3. Settings → Networking → Enable "Public Networking"
4. Click "Generate Domain"

### Issue 2: Service Tidak Accessible

**Check**:
```bash
curl https://your-domain.up.railway.app
```

**If timeout**:
- Port tidak bound correctly
- Check logs: `Error: listen EADDRINUSE`
- Pastikan `$PORT` digunakan di startCommand

**Fix**:
```toml
# Pastikan gunakan $PORT
startCommand = "... -l $PORT"  # Frontend (serve)
startCommand = "... --port $PORT"  # Backend (uvicorn)
```

### Issue 3: Port Already in Use

**Error**: `EADDRINUSE: address already in use`

**Cause**: Hardcoded port atau multiple processes

**Fix**:
- Gunakan `$PORT` environment variable
- Pastikan hanya 1 process running
- Check `railway.toml` startCommand

### Issue 4: Custom Domain Not Working

**Steps**:
1. Add custom domain di Railway Dashboard
2. Copy DNS records yang Railway kasih
3. Update di domain registrar (Cloudflare, Namecheap, dll)
4. Wait for DNS propagation (up to 48 hours, usually 5-10 minutes)

## Port Configuration Summary

| Service | Development | Production (Railway) |
|---------|-------------|----------------------|
| **Frontend** | Port 3000 (vite.config.js) | `$PORT` (dynamic) |
| **Backend** | Port 8000 (default FastAPI) | `$PORT` (dynamic) |

### Key Points

✅ **DO**:
- Use `$PORT` in Railway startCommand
- Let Railway assign port dynamically
- Generate domain from Dashboard
- Enable public networking

❌ **DON'T**:
- Hardcode port numbers in production config
- Assume port will be 8080 or 3000
- Skip domain generation step
- Forget to update CORS after getting domains

## Quick Checklist for Domain Setup

### Backend Service:
- [ ] Service deployed successfully
- [ ] Go to Settings → Networking
- [ ] Click "Generate Domain" (if not auto-generated)
- [ ] Copy domain URL: `https://backend-xxx.up.railway.app`
- [ ] Save for frontend setup

### Frontend Service:
- [ ] Service deployed successfully
- [ ] Go to Settings → Networking  
- [ ] Click "Generate Domain" (if not auto-generated)
- [ ] Copy domain URL: `https://frontend-xxx.up.railway.app`
- [ ] Set in backend CORS_ORIGINS

### Cross-Service Setup:
- [ ] Update Frontend env: `VITE_BACKEND_URL={backend-domain}`
- [ ] Update Backend env: `CORS_ORIGINS={frontend-domain}`
- [ ] Redeploy both services (if env changed)
- [ ] Test: Open frontend URL → Try API calls

## Example: Complete URL Setup

```bash
# After deploying both services, you'll have:

# Backend Domain (generated by Railway)
https://engmate-backend-production.up.railway.app

# Frontend Domain (generated by Railway)  
https://engmate-frontend-production.up.railway.app

# Set in Frontend Service:
VITE_BACKEND_URL=https://engmate-backend-production.up.railway.app

# Set in Backend Service:
CORS_ORIGINS=https://engmate-frontend-production.up.railway.app

# Test:
# 1. Open: https://engmate-frontend-production.up.railway.app
# 2. Try register/login
# 3. Check Network tab - API calls to backend should work
```

## Custom Domain Setup (Optional)

### 1. Add Custom Domain in Railway

Backend:
```
api.engmate.com → Railway backend service
```

Frontend:
```
app.engmate.com → Railway frontend service
```

### 2. Update DNS Records

Di domain registrar (Cloudflare, etc):
```
Type: CNAME
Name: api
Value: engmate-backend-production.up.railway.app
```

```
Type: CNAME  
Name: app
Value: engmate-frontend-production.up.railway.app
```

### 3. Update Environment Variables

```bash
# Frontend
VITE_BACKEND_URL=https://api.engmate.com

# Backend
CORS_ORIGINS=https://app.engmate.com
```

---

**Kesimpulan**: 
- ✅ Port: Gunakan `$PORT` (Railway dynamic)
- ✅ Domain: Generate di Dashboard → Settings → Networking
- ✅ Tidak perlu hardcode port 8080 atau port lainnya

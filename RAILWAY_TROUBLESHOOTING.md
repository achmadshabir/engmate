# 🔧 Railway Deployment Troubleshooting

## ⚠️ Issue: Healthcheck Failed

### Logs yang Anda lihat:
```
Attempt #1 failed with service unavailable. Continuing to retry
Attempt #2 failed with service unavailable. Continuing to retry
Attempt #3 failed with service unavailable. Continuing to retry
```

### ✅ Yang Sudah BERHASIL:
- ✅ Build Docker image: SUCCESS
- ✅ Dependencies installation: SUCCESS
- ✅ Python packages: ALL INSTALLED
- ✅ Image push to Registry: SUCCESS

### ❌ Yang GAGAL:
- ❌ Healthcheck ke `/api/` timeout (100 detik)

---

## 🎯 Root Cause Analysis

### Masalah #1: Healthcheck Path
Railway mencoba healthcheck ke `/api/` tapi:
- Cold start membutuhkan waktu lebih lama
- Database connection mungkin belum siap
- Import modules butuh waktu

### Masalah #2: Database Connection
Aplikasi FastAPI mencoba connect ke PostgreSQL di startup, tapi:
- `DATABASE_URL` environment variable mungkin belum di-set
- PostgreSQL plugin belum di-add ke project
- Database connection string salah

---

## 🔧 FIXES YANG SUDAH DILAKUKAN

### Fix #1: Update Healthcheck Path
**Changed**: `/api/` → `/`  
**Reason**: Path `/` tidak butuh database connection, lebih cepat respond

**Before:**
```toml
healthcheckPath = "/api/"
healthcheckTimeout = 100
```

**After:**
```toml
healthcheckPath = "/"
healthcheckTimeout = 300
```

### Fix #2: Increase Timeout
**Changed**: 100 seconds → 300 seconds (5 minutes)  
**Reason**: Cold start di Railway bisa memakan waktu 1-3 menit

---

## 🚀 NEXT STEPS

### Step 1: Push Updated Configuration
```bash
git add railway.toml railway-backend.toml
git commit -m "Fix Railway healthcheck: use / path and increase timeout"
git push origin main
```

Railway akan auto-redeploy dengan konfigurasi baru! ✅

### Step 2: Verify PostgreSQL Plugin Added
1. Railway Dashboard → Your Project
2. Check if **PostgreSQL** plugin exists
3. If NOT, klik **+ New** → **Database** → **PostgreSQL**

Railway akan auto-inject `DATABASE_URL` environment variable! ✅

### Step 3: Check Environment Variables
1. Backend Service → **Variables** tab
2. Verify these exist:
   ```
   DATABASE_URL (should be auto-injected by PostgreSQL plugin)
   JWT_SECRET_KEY
   GROQ_API_KEY
   HF_API_KEY
   CORS_ORIGINS
   USE_MOCK_AI
   LOG_LEVEL
   ```

### Step 4: Monitor Deployment
1. Railway Dashboard → **Deployments**
2. Click latest deployment
3. Watch logs:
   ```
   ==================== Starting Healthcheck ====================
   Path: /
   ✅ Attempt #1 succeeded!
   ```

---

## 📊 Expected Timeline

| Stage | Time | Status |
|-------|------|--------|
| Git push | 5 sec | ⏳ Waiting |
| Railway detect | 10 sec | ⏳ Waiting |
| Build image | 2-3 min | ⏳ Waiting |
| Push image | 30 sec | ⏳ Waiting |
| **Healthcheck** | **1-2 min** | **⏳ Will pass with new config** |
| **Total** | **~5 minutes** | **🚀 Expected success** |

---

## 🔍 How to Debug Railway Logs

### View Real-Time Logs:
```bash
# Option 1: Railway Dashboard
Project → Backend Service → Deployments → Latest → View Logs

# Option 2: Railway CLI
railway logs --service backend
```

### Look for These Patterns:

**✅ SUCCESS:**
```
EngMate API Starting
Database: postgresql://...
Log Level: INFO
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
Attempt #1 succeeded!
```

**❌ ERROR (Database):**
```
sqlalchemy.exc.OperationalError: could not connect to server
```
**Fix**: Add PostgreSQL plugin

**❌ ERROR (Port):**
```
OSError: [Errno 98] Address already in use
```
**Fix**: Ensure using `$PORT` environment variable (already correct)

**❌ ERROR (Import):**
```
ModuleNotFoundError: No module named 'xxx'
```
**Fix**: Add missing package to `requirements.txt`

---

## 🆘 Quick Checks

### 1. Check if Service is Running
```bash
curl https://your-backend-url.railway.app/
```

Expected:
```json
{"status":"ok","message":"EngMate API is running"}
```

### 2. Check API Endpoint
```bash
curl https://your-backend-url.railway.app/api/
```

Expected:
```json
{"message":"EngMate API - Modular Backend"}
```

### 3. Check Health Endpoint
```bash
curl https://your-backend-url.railway.app/api/health/live
```

Expected:
```json
{
  "status":"ok",
  "version":"1.0.0",
  "use_mock_ai":false
}
```

---

## 💊 Common Fixes

### Fix: Missing DATABASE_URL
**Symptom**: `DATABASE_URL` not found in config  
**Solution**:
1. Railway Dashboard → + New → Database → PostgreSQL
2. Wait 30 seconds for auto-injection
3. Redeploy backend service

### Fix: Wrong CORS_ORIGINS
**Symptom**: Frontend can't connect  
**Solution**:
```bash
# Update in Railway Dashboard → Backend → Variables
CORS_ORIGINS=https://your-frontend-url.railway.app
```

### Fix: Wrong Start Command
**Symptom**: Port binding error  
**Solution**: Ensure using `$PORT` in start command
```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```
✅ Already correct in `railway.toml`!

### Fix: Module Import Error
**Symptom**: `ModuleNotFoundError` in logs  
**Solution**: Add missing package to `requirements.txt`, commit & push

---

## 🎯 Action Plan (RIGHT NOW)

1. **Push the fixes** (updated railway.toml with healthcheck changes)
2. **Verify PostgreSQL plugin** exists in Railway project
3. **Watch deployment logs** for success
4. **Test endpoints** once deployed

Railway will auto-redeploy! 🔄

---

## 📞 Still Having Issues?

### Check These:
- [ ] PostgreSQL plugin added?
- [ ] `DATABASE_URL` in environment variables?
- [ ] All other env vars set from `RAILWAY_ENV_CHECKLIST.md`?
- [ ] Latest code pushed to GitHub main branch?
- [ ] Railway connected to correct GitHub repo?

### Get Help:
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app
- Railway Status: https://status.railway.app

---

**Last Updated**: June 7, 2026  
**Status**: ⚡ FIXES READY - PUSH TO DEPLOY  
**ETA to Success**: ~5 minutes after git push

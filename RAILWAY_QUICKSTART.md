# 🚂 Railway Quick Start

## 3-Step Deployment

### 1️⃣ Create Project
```
Railway Dashboard → New Project → Deploy from GitHub → Select engmate repo
```

### 2️⃣ Add Database
```
Project → + New → Database → PostgreSQL
```
✅ `DATABASE_URL` auto-injected!

### 3️⃣ Set Environment Variables
```bash
# Generate secret key first
python generate_secret.py

# Add to Railway Variables:
JWT_SECRET_KEY=<generated-secret>
CORS_ORIGINS=https://your-frontend.vercel.app
USE_MOCK_AI=false
GROQ_API_KEY=<your-groq-key>
```

## 🎯 That's it!

Railway auto-handles:
- ✅ Python detection
- ✅ Dependencies installation
- ✅ Port configuration
- ✅ Health checks
- ✅ Auto-deploy on git push
- ✅ HTTPS certificate
- ✅ Database connection

## 📝 Files Railway Uses

- `railway.toml` - Railway config
- `nixpacks.toml` - Build config
- `Procfile` - Start command
- `requirements.txt` - Dependencies
- `runtime.txt` - Python version

## 🔗 Get Backend URL

After deploy: `https://engmate-production-xxxx.up.railway.app`

Update frontend `.env`:
```
VITE_API_URL=https://your-railway-url.up.railway.app
```

## 📚 Full Guide

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed documentation.

## 🆘 Quick Fixes

**Build failed?**
```bash
# Check Railway logs for errors
# Most common: DATABASE_URL not set (add PostgreSQL plugin)
```

**CORS error?**
```bash
# Update CORS_ORIGINS with correct frontend URL
CORS_ORIGINS=https://your-actual-frontend-url.com
```

**Health check failed?**
```bash
# Ensure /api/ endpoint is accessible
curl https://your-railway-url.up.railway.app/api/
```

---

**Ready to deploy?** → [Railway Dashboard](https://railway.app/dashboard) 🚀

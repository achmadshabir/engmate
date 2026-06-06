# 🚂 EngMate Railway Deployment Guide

Panduan lengkap untuk deploy EngMate backend ke Railway dengan konfigurasi otomatis.

## 📋 Prerequisites

1. Akun Railway (https://railway.app)
2. Repository GitHub sudah connected
3. API Keys yang diperlukan:
   - Hugging Face API Key (optional jika USE_MOCK_AI=true)
   - Groq API Key (optional jika USE_MOCK_AI=true)

## 🚀 Quick Deploy (3 Langkah)

### Step 1: Create New Project di Railway

1. Login ke Railway Dashboard
2. Klik **"New Project"**
3. Pilih **"Deploy from GitHub repo"**
4. Select: `abeachmad/engmate`
5. Railway akan otomatis detect Python project

### Step 2: Add PostgreSQL Database

1. Di Project Dashboard, klik **"+ New"**
2. Pilih **"Database"** → **"Add PostgreSQL"**
3. Railway akan otomatis:
   - Create PostgreSQL instance
   - Generate DATABASE_URL
   - Inject DATABASE_URL ke environment variables

### Step 3: Set Environment Variables

Di Railway Dashboard → **"Variables"**, tambahkan:

#### Required Variables:

```bash
# JWT Secret (Generate random string)
JWT_SECRET_KEY=<generate-strong-random-key>

# CORS Origins (Your frontend URL)
CORS_ORIGINS=https://your-frontend-url.vercel.app

# AI Mode (set true untuk development)
USE_MOCK_AI=false
```

#### Optional API Keys (jika USE_MOCK_AI=false):

```bash
# Groq API (Recommended - Free tier: 14,400 requests/day)
GROQ_API_KEY=<your-groq-api-key>
GROQ_MODEL_ID=llama-3.1-8b-instant

# Hugging Face API (for ASR/TTS)
HF_API_KEY=<your-hf-api-key>
HF_API_BASE_URL=https://api-inference.huggingface.co
HF_ASR_MODEL_ID=openai/whisper-large-v3-turbo
HF_TTS_MODEL_ID=facebook/mms-tts-eng
```

#### System Variables (Optional):

```bash
LOG_LEVEL=INFO
PYTHON_VERSION=3.10
```

## 🔧 Konfigurasi Files yang Sudah Disiapkan

Railway akan otomatis membaca files berikut:

### 1. `railway.toml` - Railway Configuration
```toml
[build]
builder = "NIXPACKS"
buildCommand = "cd backend && pip install -r requirements.txt"

[deploy]
startCommand = "cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/api/"
```

### 2. `nixpacks.toml` - Build Configuration
Mengatur Python version dan dependencies installation.

### 3. `Procfile` - Process Definition
```
web: cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### 4. `backend/requirements.txt` - Python Dependencies
Railway akan otomatis install semua dependencies.

## 📊 Automatic Features

Railway akan otomatis:

✅ **Detect Python**: Dari `requirements.txt`  
✅ **Install Dependencies**: `pip install -r requirements.txt`  
✅ **Set PORT**: Environment variable `$PORT`  
✅ **Database URL**: Dari PostgreSQL plugin → `${{Postgres.DATABASE_URL}}`  
✅ **Health Checks**: Endpoint `/api/`  
✅ **Auto Restart**: On failure dengan retry policy  
✅ **HTTPS**: SSL certificate otomatis  
✅ **Custom Domain**: Support custom domain  

## 🔗 After Deployment

### 1. Get Your Backend URL

Railway akan generate URL seperti:
```
https://engmate-backend-production.up.railway.app
```

### 2. Test API

```bash
# Health check
curl https://your-railway-url.up.railway.app/api/

# Response should be:
# {"message": "EngMate API - Modular Backend"}
```

### 3. Run Database Migrations

Di Railway Dashboard → **"Deployments"** → Klik deployment terbaru → **"View Logs"**

Atau manual via Railway CLI:
```bash
railway run cd backend && alembic upgrade head
```

### 4. Update Frontend

Update environment variable di frontend (Vercel):
```env
VITE_API_URL=https://your-railway-url.up.railway.app
```

## 📱 Railway CLI (Optional)

Install Railway CLI untuk management lebih mudah:

```bash
# Install
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Run migrations
railway run cd backend && alembic upgrade head

# Open dashboard
railway open
```

## 🔒 Environment Variables Reference

### Minimal Configuration (Development):

```bash
DATABASE_URL=<auto-provided-by-postgresql-plugin>
JWT_SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:3000
USE_MOCK_AI=true
LOG_LEVEL=INFO
```

### Production Configuration:

```bash
DATABASE_URL=<auto-provided-by-postgresql-plugin>
JWT_SECRET_KEY=<strong-random-secret>
CORS_ORIGINS=https://your-frontend.vercel.app
USE_MOCK_AI=false
GROQ_API_KEY=<your-groq-key>
GROQ_MODEL_ID=llama-3.1-8b-instant
HF_API_KEY=<your-hf-key>
HF_API_BASE_URL=https://api-inference.huggingface.co
HF_ASR_MODEL_ID=openai/whisper-large-v3-turbo
HF_TTS_MODEL_ID=facebook/mms-tts-eng
LOG_LEVEL=INFO
PYTHON_VERSION=3.10
```

## 🐛 Troubleshooting

### Build Fails

**Issue**: `requirements.txt` not found  
**Solution**: Pastikan Railway root directory pointing ke repository root, bukan `/backend`

**Issue**: Python version mismatch  
**Solution**: Set `PYTHON_VERSION=3.10` di environment variables

### Database Connection Error

**Issue**: `DATABASE_URL` not set  
**Solution**: Add PostgreSQL plugin dari Railway Dashboard

**Issue**: Connection timeout  
**Solution**: Check PostgreSQL plugin status, restart jika perlu

### Port Issues

**Issue**: Application not responding  
**Solution**: Pastikan app bind ke `0.0.0.0:$PORT` (Railway provides PORT env)

### CORS Errors

**Issue**: Frontend can't access API  
**Solution**: Update `CORS_ORIGINS` dengan frontend URL yang benar

## 📈 Monitoring

Railway Dashboard provides:

- **Deployments**: History & logs
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Settings**: Environment variables, domains, etc.

## 💰 Pricing

Railway Free Tier includes:
- $5 credit/month
- Unlimited projects
- 512MB RAM
- Shared CPU
- 1GB Disk

Hobby Plan ($5/month):
- $5 base + usage
- 8GB RAM
- Shared vCPU
- 100GB Disk

## 🔄 Auto Deploy

Railway automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Railway will:
1. Detect push to main branch
2. Pull latest code
3. Run build command
4. Deploy new version
5. Health check
6. Switch traffic to new deployment

## 🎯 Best Practices

1. **Environment Variables**: Never commit secrets, use Railway Variables
2. **Database Migrations**: Run after deployment via Railway CLI
3. **Health Checks**: Maintain `/api/` endpoint for health checks
4. **Logging**: Use structured logging with LOG_LEVEL
5. **Error Handling**: Railway auto-restarts on failure
6. **Monitoring**: Check Railway metrics regularly

## 🆘 Support

- Railway Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/railwayapp/railway/issues

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Railway project created
- [ ] PostgreSQL plugin added
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] API health check passes
- [ ] Frontend updated with Railway URL
- [ ] CORS configured correctly
- [ ] Custom domain configured (optional)
- [ ] Monitoring alerts set (optional)

---

**Last Updated**: December 2024  
**Railway Version**: v2  
**Python Version**: 3.10+

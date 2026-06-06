# 🚂 EngMate Railway Deployment Guide

Panduan lengkap untuk deploy **Backend + Frontend** EngMate ke Railway dalam satu project dengan konfigurasi otomatis.

## 📋 Prerequisites

1. Akun Railway (https://railway.app)
2. Repository GitHub sudah connected
3. API Keys yang diperlukan:
   - Groq API Key (untuk LLM)
   - Hugging Face API Key (untuk ASR/TTS)

---

## 🏗️ Architecture Overview

Railway akan host **2 services** dalam 1 project:

```
┌─────────────────────────────────────┐
│     Railway Project: EngMate        │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Service 1: Backend         │   │
│  │  - FastAPI                  │   │
│  │  - Python 3.10              │   │
│  │  - Port: $PORT              │   │
│  │  - URL: backend.railway.app │   │
│  └─────────────────────────────┘   │
│             │                       │
│             ├─ PostgreSQL Plugin    │
│             │                       │
│  ┌─────────────────────────────┐   │
│  │  Service 2: Frontend        │   │
│  │  - React + Vite             │   │
│  │  - Node.js                  │   │
│  │  - Port: $PORT              │   │
│  │  - URL: frontend.railway.app│   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🚀 Deployment Steps

### Part 1: Deploy Backend

#### Step 1: Create New Project

1. Login ke [Railway Dashboard](https://railway.app/dashboard)
2. Klik **"New Project"**
3. Pilih **"Deploy from GitHub repo"**
4. Select: `abeachmad/engmate`
5. Railway akan create service pertama (Backend)

#### Step 2: Configure Backend Service

1. Service akan auto-detect Python
2. Rename service: **"engmate-backend"**
3. Railway auto-configure:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app` (dari Procfile)

#### Step 3: Add PostgreSQL Database

1. Di Project Dashboard, klik **"+ New"**
2. Pilih **"Database"** → **"Add PostgreSQL"**
3. Railway akan otomatis:
   - Create PostgreSQL instance
   - Generate `DATABASE_URL`
   - Inject ke backend service

#### Step 4: Set Backend Environment Variables

1. Click Backend Service → **"Variables"** tab
2. Generate JWT secret:
   ```bash
   python generate_secret.py
   ```
3. Add variables:

```bash
# Required
JWT_SECRET_KEY=<generated-secret-key>
USE_MOCK_AI=false
LOG_LEVEL=INFO

# API Keys (untuk production)
GROQ_API_KEY=<your-groq-api-key>
GROQ_MODEL_ID=llama-3.1-8b-instant
HF_API_KEY=<your-huggingface-api-key>
HF_API_BASE_URL=https://api-inference.huggingface.co
HF_ASR_MODEL_ID=openai/whisper-large-v3-turbo
HF_TTS_MODEL_ID=facebook/mms-tts-eng

# CORS - Will update after frontend deployed
CORS_ORIGINS=*
```

**⚠️ Note**: Set `CORS_ORIGINS=*` dulu, akan diupdate setelah frontend deploy.

#### Step 5: Get Backend URL

1. Backend Service → **"Settings"** → **"Domains"**
2. Copy URL: `https://engmate-backend-production.up.railway.app`
3. Test:
   ```bash
   curl https://your-backend-url/api/
   ```

---

### Part 2: Deploy Frontend

#### Step 6: Add Frontend Service

1. Di Project Dashboard, klik **"+ New"**
2. Pilih **"GitHub Repo"**
3. Select: `abeachmad/engmate` (same repo)
4. Railway akan create service kedua

#### Step 7: Configure Frontend Service

1. Rename service: **"engmate-frontend"**
2. Set Root Directory: `/` (default)
3. Override commands:
   - **Build Command**: 
     ```bash
     cd frontend && npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     cd frontend && npm run preview -- --host 0.0.0.0 --port $PORT
     ```

Atau biarkan Railway auto-detect dari `package.json`.

#### Step 8: Set Frontend Environment Variables

1. Click Frontend Service → **"Variables"** tab
2. Add:

```bash
VITE_API_URL=https://your-backend-url.railway.app
```

Ganti dengan URL backend dari Step 5.

#### Step 9: Get Frontend URL

1. Frontend Service → **"Settings"** → **"Domains"**
2. Copy URL: `https://engmate-frontend-production.up.railway.app`
3. Open in browser untuk test

---

### Part 3: Final Configuration

#### Step 10: Update Backend CORS

1. Go to Backend Service → **"Variables"**
2. Update `CORS_ORIGINS`:
   ```bash
   CORS_ORIGINS=https://your-frontend-url.railway.app
   ```
3. Backend akan auto-redeploy

#### Step 11: Test End-to-End

1. Open frontend URL
2. Test semua features:
   - Welcome page
   - Dashboard
   - Live Conversation
   - Profile
3. Check browser console (no CORS errors)
4. Check Railway logs (both services)

---

## 📊 Railway Auto-Configuration

Railway automatically detects and configures:

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

Update environment variable di frontend (Railway):
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
CORS_ORIGINS=https://your-frontend.railway.app
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

# 🚂 Railway Quick Start

## Deploy Backend + Frontend ke Railway

Railway akan host **2 services** dalam 1 project:
1. **Backend** (FastAPI) - Port 8000
2. **Frontend** (React/Vite) - Port 3000

---

## 3-Step Deployment

### 1️⃣ Create Project & Deploy Backend

**A. Create New Project**
```
Railway Dashboard → New Project → Deploy from GitHub → Select engmate repo
```

**B. Configure as Backend Service**
```
Service Name: engmate-backend
Root Directory: / (keep default)
Start Command: cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**C. Add PostgreSQL**
```
Project → + New → Database → PostgreSQL
```
✅ `DATABASE_URL` auto-injected!

**D. Set Backend Environment Variables**
```bash
# Generate secret key first
python generate_secret.py

# Add to Railway Variables (Backend Service):
JWT_SECRET_KEY=<generated-secret>
USE_MOCK_AI=false
GROQ_API_KEY=<your-groq-key>
GROQ_MODEL_ID=llama-3.1-8b-instant
HF_API_KEY=<your-hf-key>
LOG_LEVEL=INFO
```

**⚠️ IMPORTANT: Set CORS_ORIGINS after frontend deployed!**

---

### 2️⃣ Deploy Frontend

**A. Add New Service**
```
Project → + New → GitHub Repo → Same engmate repo
```

**B. Configure as Frontend Service**
```
Service Name: engmate-frontend
Root Directory: / (keep default)
Build Command: cd frontend && npm install && npm run build
Start Command: cd frontend && npm run preview -- --host 0.0.0.0 --port $PORT
```

**C. Set Frontend Environment Variables**
```bash
# Add to Railway Variables (Frontend Service):
VITE_API_URL=https://<backend-service-url>.railway.app

# Get backend URL from Backend Service → Settings → Domains
```

---

### 3️⃣ Update Backend CORS

**A. Get Frontend URL**
```
Frontend Service → Settings → Domains
Copy: https://<frontend-service-url>.railway.app
```

**B. Update Backend Variables**
```bash
# Go to Backend Service → Variables → Edit
CORS_ORIGINS=https://<frontend-service-url>.railway.app
```

**C. Redeploy Backend**
```
Backend Service → Settings → Redeploy
```

---

## 🎯 That's it!

Railway auto-handles:
- ✅ Python & Node.js detection
- ✅ Dependencies installation
- ✅ Port configuration
- ✅ Health checks
- ✅ Auto-deploy on git push
- ✅ HTTPS certificate
- ✅ Database connection
- ✅ Internal networking between services

---

## 🔗 URLs After Deployment

### Backend:
```
https://engmate-backend-production.up.railway.app
```

### Frontend:
```
https://engmate-frontend-production.up.railway.app
```

### Test Backend:
```bash
curl https://your-backend-url.railway.app/api/
# Should return: {"message": "EngMate API - Modular Backend"}
```

### Test Frontend:
Open `https://your-frontend-url.railway.app` in browser

---

## 📝 Environment Variables Summary

### Backend Service:
```bash
DATABASE_URL=<auto-from-postgresql-plugin>
JWT_SECRET_KEY=<generated-secret>
CORS_ORIGINS=https://your-frontend-url.railway.app
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

### Frontend Service:
```bash
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🔄 Auto-Deploy on Git Push

Railway automatically deploys **both services** when you push:

```bash
git add .
git commit -m "Update code"
git push origin main
```

Both backend and frontend will redeploy! 🚀

---

## 🆘 Quick Fixes

**Frontend can't connect to backend?**
```bash
# Check CORS_ORIGINS in backend includes frontend URL
# Check VITE_API_URL in frontend is correct backend URL
```

**Build failed?**
```bash
# Backend: Check Railway logs, ensure requirements.txt exists
# Frontend: Check package.json scripts, ensure build command works
```

**Database error?**
```bash
# Add PostgreSQL plugin to project
# Check DATABASE_URL is injected to backend service
```

---

## 📚 Full Documentation

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for:
- Detailed step-by-step guide
- Troubleshooting
- Monitoring
- Custom domains
- CI/CD setup

---

## 💡 Pro Tips

1. **Link Services**: Railway auto-creates internal network between services
2. **Use Service Names**: Can use `${{RAILWAY_BACKEND_URL}}` in frontend
3. **Preview Deployments**: Railway creates preview for each PR
4. **Custom Domains**: Free HTTPS for custom domains
5. **Monitor Costs**: Check usage in Project Settings

---

**Ready to deploy?** → [Railway Dashboard](https://railway.app/dashboard) 🚀

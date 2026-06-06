# Provider Import Fix - Railway Deployment

## Masalah yang Ditemukan

Railway deployment gagal karena **import error** di `backend/app/dependencies.py`:
```python
# Import ini TIDAK ADA filenya ❌
from app.providers.llm import get_llm_provider
from app.providers.tts import get_tts_provider  
from app.providers.asr import get_asr_provider
```

Aplikasi crash saat startup karena mencoba import dari modul yang tidak ada.

## Solusi yang Diterapkan

### 1. ✅ Buat Provider Factory Functions di `__init__.py`

**File**: `backend/app/providers/__init__.py`

Created factory functions yang:
- Mengecek `settings.use_mock_ai` flag
- Return MockProvider jika true, Real Provider jika false
- Default: Groq untuk LLM, HuggingFace untuk ASR/TTS

```python
def get_llm_provider() -> LLMProvider:
    if settings.use_mock_ai:
        return MockLLMProvider()
    return GroqLLMProvider()

def get_asr_provider() -> ASRProvider:
    if settings.use_mock_ai:
        return MockASRProvider()
    return HuggingFaceASRProvider()

def get_tts_provider() -> TTSProvider:
    if settings.use_mock_ai:
        return MockTTSProvider()
    return HuggingFaceTTSProvider()
```

### 2. ✅ Update Import di `dependencies.py`

**File**: `backend/app/dependencies.py`

Changed from:
```python
from app.providers.llm import get_llm_provider  # ❌ File tidak ada
from app.providers.tts import get_tts_provider  # ❌ File tidak ada
from app.providers.asr import get_asr_provider  # ❌ File tidak ada
```

To:
```python
from app.providers import get_llm_provider, get_tts_provider, get_asr_provider  # ✅
```

### 3. ✅ Implement HuggingFace ASR Provider

**File**: `backend/app/providers/huggingface_asr.py`

File ini kosong sebelumnya. Created complete implementation:
- Uses Hugging Face Inference API
- Model: `openai/whisper-large-v3-turbo` (from settings)
- Transcribes audio bytes to text
- Proper error handling and logging

### 4. ✅ Fix HuggingFace TTS Provider Constructor

**File**: `backend/app/providers/huggingface_tts.py`

Removed `StorageService` dependency dari constructor karena factory function tidak pass parameter:

Before:
```python
def __init__(self, storage_service: StorageService):  # ❌ Factory tidak pass ini
```

After:
```python
def __init__(self):  # ✅ No parameters needed
```

## Files Changed

1. ✅ `backend/app/providers/__init__.py` - Created factory functions
2. ✅ `backend/app/dependencies.py` - Fixed import statement
3. ✅ `backend/app/providers/huggingface_asr.py` - Complete implementation
4. ✅ `backend/app/providers/huggingface_tts.py` - Fixed constructor signature

## Status

- ✅ **Code Fixed**: Import errors resolved
- ✅ **Committed**: `e05307d` - "Fix provider imports"
- ✅ **Pushed**: Successfully pushed to GitHub
- ⏳ **Railway**: Will automatically redeploy from GitHub

## Next Steps

Railway akan otomatis redeploy ketika detect push baru ke GitHub. Monitor Railway dashboard untuk:

1. ✅ Build Success
2. ✅ Deploy Success  
3. ✅ Healthcheck Pass - endpoint `/api/` should respond

Jika masih ada error, check Railway logs untuk detail.

## Environment Variables to Set in Railway

Pastikan semua variable ini sudah di-set di Railway Dashboard:

```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET_KEY=<your-generated-secret-key>
GROQ_API_KEY=<your-groq-api-key>
GROQ_MODEL_ID=llama-3.1-8b-instant
HF_API_KEY=<your-huggingface-api-key>
HF_API_BASE_URL=https://api-inference.huggingface.co
HF_ASR_MODEL_ID=openai/whisper-large-v3-turbo
HF_TTS_MODEL_ID=facebook/mms-tts-eng
HF_LLM_MODEL_ID=<your-hf-llm-model-id>
USE_MOCK_AI=false
PYTHON_VERSION=3.10
LOG_LEVEL=INFO
CORS_ORIGINS=*
```

Update `CORS_ORIGINS` setelah frontend deployed dengan URL yang benar.

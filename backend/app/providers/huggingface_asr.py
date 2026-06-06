import httpx
import logging
import io
from app.providers.base import ASRProvider
from app.config import settings

logger = logging.getLogger(__name__)

class HuggingFaceASRProvider(ASRProvider):
    def __init__(self):
        self.api_key = settings.hf_api_key
        self.model_id = settings.hf_asr_model_id
        self.api_url = f"{settings.hf_api_base_url}/models/{self.model_id}"
    
    async def transcribe_audio(self, audio_bytes: bytes, language: str = "en") -> str:
        """Transcribe audio using Hugging Face Whisper model"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
        }
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    files={"file": ("audio.wav", io.BytesIO(audio_bytes), "audio/wav")}
                )
                
                if response.status_code != 200:
                    logger.error(f"HuggingFace ASR error {response.status_code}: {response.text}")
                    raise Exception(f"HuggingFace API returned {response.status_code}")
                
                result = response.json()
                return result.get("text", "")
        
        except Exception as e:
            logger.error(f"HuggingFace ASR error: {e}")
            raise

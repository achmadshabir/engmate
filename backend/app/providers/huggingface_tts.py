import logging
from typing import Optional

logger = logging.getLogger(__name__)

class HuggingFaceTTSProvider:
    def __init__(self):
        logger.info(f"TTS Provider initialized (disabled in production)")
    
    async def synthesize_speech(self, text: str, language: str = "en") -> str:
        """TTS disabled in production to prevent serverless crashes"""
        logger.info(f"TTS disabled: {text[:50]}...")
        return None

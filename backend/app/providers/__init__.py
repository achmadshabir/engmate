"""
Provider factory functions for dependency injection
"""
from app.config import settings
from app.providers.base import LLMProvider, ASRProvider, TTSProvider

def get_llm_provider() -> LLMProvider:
    """Get LLM provider based on configuration"""
    if settings.use_mock_ai:
        from app.providers.mock import MockLLMProvider
        return MockLLMProvider()
    
    # Use Groq as default
    from app.providers.groq_llm import GroqLLMProvider
    return GroqLLMProvider()

def get_asr_provider() -> ASRProvider:
    """Get ASR provider based on configuration"""
    if settings.use_mock_ai:
        from app.providers.mock import MockASRProvider
        return MockASRProvider()
    
    # Use HuggingFace as default
    from app.providers.huggingface_asr import HuggingFaceASRProvider
    return HuggingFaceASRProvider()

def get_tts_provider() -> TTSProvider:
    """Get TTS provider based on configuration"""
    if settings.use_mock_ai:
        from app.providers.mock import MockTTSProvider
        return MockTTSProvider()
    
    # Use HuggingFace as default
    from app.providers.huggingface_tts import HuggingFaceTTSProvider
    return HuggingFaceTTSProvider()

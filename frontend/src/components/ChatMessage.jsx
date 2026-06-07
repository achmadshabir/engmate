import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ChatMessage = ({ role, text, feedback, audioUrl, isThinking = false }) => {
  const isUser = role === 'user';
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Use browser TTS for EngMate's responses (works in production)
    if (!isUser && text && !audioUrl) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
    // Fallback to audio file if available
    if (!isUser && audioUrl && audioRef.current) {
      console.log('Playing audio:', audioUrl);
      audioRef.current.play().catch(err => console.error('Audio play error:', err));
    }
  }, [text, audioUrl, isUser]);

  if (isThinking) {
    return (
      <div className="flex justify-start mb-4">
        <Card className="max-w-[80%] p-4 bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-lg">
          <div className="flex items-center gap-2 text-white text-sm mb-2">
            <span>EngMate is analyzing your speech...</span>
          </div>
          <Skeleton className="h-4 w-full mb-2 bg-white/30" />
          <Skeleton className="h-4 w-3/4 bg-white/30" />
        </Card>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card className={`max-w-[80%] p-4 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-0 shadow-lg' 
          : 'bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-lg'
      }`}>
        <div className={`text-sm ${isUser ? 'text-white' : 'text-white'} font-medium`}>
          {text}
        </div>

        {feedback && !isUser && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="text-xs text-white/80 mb-1 font-semibold">Feedback:</div>
            {feedback.grammar_ok !== undefined && (
              <div className="text-xs text-white/90">
                Grammar: {feedback.grammar_ok ? '✓ Good' : '✗ Needs work'}
              </div>
            )}
            {feedback.fluency_score !== undefined && (
              <div className="text-xs text-white/90">
                Fluency: {feedback.fluency_score}/100
              </div>
            )}
            {feedback.tip_id && (
              <div className="text-xs text-white mt-1 bg-white/20 p-2 rounded">
                💡 {feedback.tip_id}
              </div>
            )}
            {feedback.encouragement_id && (
              <div className="text-xs text-white mt-1 bg-white/20 p-2 rounded">
                ✨ {feedback.encouragement_id}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatMessage;

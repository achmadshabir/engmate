import React from 'react';
import { useEngMate } from '@/context/EngMateContext';
import { Badge } from '@/components/ui/badge';

const LearnerContextBar = () => {
  const { userProfile } = useEngMate();

  const explanationText = userProfile.explanation_language === 'id' 
    ? 'Bahasa Indonesia' 
    : 'English';

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg border-0 shadow-lg mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/90 font-medium">Level:</span>
        <Badge variant="outline" className="bg-white/20 text-white border-white/30 font-semibold">
          {userProfile.level}
        </Badge>
      </div>
      <div className="h-4 w-px bg-white/30"></div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/90 font-medium">Goal:</span>
        <span className="text-sm text-white font-semibold">{userProfile.goal}</span>
      </div>
      <div className="h-4 w-px bg-white/30"></div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/90 font-medium">Explanation:</span>
        <span className="text-sm text-white font-semibold">{explanationText}</span>
      </div>
    </div>
  );
};

export default LearnerContextBar;

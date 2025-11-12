import React, { createContext, useContext, useState, useEffect } from 'react';

export type MoodType = 'chill' | 'party' | 'focus' | 'romantic';

interface MoodContextType {
  mood: MoodType;
  setMood: (mood: MoodType) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mood, setMoodState] = useState<MoodType>(() => {
    const saved = localStorage.getItem('beatvibe-mood');
    return (saved as MoodType) || 'chill';
  });

  const setMood = (newMood: MoodType) => {
    setMoodState(newMood);
    localStorage.setItem('beatvibe-mood', newMood);
  };

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within MoodProvider');
  }
  return context;
};

import { motion } from 'framer-motion';
import { useMood, MoodType } from '@/contexts/MoodContext';

const moods: { type: MoodType; emoji: string; label: string; gradient: string }[] = [
  { type: 'chill', emoji: '🎧', label: 'Chill', gradient: 'gradient-chill' },
  { type: 'party', emoji: '🔥', label: 'Party', gradient: 'gradient-party' },
  { type: 'focus', emoji: '🌿', label: 'Focus', gradient: 'gradient-focus' },
  { type: 'romantic', emoji: '💖', label: 'Romantic', gradient: 'gradient-romantic' },
];

export const MoodSelector = () => {
  const { mood, setMood } = useMood();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {moods.map((m) => (
        <motion.button
          key={m.type}
          onClick={() => setMood(m.type)}
          className={`
            relative px-6 py-3 rounded-2xl font-semibold transition-all
            ${mood === m.type ? `${m.gradient} glow-${m.type}` : 'glass'}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={mood === m.type ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: mood === m.type ? Infinity : 0 }}
        >
          <span className="text-2xl mr-2">{m.emoji}</span>
          <span>{m.label}</span>
          {mood === m.type && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 20px currentColor',
                  '0 0 40px currentColor',
                  '0 0 20px currentColor',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

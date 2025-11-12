import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ListMusic, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MoodSelector } from '@/components/MoodSelector';
import { useMood } from '@/contexts/MoodContext';

const Player = () => {
  const navigate = useNavigate();
  const { mood } = useMood();

  const getMoodGradient = () => {
    switch (mood) {
      case 'chill':
        return 'from-chill-from/20 via-background to-chill-to/20';
      case 'party':
        return 'from-party-from/20 via-background to-party-to/20';
      case 'focus':
        return 'from-focus-from/20 via-background to-focus-to/20';
      case 'romantic':
        return 'from-romantic-from/20 via-background to-romantic-to/20';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getMoodGradient()} transition-all duration-1000`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1
            className="text-2xl font-orbitron font-bold bg-gradient-to-r from-primary to-chill-from bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            BeatVibe
          </motion.h1>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Home size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/playlists')}>
              <ListMusic size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">Now Playing</h2>
          <MoodSelector />
        </motion.div>

        <MusicPlayer />

        {/* VibeMeter */}
        <motion.div
          className="glass rounded-2xl p-6 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-3">Your Vibe Meter</h3>
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-12 rounded-full ${
                  i < 7 ? `gradient-${mood}` : 'bg-muted'
                }`}
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Your energy is perfectly synced with the beat!"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Player;

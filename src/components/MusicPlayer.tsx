import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const demoSongs = [
  { id: 1, title: 'Cosmic Dreams', artist: 'Luna Waves', duration: '3:42' },
  { id: 2, title: 'Neon Nights', artist: 'Electric Soul', duration: '4:15' },
  { id: 3, title: 'Serenity Flow', artist: 'Zen Collective', duration: '5:20' },
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(33);
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const song = demoSongs[currentSong];

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % demoSongs.length);
  };

  const handlePrev = () => {
    setCurrentSong((prev) => (prev - 1 + demoSongs.length) % demoSongs.length);
  };

  return (
    <motion.div
      className="glass rounded-3xl p-8 max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Album Art */}
      <motion.div
        className="relative w-64 h-64 mx-auto mb-8 rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary via-chill-from to-romantic-from flex items-center justify-center">
          <motion.div
            className="text-8xl"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            🎵
          </motion.div>
        </div>
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Song Info */}
      <div className="text-center mb-6">
        <motion.h3
          className="text-2xl font-bold mb-2"
          key={song.title}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {song.title}
        </motion.h3>
        <motion.p
          className="text-muted-foreground"
          key={song.artist}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {song.artist}
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Slider
          value={[progress]}
          onValueChange={(value) => setProgress(value[0])}
          max={100}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>1:23</span>
          <span>{song.duration}</span>
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex justify-center gap-1 mb-6 h-16">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-primary rounded-full"
            animate={isPlaying ? {
              height: ['20%', `${Math.random() * 80 + 20}%`, '20%'],
            } : { height: '20%' }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShuffle(!shuffle)}
          className={shuffle ? 'text-primary' : 'text-muted-foreground'}
        >
          <Shuffle size={20} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="hover:scale-110 transition-transform"
        >
          <SkipBack size={28} />
        </Button>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="icon"
            className="w-16 h-16 rounded-full glow-primary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="hover:scale-110 transition-transform"
        >
          <SkipForward size={28} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setRepeat(!repeat)}
          className={repeat ? 'text-primary' : 'text-muted-foreground'}
        >
          <Repeat size={20} />
        </Button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">🔊</span>
        <Slider
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-sm text-muted-foreground w-12 text-right">{volume}%</span>
      </div>
    </motion.div>
  );
};

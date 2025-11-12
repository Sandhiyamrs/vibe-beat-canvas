import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Music2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  const floatingNotes = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-purple-950/20 to-background">
      {/* Animated background gradient waves */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] gradient-chill rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] gradient-romantic rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating music notes */}
      {floatingNotes.map((i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Music2 size={24 + Math.random() * 20} />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="text-primary" size={32} />
          <h1 className="text-6xl md:text-8xl font-orbitron font-bold bg-gradient-to-r from-primary via-chill-from to-romantic-from bg-clip-text text-transparent">
            BeatVibe
          </h1>
          <Sparkles className="text-primary" size={32} />
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎶 Feel the Rhythm of Your Mood
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your music. Your energy. Your vibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="text-xl px-12 py-8 rounded-2xl font-orbitron font-bold glow-primary animate-glow-pulse relative overflow-hidden group"
            onClick={() => navigate('/player')}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chill-from/20 to-romantic-from/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10">Enter the Vibe 🎧</span>
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 text-sm text-muted-foreground italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          "Music speaks what cannot be expressed."
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        © 2025 BeatVibe | Designed with 💜 by Sandhiya M
      </motion.footer>
    </div>
  );
};

export default Home;

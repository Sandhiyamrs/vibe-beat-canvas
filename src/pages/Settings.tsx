import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Music, Moon, Sun, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMood, MoodType } from '@/contexts/MoodContext';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const { mood, setMood } = useMood();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(true);
  const [backgroundIntensity, setBackgroundIntensity] = useState(50);
  const [glowIntensity, setGlowIntensity] = useState(70);

  useEffect(() => {
    const saved = localStorage.getItem('beatvibe-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setBackgroundIntensity(settings.backgroundIntensity || 50);
      setGlowIntensity(settings.glowIntensity || 70);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('beatvibe-settings', JSON.stringify({
      backgroundIntensity,
      glowIntensity,
    }));
  };

  useEffect(() => {
    saveSettings();
  }, [backgroundIntensity, glowIntensity]);

  const resetVibe = () => {
    localStorage.removeItem('beatvibe-mood');
    localStorage.removeItem('beatvibe-playlists');
    localStorage.removeItem('beatvibe-settings');
    setMood('chill');
    setBackgroundIntensity(50);
    setGlowIntensity(70);
    toast({
      title: "Vibe Reset Complete",
      description: "All your settings have been restored to default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/10 to-background">
      {/* Navigation */}
      <nav className="glass border-b border-border/50">
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
            <Button variant="ghost" size="icon" onClick={() => navigate('/player')}>
              <Music size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ⚙️ Themes & Settings
        </motion.h2>

        <motion.div
          className="glass rounded-3xl p-8 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme" className="text-lg font-semibold">Theme Mode</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Switch between light and dark themes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun size={20} className={!isDark ? 'text-primary' : 'text-muted-foreground'} />
              <Switch
                id="theme"
                checked={isDark}
                onCheckedChange={setIsDark}
              />
              <Moon size={20} className={isDark ? 'text-primary' : 'text-muted-foreground'} />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Default Mood */}
          <div>
            <Label htmlFor="mood" className="text-lg font-semibold">Default Mood</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Set your preferred mood theme
            </p>
            <Select value={mood} onValueChange={(v) => setMood(v as MoodType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chill">🎧 Chill</SelectItem>
                <SelectItem value="party">🔥 Party</SelectItem>
                <SelectItem value="focus">🌿 Focus</SelectItem>
                <SelectItem value="romantic">💖 Romantic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-px bg-border" />

          {/* Background Intensity */}
          <div>
            <Label className="text-lg font-semibold">Background Intensity</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Adjust the intensity of animated backgrounds
            </p>
            <div className="flex items-center gap-4">
              <Slider
                value={[backgroundIntensity]}
                onValueChange={(v) => setBackgroundIntensity(v[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-semibold w-12 text-right">
                {backgroundIntensity}%
              </span>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Glow Intensity */}
          <div>
            <Label className="text-lg font-semibold">Glow Effect Intensity</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Control the glow and neon effects
            </p>
            <div className="flex items-center gap-4">
              <Slider
                value={[glowIntensity]}
                onValueChange={(v) => setGlowIntensity(v[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-semibold w-12 text-right">
                {glowIntensity}%
              </span>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Reset Button */}
          <div>
            <Label className="text-lg font-semibold">Reset My Vibe</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Clear all saved data and restore defaults
            </p>
            <Button
              variant="destructive"
              onClick={resetVibe}
              className="w-full"
            >
              <Trash2 className="mr-2" size={20} />
              Reset All Settings
            </Button>
          </div>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          className={`mt-8 glass rounded-3xl p-8 text-center gradient-${mood}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-2">Current Vibe Preview</h3>
          <p className="text-lg">
            {mood === 'chill' && '🎧 Chill & Relaxing'}
            {mood === 'party' && '🔥 Party Time!'}
            {mood === 'focus' && '🌿 Deep Focus Mode'}
            {mood === 'romantic' && '💖 Romantic Vibes'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

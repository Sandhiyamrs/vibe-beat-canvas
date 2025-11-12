import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Music, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMood, MoodType } from '@/contexts/MoodContext';
import { useToast } from '@/hooks/use-toast';

interface Playlist {
  id: string;
  name: string;
  mood: MoodType;
  songCount: number;
  coverEmoji: string;
}

const Playlists = () => {
  const navigate = useNavigate();
  const { mood } = useMood();
  const { toast } = useToast();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistMood, setNewPlaylistMood] = useState<MoodType>('chill');

  useEffect(() => {
    const saved = localStorage.getItem('beatvibe-playlists');
    if (saved) {
      setPlaylists(JSON.parse(saved));
    } else {
      const defaultPlaylists: Playlist[] = [
        { id: '1', name: 'Late Night Vibes', mood: 'chill', songCount: 24, coverEmoji: '🌙' },
        { id: '2', name: 'Party Anthems', mood: 'party', songCount: 18, coverEmoji: '🎉' },
        { id: '3', name: 'Deep Focus', mood: 'focus', songCount: 32, coverEmoji: '🧘' },
      ];
      setPlaylists(defaultPlaylists);
      localStorage.setItem('beatvibe-playlists', JSON.stringify(defaultPlaylists));
    }
  }, []);

  const savePlaylists = (updated: Playlist[]) => {
    setPlaylists(updated);
    localStorage.setItem('beatvibe-playlists', JSON.stringify(updated));
  };

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a playlist name",
        variant: "destructive",
      });
      return;
    }

    const emojis: Record<MoodType, string> = {
      chill: '🎧',
      party: '🔥',
      focus: '🌿',
      romantic: '💖',
    };

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      mood: newPlaylistMood,
      songCount: 0,
      coverEmoji: emojis[newPlaylistMood],
    };

    savePlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
    setIsDialogOpen(false);
    toast({
      title: "Playlist created!",
      description: `"${newPlaylistName}" has been added to your collection`,
    });
  };

  const deletePlaylist = (id: string) => {
    savePlaylists(playlists.filter(p => p.id !== id));
    toast({
      title: "Playlist deleted",
      description: "The playlist has been removed",
    });
  };

  const getMoodGradient = (playlistMood: MoodType) => {
    return `gradient-${playlistMood}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-purple-950/10 to-background`}>
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
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            💾 Your Playlists
          </motion.h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="glow-primary">
                  <Plus className="mr-2" size={20} />
                  Create Playlist
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="glass">
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Playlist Name</Label>
                  <Input
                    id="name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="My Awesome Playlist"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={newPlaylistMood} onValueChange={(v) => setNewPlaylistMood(v as MoodType)}>
                    <SelectTrigger className="mt-2">
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
                <Button onClick={createPlaylist} className="w-full">
                  Create Playlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              className="glass rounded-3xl p-6 hover:scale-105 transition-transform cursor-pointer group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateY: 5, rotateX: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlaylist(playlist.id);
                }}
              >
                <Trash2 size={16} />
              </Button>

              <div className={`w-full aspect-square rounded-2xl ${getMoodGradient(playlist.mood)} flex items-center justify-center mb-4 text-8xl`}>
                {playlist.coverEmoji}
              </div>

              <h3 className="text-xl font-bold mb-2">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {playlist.mood.charAt(0).toUpperCase() + playlist.mood.slice(1)} Mood
              </p>
              <p className="text-sm text-muted-foreground">
                {playlist.songCount} songs
              </p>
            </motion.div>
          ))}
        </div>

        {playlists.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-muted-foreground mb-4">
              No playlists yet. Create your first one!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Playlists;

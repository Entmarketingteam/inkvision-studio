import { Anchor, Fish, Eye, Crown, Shapes, Feather, Circle, Droplet } from 'lucide-react';
import { Label } from '@/components/ui/label';

type Props = {
  formData: any;
  updateFormData: (field: string, value: string) => void;
};

const styles = [
  { id: 'traditional', name: 'American Traditional', icon: Anchor, desc: 'Bold lines, limited color palette' },
  { id: 'japanese', name: 'Japanese Irezumi', icon: Fish, desc: 'Flowing nature, rich symbolism' },
  { id: 'realism', name: 'Black & Grey Realism', icon: Eye, desc: 'Photorealistic, detailed shading' },
  { id: 'neotraditional', name: 'Neo-Traditional', icon: Crown, desc: 'Vibrant colors, modern twist' },
  { id: 'geometric', name: 'Geometric/Dotwork', icon: Shapes, desc: 'Precise patterns, symmetry' },
  { id: 'fineline', name: 'Fine Line/Minimalist', icon: Feather, desc: 'Delicate, simple lines' },
  { id: 'blackwork', name: 'Blackwork/Ornamental', icon: Circle, desc: 'Solid black patterns' },
  { id: 'watercolor', name: 'Watercolor', icon: Droplet, desc: 'Soft bleeds, artistic' },
];

const moods = [
  { id: 'powerful', name: 'Powerful & Strong', desc: 'Fierce, commanding' },
  { id: 'peaceful', name: 'Peaceful & Spiritual', desc: 'Serene, divine' },
  { id: 'dark', name: 'Dark & Mysterious', desc: 'Gothic, haunting' },
  { id: 'elegant', name: 'Elegant & Beautiful', desc: 'Graceful, romantic' },
  { id: 'wild', name: 'Wild & Untamed', desc: 'Free, adventurous' },
  { id: 'stoic', name: 'Stoic & Timeless', desc: 'Noble, heroic' },
];

const backgrounds = [
  'Clean/None',
  'Smoke/Mist',
  'Clouds/Sky',
  'Geometric Shapes',
  'Nature Scene',
  'Floral Frame',
  'Ocean/Water',
  'Dark Vignette',
];

export default function StyleMoodStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Style & Mood
        </h2>
        <p className="text-tidal-muted">Choose the artistic style and emotional feel</p>
      </div>

      <div>
        <Label className="text-white text-base mb-4 block">Tattoo Style</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {styles.map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                onClick={() => updateFormData('style', style.name)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  formData.style === style.name
                    ? 'border-tidal-orange bg-tidal-orange/10'
                    : 'border-tidal-blue/20 hover:border-tidal-muted'
                }`}
              >
                <Icon className="h-6 w-6 text-tidal-orange mb-2" />
                <h3 className="text-white font-semibold text-sm mb-1">{style.name}</h3>
                <p className="text-tidal-muted text-xs">{style.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="text-white text-base mb-4 block">Mood</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => updateFormData('mood', mood.name)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                formData.mood === mood.name
                  ? 'border-tidal-orange bg-tidal-orange/10'
                  : 'border-tidal-blue/20 hover:border-tidal-muted'
              }`}
            >
              <h3 className="text-white font-semibold text-sm mb-1">{mood.name}</h3>
              <p className="text-tidal-muted text-xs">{mood.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-white text-base mb-4 block">Background Style</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg}
              onClick={() => updateFormData('background_style', bg)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                formData.background_style === bg
                  ? 'border-tidal-orange bg-tidal-orange/10 text-white'
                  : 'border-tidal-blue/20 text-tidal-muted hover:border-tidal-muted hover:text-white'
              }`}
            >
              <span className="text-sm">{bg}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

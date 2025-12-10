import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

type Props = {
  formData: any;
  updateFormData: (field: string, value: string) => void;
};

const sizes = [
  { id: 'small', name: 'Small', size: '2-3"', desc: 'Quarter sized' },
  { id: 'medium', name: 'Medium', size: '4-6"', desc: 'Palm sized' },
  { id: 'large', name: 'Large', size: '7-10"', desc: 'Hand sized' },
  { id: 'xlarge', name: 'Extra Large', size: '10"+', desc: 'Forearm or larger' },
];

const placements = [
  'Inner Forearm',
  'Outer Forearm',
  'Upper Arm/Bicep',
  'Half Sleeve',
  'Chest',
  'Back',
  'Thigh',
  'Calf',
  'Ribs',
  'Shoulder',
  'Wrist',
  'Ankle',
];

export default function SizePlacementStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Size & Placement
        </h2>
        <p className="text-ink-muted">Choose the size and where you want it on your body</p>
      </div>

      <div>
        <Label className="text-white text-base mb-4 block">Size</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => updateFormData('size', size.name)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                formData.size === size.name
                  ? 'border-ink-red bg-ink-red/10'
                  : 'border-ink-border hover:border-ink-muted'
              }`}
            >
              <h3 className="text-white font-semibold mb-1">{size.name}</h3>
              <p className="text-ink-red text-sm mb-1">{size.size}</p>
              <p className="text-ink-muted text-xs">{size.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-semibold text-sm mb-1">Pro Tip</p>
            <p className="text-yellow-200/80 text-sm">
              Bigger is almost always better for detailed work. Small tattoos with fine details can blur together as they age.
            </p>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-white text-base mb-4 block">Body Placement</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {placements.map((placement) => (
            <button
              key={placement}
              onClick={() => updateFormData('placement', placement)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                formData.placement === placement
                  ? 'border-ink-red bg-ink-red/10 text-white'
                  : 'border-ink-border text-ink-muted hover:border-ink-muted hover:text-white'
              }`}
            >
              <span className="text-sm">{placement}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

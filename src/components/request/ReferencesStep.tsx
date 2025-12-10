import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

type Props = {
  formData: any;
  updateFormData: (field: string, value: string) => void;
};

export default function ReferencesStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Reference Images
        </h2>
        <p className="text-tidal-muted">Upload images or add notes about visual references</p>
      </div>

      <div>
        <Label className="text-white text-base mb-4 block">
          Reference Images <span className="text-tidal-muted text-sm">(Optional)</span>
        </Label>
        <div className="border-2 border-dashed border-tidal-blue/20 rounded-lg p-8 text-center hover:border-tidal-muted transition-colors">
          <Upload className="h-12 w-12 text-tidal-muted mx-auto mb-4" />
          <p className="text-white mb-2">Drag & drop images here</p>
          <p className="text-tidal-muted text-sm mb-4">or click to browse (max 5 images)</p>
          <p className="text-tidal-muted text-xs">
            Coming soon: Upload functionality will be available in the next update
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference_notes" className="text-white text-base">
          Reference Notes <span className="text-tidal-muted text-sm">(Optional)</span>
        </Label>
        <Textarea
          id="reference_notes"
          placeholder="Describe any reference images, Pinterest boards, or visual inspirations you'd like to share..."
          value={formData.reference_notes}
          onChange={(e) => updateFormData('reference_notes', e.target.value)}
          className="min-h-[120px] bg-tidal-navy border-tidal-blue/20 text-white placeholder:text-tidal-muted resize-none"
        />
      </div>
    </div>
  );
}

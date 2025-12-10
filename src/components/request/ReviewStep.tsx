import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import { useState } from 'react';

type Props = {
  formData: any;
  goToStep: (step: number) => void;
};

export default function ReviewStep({ formData, goToStep }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Review Your Request
        </h2>
        <p className="text-tidal-muted">Double-check everything before submitting</p>
      </div>

      <div className="space-y-4">
        <div className="bg-tidal-navy rounded-lg p-4 border border-tidal-blue/20">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-semibold">Concept</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToStep(1)}
              className="text-tidal-orange hover:text-tidal-orange h-auto p-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-tidal-muted text-sm">{formData.concept_description}</p>
          {formData.personal_meaning && (
            <p className="text-tidal-muted text-sm mt-2 italic">
              Meaning: {formData.personal_meaning}
            </p>
          )}
        </div>

        <div className="bg-tidal-navy rounded-lg p-4 border border-tidal-blue/20">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-semibold">Style & Mood</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToStep(2)}
              className="text-tidal-orange hover:text-tidal-orange h-auto p-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{formData.style}</Badge>
            <Badge>{formData.mood}</Badge>
            <Badge>{formData.background_style}</Badge>
          </div>
        </div>

        <div className="bg-tidal-navy rounded-lg p-4 border border-tidal-blue/20">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-semibold">Size & Placement</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goToStep(3)}
              className="text-tidal-orange hover:text-tidal-orange h-auto p-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{formData.size}</Badge>
            <Badge>{formData.placement}</Badge>
          </div>
        </div>

        {formData.reference_notes && (
          <div className="bg-tidal-navy rounded-lg p-4 border border-tidal-blue/20">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-semibold">Reference Notes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToStep(4)}
                className="text-tidal-orange hover:text-tidal-orange h-auto p-1"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-tidal-muted text-sm">{formData.reference_notes}</p>
          </div>
        )}
      </div>

      <div className="flex items-start space-x-2 p-4 bg-tidal-navy rounded-lg border border-tidal-blue/20">
        <Checkbox
          id="agreement"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked as boolean)}
          className="mt-1"
        />
        <Label
          htmlFor="agreement"
          className="text-sm text-tidal-muted leading-relaxed cursor-pointer"
        >
          I understand that AI concepts are starting points and will be refined by the artist.
          The final design may differ from initial concepts based on technical and artistic considerations.
        </Label>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-tidal-orange/20 text-tidal-orange text-sm border border-tidal-orange/30">
      {children}
    </span>
  );
}

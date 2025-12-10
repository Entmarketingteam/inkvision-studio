import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Props = {
  formData: any;
  updateFormData: (field: string, value: string) => void;
};

export default function ConceptStep({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-4">
          Describe Your Tattoo Idea
        </h2>
        <p className="text-tidal-muted mb-6">
          Be as detailed as possible. Include subjects, mood, setting, and specific elements.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="concept" className="text-white text-base">
          Your Concept
        </Label>
        <Textarea
          id="concept"
          placeholder="Example: A majestic phoenix rising from flames with its wings spread wide. The flames should transition from deep red at the base to golden orange at the tips. I want the phoenix to look powerful and fierce, with intricate feather details..."
          value={formData.concept_description}
          onChange={(e) => updateFormData('concept_description', e.target.value)}
          className="min-h-[200px] bg-tidal-navy border-tidal-blue/20 text-white placeholder:text-tidal-muted resize-none"
        />
        <p className="text-sm text-tidal-muted">
          {formData.concept_description.length} characters (minimum 20)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meaning" className="text-white text-base">
          Personal Meaning <span className="text-tidal-muted text-sm">(Optional)</span>
        </Label>
        <Textarea
          id="meaning"
          placeholder="Share what this tattoo means to you personally..."
          value={formData.personal_meaning}
          onChange={(e) => updateFormData('personal_meaning', e.target.value)}
          className="min-h-[100px] bg-tidal-navy border-tidal-blue/20 text-white placeholder:text-tidal-muted resize-none"
        />
        <p className="text-sm text-tidal-muted">
          This helps us understand the emotional connection to your design
        </p>
      </div>
    </div>
  );
}

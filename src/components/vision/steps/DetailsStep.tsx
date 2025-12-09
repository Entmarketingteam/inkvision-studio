import { TattooVision } from "@/types/vision";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DetailsStepProps {
  vision: TattooVision;
  updateVision: (updates: Partial<TattooVision>) => void;
}

export function DetailsStep({ vision, updateVision }: DetailsStepProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
          Detail Checklist
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The more specific you are, the better your design will be. Fill out what applies to your idea.
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pose/Position */}
          <div className="space-y-2">
            <Label htmlFor="pose" className="text-foreground font-medium">
              Pose / Position
            </Label>
            <Input
              id="pose"
              placeholder="e.g., facing forward, profile, action pose"
              value={vision.pose}
              onChange={(e) => updateVision({ pose: e.target.value })}
              className="bg-muted border-border focus:border-primary"
            />
          </div>

          {/* Expression */}
          <div className="space-y-2">
            <Label htmlFor="expression" className="text-foreground font-medium">
              Expression
            </Label>
            <Input
              id="expression"
              placeholder="e.g., fierce, peaceful, crying, serene"
              value={vision.expression}
              onChange={(e) => updateVision({ expression: e.target.value })}
              className="bg-muted border-border focus:border-primary"
            />
          </div>

          {/* Lighting */}
          <div className="space-y-2">
            <Label htmlFor="lighting" className="text-foreground font-medium">
              Lighting
            </Label>
            <Input
              id="lighting"
              placeholder="e.g., dramatic from above, soft and glowing"
              value={vision.lighting}
              onChange={(e) => updateVision({ lighting: e.target.value })}
              className="bg-muted border-border focus:border-primary"
            />
          </div>

          {/* Added Elements */}
          <div className="space-y-2">
            <Label htmlFor="elements" className="text-foreground font-medium">
              Added Elements
            </Label>
            <Input
              id="elements"
              placeholder="e.g., roses, crown, thorns, flames, clock"
              value={vision.addedElements}
              onChange={(e) => updateVision({ addedElements: e.target.value })}
              className="bg-muted border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Text/Script */}
        <div className="space-y-2">
          <Label htmlFor="text" className="text-foreground font-medium">
            Text / Script (if any)
          </Label>
          <Input
            id="text"
            placeholder="Exact wording and font style preference"
            value={vision.textScript}
            onChange={(e) => updateVision({ textScript: e.target.value })}
            className="bg-muted border-border focus:border-primary"
          />
        </div>

        {/* Personal Meaning */}
        <div className="space-y-2">
          <Label htmlFor="meaning" className="text-foreground font-medium">
            Personal Meaning / Story
          </Label>
          <Textarea
            id="meaning"
            placeholder="If there's a story behind your tattoo, share it. It helps capture the right emotion."
            value={vision.personalMeaning}
            onChange={(e) => updateVision({ personalMeaning: e.target.value })}
            className="bg-muted border-border focus:border-primary min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground">
            The personal meaning helps me understand the feeling you want to capture.
          </p>
        </div>
      </div>
    </div>
  );
}

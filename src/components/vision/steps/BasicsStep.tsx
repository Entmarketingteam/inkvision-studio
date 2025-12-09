import { TattooVision, placements } from "@/types/vision";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicsStepProps {
  vision: TattooVision;
  updateVision: (updates: Partial<TattooVision>) => void;
}

export function BasicsStep({ vision, updateVision }: BasicsStepProps) {
  const selectedPlacement = placements.find(p => p.value === vision.placement);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
          Start With The Basics
        </h2>
        <p className="text-muted-foreground">
          Before diving into details, let's answer these fundamental questions.
        </p>
      </div>

      <div className="grid gap-6 max-w-xl mx-auto">
        {/* Main Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-foreground font-medium">
            What is the main subject?
          </Label>
          <Input
            id="subject"
            placeholder="e.g., lion, rose, skull, portrait, ship"
            value={vision.mainSubject}
            onChange={(e) => updateVision({ mainSubject: e.target.value })}
            className="bg-muted border-border focus:border-primary"
          />
        </div>

        {/* Placement */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            Where on your body?
          </Label>
          <Select
            value={vision.placement}
            onValueChange={(value) => updateVision({ placement: value })}
          >
            <SelectTrigger className="bg-muted border-border">
              <SelectValue placeholder="Select placement" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {placements.map((placement) => (
                <SelectItem 
                  key={placement.value} 
                  value={placement.value}
                  className="focus:bg-muted"
                >
                  {placement.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedPlacement && (
            <div className="mt-3 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Ideal Size:</span>
                  <span className="ml-2 text-foreground">{selectedPlacement.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Shape:</span>
                  <span className="ml-2 text-foreground">{selectedPlacement.shape}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Best For:</span>
                  <span className="ml-2 text-foreground">{selectedPlacement.bestFor}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label htmlFor="size" className="text-foreground font-medium">
            How big? (in inches)
          </Label>
          <Input
            id="size"
            placeholder="e.g., 6 inches"
            value={vision.size}
            onChange={(e) => updateVision({ size: e.target.value })}
            className="bg-muted border-border focus:border-primary"
          />
          <p className="text-xs text-muted-foreground italic">
            Pro Tip: Bigger is almost always better for detailed work. Small tattoos with fine details can blur together as they age.
          </p>
        </div>

        {/* Style */}
        <div className="space-y-3">
          <Label className="text-foreground font-medium">
            Color or black & grey?
          </Label>
          <RadioGroup
            value={vision.style}
            onValueChange={(value) => updateVision({ style: value as TattooVision['style'] })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="black-grey" id="black-grey" />
              <Label htmlFor="black-grey" className="cursor-pointer">Black & Grey</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="color" id="color" />
              <Label htmlFor="color" className="cursor-pointer">Color</Label>
            </div>
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            Most of my work is black & grey realism
          </p>
        </div>
      </div>
    </div>
  );
}

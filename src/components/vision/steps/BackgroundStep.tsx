import { TattooVision, backgroundStyles } from "@/types/vision";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BackgroundStepProps {
  vision: TattooVision;
  updateVision: (updates: Partial<TattooVision>) => void;
}

export function BackgroundStep({ vision, updateVision }: BackgroundStepProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
          Background Options
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The background sets the stage for your main subject. It can make your tattoo feel complete or let the subject stand alone.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {backgroundStyles.map((style) => {
          const isSelected = vision.backgroundStyle === style.value;
          
          return (
            <button
              key={style.value}
              onClick={() => updateVision({ backgroundStyle: style.value })}
              className={cn(
                "p-5 rounded-xl text-left transition-all duration-300 border relative group",
                isSelected
                  ? "gradient-card border-primary shadow-glow"
                  : "bg-muted/50 border-border hover:border-primary/50 hover:bg-muted"
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <h3 className={cn(
                "font-display text-lg mb-2",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {style.label}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                {style.description}
              </p>
              
              <p className="text-xs text-primary/80">
                Works great with: {style.bestFor}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

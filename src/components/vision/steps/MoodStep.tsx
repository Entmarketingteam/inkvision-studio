import { TattooVision, moodCategories } from "@/types/vision";
import { cn } from "@/lib/utils";

interface MoodStepProps {
  vision: TattooVision;
  updateVision: (updates: Partial<TattooVision>) => void;
}

export function MoodStep({ vision, updateVision }: MoodStepProps) {
  const toggleMood = (mood: string) => {
    const newMoods = vision.selectedMoods.includes(mood)
      ? vision.selectedMoods.filter(m => m !== mood)
      : [...vision.selectedMoods, mood];
    updateVision({ selectedMoods: newMoods });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
          Choose Your Mood
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The mood of your tattoo is the emotional feeling it gives off. Two tattoos of the same subject can feel completely different based on mood. Select all that resonate with you.
        </p>
      </div>

      <div className="grid gap-6">
        {moodCategories.map((category) => (
          <div 
            key={category.name}
            className="p-6 rounded-xl gradient-card border border-border shadow-card"
          >
            <div className="mb-4">
              <h3 className="text-lg font-display text-foreground mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Best for: {category.bestFor}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    vision.selectedMoods.includes(mood)
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
                  )}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {vision.selectedMoods.length > 0 && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-medium">Selected moods:</span>{" "}
            {vision.selectedMoods.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

import { TattooVision, placements, backgroundStyles } from "@/types/vision";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Palette, MapPin, Ruler, Sparkles, Image, FileText } from "lucide-react";

interface SummaryStepProps {
  vision: TattooVision;
}

export function SummaryStep({ vision }: SummaryStepProps) {
  const placement = placements.find(p => p.value === vision.placement);
  const background = backgroundStyles.find(b => b.value === vision.backgroundStyle);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">
          Your Vision Summary
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here's everything you've shared about your tattoo vision. Review it before your consultation.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto gradient-card border-border shadow-card">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Main Subject & Style */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg text-foreground mb-1">Main Subject</h3>
              <p className="text-muted-foreground">
                {vision.mainSubject || "Not specified"} • {vision.style === 'black-grey' ? 'Black & Grey' : vision.style === 'color' ? 'Color' : 'Style not specified'}
              </p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Placement & Size */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground mb-1">Placement</h3>
                <p className="text-muted-foreground">{placement?.label || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Ruler className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground mb-1">Size</h3>
                <p className="text-muted-foreground">{vision.size || "Not specified"}</p>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Mood */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg text-foreground mb-2">Mood & Feeling</h3>
              {vision.selectedMoods.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {vision.selectedMoods.map(mood => (
                    <span 
                      key={mood}
                      className="px-3 py-1 rounded-full text-sm bg-primary/20 text-primary"
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No moods selected</p>
              )}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Background */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg text-foreground mb-1">Background Style</h3>
              <p className="text-muted-foreground">{background?.label || "Not specified"}</p>
              {background && (
                <p className="text-sm text-muted-foreground/70 mt-1">{background.description}</p>
              )}
            </div>
          </div>

          {/* Details (if any filled) */}
          {(vision.pose || vision.expression || vision.lighting || vision.addedElements || vision.textScript) && (
            <>
              <Separator className="bg-border" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg text-foreground mb-3">Additional Details</h3>
                  <div className="grid gap-2 text-sm">
                    {vision.pose && (
                      <p><span className="text-muted-foreground">Pose:</span> <span className="text-foreground">{vision.pose}</span></p>
                    )}
                    {vision.expression && (
                      <p><span className="text-muted-foreground">Expression:</span> <span className="text-foreground">{vision.expression}</span></p>
                    )}
                    {vision.lighting && (
                      <p><span className="text-muted-foreground">Lighting:</span> <span className="text-foreground">{vision.lighting}</span></p>
                    )}
                    {vision.addedElements && (
                      <p><span className="text-muted-foreground">Added Elements:</span> <span className="text-foreground">{vision.addedElements}</span></p>
                    )}
                    {vision.textScript && (
                      <p><span className="text-muted-foreground">Text/Script:</span> <span className="text-foreground">{vision.textScript}</span></p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Personal Meaning */}
          {vision.personalMeaning && (
            <>
              <Separator className="bg-border" />
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <h4 className="font-display text-sm text-primary mb-2">Personal Story</h4>
                <p className="text-foreground text-sm leading-relaxed">{vision.personalMeaning}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="text-center space-y-4 max-w-xl mx-auto">
        <p className="text-muted-foreground text-sm">
          <strong className="text-foreground">Remember:</strong> Reference photos are gold. Bring examples of tattoos you love. 
          Trust the process—we'll create a custom design based on your input and refine it together before we start.
        </p>
      </div>
    </div>
  );
}

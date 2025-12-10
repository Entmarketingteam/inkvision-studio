import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import tidalInkLogo from "@/assets/tidal-ink-logo.png";

interface HeroSectionProps {
  onStartGuide: () => void;
}

export function HeroSection({ onStartGuide }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 gradient-wave" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src={tidalInkLogo} 
            alt="Tidal Ink Tattoo" 
            className="h-48 md:h-64 lg:h-80 w-auto drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-foreground mb-6 leading-tight">
          Your Tattoo<br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vision Guide</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Everything you need to communicate your perfect design. 
          Take your time with each section and be as specific as possible.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onStartGuide}
          >
            Begin Your Vision
          </Button>
          
          <Button 
            variant="heroOutline" 
            size="xl"
            onClick={onStartGuide}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          onClick={onStartGuide}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
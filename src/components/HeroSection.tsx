import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartGuide: () => void;
}

export function HeroSection({ onStartGuide }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        <p className="text-primary font-display tracking-[0.3em] uppercase text-sm mb-4">
          Art on Main • Mt. Washington
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-6 leading-tight">
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

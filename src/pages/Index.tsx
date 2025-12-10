import { useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";
import { VisionForm } from "@/components/vision/VisionForm";
import { Instagram } from "lucide-react";
import tidalInkLogo from "@/assets/tidal-ink-logo.png";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onStartGuide={scrollToForm} />

      {/* Bento Grid Features */}
      <BentoGrid />

      {/* Form Section */}
      <section 
        ref={formRef}
        className="py-16 md:py-24 px-6 gradient-wave"
      >
        <div className="max-w-6xl mx-auto">
          <VisionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <img 
            src={tidalInkLogo} 
            alt="Tidal Ink Tattoo" 
            className="h-24 w-auto mx-auto opacity-80"
          />
          <p className="text-muted-foreground text-sm">
            Quality Tattoos • Custom Designs
          </p>
          <a 
            href="https://instagram.com/tidalinktattoo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span>@tidalinktattoo</span>
          </a>
          <p className="text-muted-foreground text-xs pt-4">
            © {new Date().getFullYear()} Tidal Ink Tattoo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
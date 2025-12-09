import { useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { VisionForm } from "@/components/vision/VisionForm";
import { Instagram } from "lucide-react";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onStartGuide={scrollToForm} />

      {/* Form Section */}
      <section 
        ref={formRef}
        className="py-16 md:py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <VisionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="font-display text-xl text-foreground">
            Art on Main
          </p>
          <p className="text-muted-foreground text-sm">
            Mt. Washington, KY
          </p>
          <a 
            href="https://instagram.com/jz_tattoos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span>@jz_tattoos</span>
          </a>
          <p className="text-muted-foreground text-xs pt-4">
            © {new Date().getFullYear()} Art on Main. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

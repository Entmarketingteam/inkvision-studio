import { Palette, Ruler, Heart, Sparkles, Clock, MessageSquare } from "lucide-react";

interface BentoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function BentoCard({ icon, title, description, className = "" }: BentoCardProps) {
  return (
    <div className={`bento-card p-6 flex flex-col ${className}`}>
      <div className="w-12 h-12 rounded-lg gradient-ocean flex items-center justify-center mb-4 shadow-glow">
        {icon}
      </div>
      <h3 className="font-display text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
            Why Use the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vision Guide</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our step-by-step process ensures we capture every detail of your dream tattoo
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Feature Card */}
          <div className="bento-card p-8 md:col-span-2 lg:col-span-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-ocean opacity-10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 shadow-glow">
                <Palette className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">Express Your Vision</h3>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                From style preferences to personal meaning, we guide you through every aspect 
                of your tattoo design. The more details you share, the better we can bring 
                your vision to life.
              </p>
            </div>
          </div>

          {/* Tall Card */}
          <div className="bento-card p-6 flex flex-col md:row-span-2">
            <div className="w-12 h-12 rounded-lg gradient-ocean flex items-center justify-center mb-4 shadow-glow">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2">Personal Meaning</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              We help you articulate the emotional significance and personal story behind your design.
            </p>
            <div className="flex-1 flex items-end">
              <div className="w-full h-32 gradient-card rounded-lg border border-border/30 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary animate-wave" />
              </div>
            </div>
          </div>

          {/* Standard Cards Row */}
          <BentoCard
            icon={<Ruler className="h-6 w-6 text-primary-foreground" />}
            title="Size & Placement"
            description="Visualize where your tattoo will go and how it will fit your body."
          />

          <BentoCard
            icon={<Clock className="h-6 w-6 text-primary-foreground" />}
            title="Save Time"
            description="Come prepared to your consultation with all details ready."
          />

          {/* Wide Card */}
          <div className="bento-card p-6 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-14 h-14 rounded-xl gradient-ocean flex items-center justify-center shadow-glow flex-shrink-0">
                <MessageSquare className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-foreground mb-2">Better Communication</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Vision Guide creates a shared language between you and your artist, 
                  reducing back-and-forth and ensuring your final design exceeds expectations.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse delay-100" />
                <div className="w-3 h-3 rounded-full bg-primary/30 animate-pulse delay-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
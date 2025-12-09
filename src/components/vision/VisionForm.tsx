import { useState } from "react";
import { TattooVision, initialVision } from "@/types/vision";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { BasicsStep } from "./steps/BasicsStep";
import { MoodStep } from "./steps/MoodStep";
import { BackgroundStep } from "./steps/BackgroundStep";
import { DetailsStep } from "./steps/DetailsStep";
import { SummaryStep } from "./steps/SummaryStep";
import { ChevronLeft, ChevronRight, RotateCcw, Send } from "lucide-react";
import { toast } from "sonner";

const TOTAL_STEPS = 5;
const STEP_LABELS = ["Basics", "Mood", "Background", "Details", "Summary"];

export function VisionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [vision, setVision] = useState<TattooVision>(initialVision);

  const updateVision = (updates: Partial<TattooVision>) => {
    setVision(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setVision(initialVision);
    setCurrentStep(1);
    toast.success("Form reset successfully");
  };

  const handleSubmit = () => {
    // In a real app, this would send to a backend
    console.log("Vision submitted:", vision);
    toast.success("Your tattoo vision has been saved! Bring this to your consultation.");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicsStep vision={vision} updateVision={updateVision} />;
      case 2:
        return <MoodStep vision={vision} updateVision={updateVision} />;
      case 3:
        return <BackgroundStep vision={vision} updateVision={updateVision} />;
      case 4:
        return <DetailsStep vision={vision} updateVision={updateVision} />;
      case 5:
        return <SummaryStep vision={vision} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={TOTAL_STEPS} 
        stepLabels={STEP_LABELS}
      />

      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={resetForm}
            className="gap-2 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div>
          {currentStep < TOTAL_STEPS ? (
            <Button
              onClick={nextStep}
              variant="hero"
              size="lg"
              className="gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="hero"
              size="lg"
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Complete Vision Guide
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

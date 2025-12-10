import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

import ConceptStep from '@/components/request/ConceptStep';
import StyleMoodStep from '@/components/request/StyleMoodStep';
import SizePlacementStep from '@/components/request/SizePlacementStep';
import ReferencesStep from '@/components/request/ReferencesStep';
import ReviewStep from '@/components/request/ReviewStep';

type FormData = {
  concept_description: string;
  personal_meaning: string;
  style: string;
  mood: string;
  background_style: string;
  size: string;
  placement: string;
  reference_notes: string;
};

const steps = [
  { id: 1, name: 'Concept' },
  { id: 2, name: 'Style & Mood' },
  { id: 3, name: 'Size & Placement' },
  { id: 4, name: 'References' },
  { id: 5, name: 'Review' },
];

export default function NewRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    concept_description: '',
    personal_meaning: '',
    style: '',
    mood: '',
    background_style: '',
    size: '',
    placement: '',
    reference_notes: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('design_requests')
        .insert({
          user_id: user.id,
          ...formData,
          status: 'submitted',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Design request submitted successfully!');
      navigate(`/request/${data.id}`);
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Failed to submit design request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.concept_description.length >= 20;
      case 2:
        return formData.style && formData.mood && formData.background_style;
      case 3:
        return formData.size && formData.placement;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-tidal-navy">
      <nav className="bg-tidal-navy-light border-b border-tidal-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-2xl font-display font-bold">
              Tidal Ink <span className="text-tidal-orange">Tattoo</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-tidal-muted hover:text-white mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            New Design Request
          </h1>
          <p className="text-tidal-muted">Tell us about your tattoo vision</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => goToStep(step.id)}
                  className={`flex flex-col items-center ${
                    currentStep >= step.id ? 'text-tidal-orange' : 'text-tidal-muted'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 transition-all ${
                      currentStep >= step.id
                        ? 'border-tidal-orange bg-tidal-orange/20'
                        : 'border-tidal-blue/20'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-xs hidden sm:block">{step.name}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-tidal-orange' : 'bg-tidal-blue/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-tidal-navy-light border-tidal-blue/20 p-6">
          {currentStep === 1 && (
            <ConceptStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <StyleMoodStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <SizePlacementStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <ReferencesStep formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 5 && (
            <ReviewStep formData={formData} goToStep={goToStep} />
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-tidal-blue/20">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-tidal-blue/20 text-white hover:bg-tidal-navy"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-tidal-orange hover:bg-tidal-orange/90 text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !canProceed()}
                className="bg-tidal-orange hover:bg-tidal-orange/90 text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, DesignRequest, GeneratedImage } from '@/lib/supabase';
import { StatusBadge } from '@/components/StatusBadge';
import { ChevronLeft, Sparkles, Heart, RefreshCw, Check, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function DesignReview() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [request, setRequest] = useState<DesignRequest | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [variationNotes, setVariationNotes] = useState('');
  const [showVariationModal, setShowVariationModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadRequest();
      loadImages();
    }
  }, [id]);

  const loadRequest = async () => {
    try {
      const { data, error } = await supabase
        .from('design_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRequest(data);
    } catch (error) {
      console.error('Error loading request:', error);
      toast.error('Failed to load design request');
    } finally {
      setLoading(false);
    }
  };

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('generated_images')
        .select('*')
        .eq('design_request_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const toggleLike = async (imageId: string, currentLiked: boolean) => {
    try {
      const { error } = await supabase
        .from('generated_images')
        .update({ is_liked: !currentLiked })
        .eq('id', imageId);

      if (error) throw error;
      loadImages();
      toast.success(currentLiked ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  const handleVariationRequest = (image: GeneratedImage) => {
    setSelectedImage(image);
    setShowVariationModal(true);
  };

  const submitVariationRequest = async () => {
    toast.info('Variation generation will be available in the next update');
    setShowVariationModal(false);
    setVariationNotes('');
  };

  const approveImage = async (imageId: string) => {
    try {
      const { error: imageError } = await supabase
        .from('generated_images')
        .update({ is_approved: true })
        .eq('id', imageId);

      if (imageError) throw imageError;

      const { error: requestError } = await supabase
        .from('design_requests')
        .update({ status: 'approved' })
        .eq('id', id);

      if (requestError) throw requestError;

      toast.success('Design approved! Your artist will prepare the stencil.');
      loadRequest();
      loadImages();
    } catch (error) {
      toast.error('Failed to approve design');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-tidal-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tidal-orange"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-tidal-navy flex items-center justify-center">
        <p className="text-tidal-muted">Design request not found</p>
      </div>
    );
  }

  const currentRoundImages = images.filter(img => img.generation_round === 1 && img.image_type === 'initial').slice(0, 4);
  const approvedImage = images.find(img => img.is_approved);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard">
          <Button variant="ghost" className="text-tidal-muted hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-3xl font-display font-bold text-white mb-2 sm:mb-0">
              Design Request
            </h1>
            <StatusBadge status={request.status} />
          </div>

          <div className="flex items-center gap-2 mb-4">
            {['submitted', 'generating', 'review', 'approved', 'completed'].map((step, index) => {
              const isActive = ['submitted', 'generating'].includes(step) && request.status === 'generating' ||
                ['review', 'variations_requested'].includes(request.status) && step === 'review' ||
                ['approved', 'stencil_ready'].includes(request.status) && ['submitted', 'generating', 'review', 'approved'].includes(step) ||
                request.status === 'completed';

              const isPassed = (request.status === 'generating' && step === 'submitted') ||
                (['review', 'variations_requested', 'approved', 'stencil_ready', 'completed'].includes(request.status) && ['submitted', 'generating'].includes(step)) ||
                (['approved', 'stencil_ready', 'completed'].includes(request.status) && step === 'review') ||
                (request.status === 'completed' && step === 'approved');

              return (
                <div key={step} className="flex items-center flex-1">
                  <div className={`h-2 rounded-full flex-1 ${isPassed || isActive ? 'bg-tidal-orange' : 'bg-tidal-blue/20'}`} />
                  {index < 4 && <div className="w-2" />}
                </div>
              );
            })}
          </div>
        </div>

        <Card className="bg-tidal-navy-light border-tidal-blue/20 mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-display font-semibold text-white mb-4">Request Details</h2>
            <div className="space-y-3">
              <div>
                <span className="text-tidal-muted text-sm">Concept:</span>
                <p className="text-white">{request.concept_description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{request.style}</Badge>
                <Badge>{request.mood}</Badge>
                <Badge>{request.size}</Badge>
                <Badge>{request.placement}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {request.status === 'generating' && (
          <Card className="bg-tidal-navy-light border-tidal-blue/20">
            <CardContent className="py-16 text-center">
              <Sparkles className="h-16 w-16 text-tidal-orange mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                Creating Your Concepts...
              </h2>
              <p className="text-tidal-muted">This usually takes 1-2 minutes</p>
            </CardContent>
          </Card>
        )}

        {request.status === 'review' || request.status === 'variations_requested' ? (
          <>
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Choose Your Favorite
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentRoundImages.map((image, index) => (
                <Card key={image.id} className="bg-tidal-navy-light border-tidal-blue/20 overflow-hidden group">
                  <div className="relative aspect-square bg-tidal-navy">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-tidal-navy-light/80 backdrop-blur text-white rounded-full text-sm font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    {image.is_liked && (
                      <div className="absolute top-2 right-2 z-10">
                        <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-tidal-navy via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleLike(image.id, image.is_liked)}
                        className={`border-tidal-blue/20 ${image.is_liked ? 'bg-pink-500/20 border-pink-500' : 'bg-tidal-navy-light/80'} backdrop-blur`}
                      >
                        <Heart className={`h-4 w-4 ${image.is_liked ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVariationRequest(image)}
                        className="bg-tidal-navy-light/80 backdrop-blur border-tidal-blue/20"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => approveImage(image.id)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-tidal-muted">
                      <p className="text-sm">Concept {index + 1}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : null}

        {request.status === 'approved' || request.status === 'stencil_ready' ? (
          <Card className="bg-tidal-navy-light border-tidal-blue/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display font-bold text-white">
                  Approved Design
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  <Check className="h-4 w-4 mr-1" />
                  Approved
                </span>
              </div>
              <div className="relative aspect-square max-w-2xl mx-auto bg-tidal-navy rounded-lg mb-6">
                <div className="absolute inset-0 flex items-center justify-center text-tidal-muted">
                  <p>Approved Design Preview</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="border-tidal-blue/20 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button className="bg-tidal-orange hover:bg-tidal-orange/90 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Dialog open={showVariationModal} onOpenChange={setShowVariationModal}>
        <DialogContent className="bg-tidal-navy-light border-tidal-blue/20 text-white">
          <DialogHeader>
            <DialogTitle>Request Variation</DialogTitle>
            <DialogDescription className="text-tidal-muted">
              Tell us what changes you'd like to see in the next iteration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Example: Make the wings larger, change the color scheme to blue and gold, add more detail to the feathers..."
              value={variationNotes}
              onChange={(e) => setVariationNotes(e.target.value)}
              className="min-h-[100px] bg-tidal-navy border-tidal-blue/20 text-white placeholder:text-tidal-muted"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowVariationModal(false)}
                className="flex-1 border-tidal-blue/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={submitVariationRequest}
                className="flex-1 bg-tidal-orange hover:bg-tidal-orange/90 text-white"
              >
                Generate Variations
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-tidal-blue/20 text-tidal-muted text-sm">
      {children}
    </span>
  );
}

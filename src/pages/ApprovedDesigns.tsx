import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase, GeneratedImage, DesignRequest } from '@/lib/supabase';
import { ChevronLeft, Download, Calendar, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';

type ApprovedDesign = GeneratedImage & {
  design_request?: DesignRequest;
};

export default function ApprovedDesigns() {
  const [designs, setDesigns] = useState<ApprovedDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApprovedDesigns();
  }, []);

  const loadApprovedDesigns = async () => {
    try {
      const { data, error } = await supabase
        .from('generated_images')
        .select(`
          *,
          design_request:design_requests(*)
        `)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDesigns(data || []);
    } catch (error) {
      console.error('Error loading approved designs:', error);
      toast.error('Failed to load approved designs');
    } finally {
      setLoading(false);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard">
          <Button variant="ghost" className="text-tidal-muted hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Approved Designs
          </h1>
          <p className="text-tidal-muted">Your approved tattoo designs ready for the studio</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tidal-orange"></div>
          </div>
        ) : designs.length === 0 ? (
          <Card className="bg-tidal-navy-light border-tidal-blue/20 p-12 text-center">
            <p className="text-tidal-muted mb-4">No approved designs yet</p>
            <Link to="/request/new">
              <Button className="bg-tidal-orange hover:bg-tidal-orange/90 text-white">
                Create a Design Request
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <Card key={design.id} className="bg-tidal-navy-light border-tidal-blue/20 overflow-hidden group">
                <div className="relative aspect-square bg-tidal-navy">
                  <div className="absolute inset-0 flex items-center justify-center text-tidal-muted">
                    <p>Approved Design</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-tidal-navy via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-tidal-navy-light/80 backdrop-blur border-tidal-blue/20 mr-2"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-tidal-navy-light/80 backdrop-blur border-tidal-blue/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge>{design.design_request?.style}</Badge>
                    <Badge>{design.design_request?.placement}</Badge>
                  </div>
                  <p className="text-tidal-muted text-sm mb-3 line-clamp-2">
                    {design.design_request?.concept_description}
                  </p>
                  <Button className="w-full bg-tidal-orange hover:bg-tidal-orange/90 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-tidal-blue/20 text-tidal-muted">
      {children}
    </span>
  );
}

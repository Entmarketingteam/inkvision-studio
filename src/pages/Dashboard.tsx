import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, DesignRequest } from '@/lib/supabase';
import { StatusBadge } from '@/components/StatusBadge';
import { Plus, FileText, Clock, CheckCircle, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const { profile, signOut } = useAuth();
  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('design_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error loading requests:', error);
      toast.error('Failed to load design requests');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: requests.length,
    inProgress: requests.filter(r => ['submitted', 'generating', 'review', 'variations_requested'].includes(r.status)).length,
    approved: requests.filter(r => ['approved', 'stencil_ready'].includes(r.status)).length,
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error('Failed to sign out');
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
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Button variant="ghost" className="text-white hover:text-tidal-orange">
                  Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-white hover:text-tidal-orange"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Welcome back, {profile?.full_name || 'there'}
          </h1>
          <p className="text-tidal-muted">Manage your tattoo designs and track progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-tidal-navy-light border-tidal-blue/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-tidal-muted">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-tidal-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-tidal-navy-light border-tidal-blue/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-tidal-muted">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-tidal-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card className="bg-tidal-navy-light border-tidal-blue/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-tidal-muted">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-tidal-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Your Design Requests</h2>
          <Link to="/request/new">
            <Button className="bg-tidal-orange hover:bg-tidal-orange/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Design Request
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tidal-orange"></div>
          </div>
        ) : requests.length === 0 ? (
          <Card className="bg-tidal-navy-light border-tidal-blue/20">
            <CardContent className="py-12 text-center">
              <p className="text-tidal-muted mb-4">No design requests yet</p>
              <Link to="/request/new">
                <Button className="bg-tidal-orange hover:bg-tidal-orange/90 text-white">
                  Create Your First Design
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Link key={request.id} to={`/request/${request.id}`}>
                <Card className="bg-tidal-navy-light border-tidal-blue/20 hover:border-tidal-orange/50 transition-all duration-300 hover:shadow-glow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <StatusBadge status={request.status} />
                      <span className="text-xs text-tidal-muted">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-white text-lg line-clamp-2">
                      {request.concept_description.substring(0, 60)}...
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-tidal-blue/20 text-tidal-muted border-none">
                        {request.style}
                      </Badge>
                      <Badge className="bg-tidal-blue/20 text-tidal-muted border-none">
                        {request.placement}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${className}`}>
      {children}
    </span>
  );
}

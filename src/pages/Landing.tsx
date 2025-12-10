import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Eye, CheckCircle, Instagram } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        email,
        source: 'landing_page',
      });

      if (error) throw error;

      toast.success('Thanks! Check your inbox for inspiration');
      setEmail('');
    } catch (error: any) {
      if (error.code === '23505') {
        toast.info('You\'re already on our list!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-dark text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-dark/80 backdrop-blur-md border-b border-ink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-display font-bold">
              InkVision <span className="text-ink-red">Studio</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-ink-red">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-ink-red hover:bg-ink-red/90 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-red/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
            Your Vision,
            <br />
            <span className="text-ink-red">Our Artistry</span>
          </h1>
          <p className="text-xl sm:text-2xl text-ink-muted mb-12 max-w-3xl mx-auto animate-slide-up">
            AI-powered tattoo design concepts, refined by master artists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/register">
              <Button size="lg" className="bg-ink-red hover:bg-ink-red/90 text-white text-lg px-8 py-6 h-auto">
                Start Your Design
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-ink-border text-white hover:bg-ink-card text-lg px-8 py-6 h-auto">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ink-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-ink-card border border-ink-border hover:border-ink-red/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-16 h-16 bg-ink-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-ink-red" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Describe Your Vision</h3>
              <p className="text-ink-muted">
                Share your tattoo idea with as much detail as you'd like. Style, mood, placement, personal meaning.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-ink-card border border-ink-border hover:border-ink-red/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-16 h-16 bg-ink-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-ink-red" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Review AI Concepts</h3>
              <p className="text-ink-muted">
                Get 4 unique design concepts in minutes. Like favorites, request variations, or try new directions.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-ink-card border border-ink-border hover:border-ink-red/50 transition-all duration-300 hover:shadow-glow">
              <div className="w-16 h-16 bg-ink-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-ink-red" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Approve & Book</h3>
              <p className="text-ink-muted">
                Once you approve a design, our artist prepares your stencil and you book your appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Not Ready Yet?
          </h2>
          <p className="text-ink-muted mb-8 text-lg">
            Get inspiration and tattoo design tips in your inbox
          </p>
          <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-ink-card border-ink-border text-white placeholder:text-ink-muted h-12"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-ink-red hover:bg-ink-red/90 text-white h-12 px-8"
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-ink-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <a
              href="https://instagram.com/jz_tattoos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink-red transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          <p className="text-ink-muted">
            @jz_tattoos • Art on Main • Mt. Washington, KY
          </p>
          <p className="text-ink-muted text-sm mt-2">
            © 2024 InkVision Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

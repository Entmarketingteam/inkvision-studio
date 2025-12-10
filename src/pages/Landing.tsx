import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Eye, CheckCircle, Instagram, Anchor, Waves, Fish, Mail } from 'lucide-react';
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
    <div className="min-h-screen bg-tidal-navy text-tidal-cream">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-tidal-navy/90 backdrop-blur-md border-b border-tidal-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-display font-bold flex items-center gap-2">
              <Waves className="h-6 w-6 text-tidal-teal" />
              Tidal Ink <span className="text-tidal-teal">Tattoo</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-tidal-cream hover:text-tidal-teal">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-tidal-orange hover:bg-tidal-orange-light text-white">
                  Start Design
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tidal-navy via-tidal-navy-light to-tidal-blue/30"></div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-tidal-teal/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Fish className="h-20 w-20 text-tidal-teal mx-auto mb-4 drop-shadow-2xl animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
            Ride the Wave of
            <br />
            <span className="text-tidal-teal">Custom Ink</span>
          </h1>

          <p className="text-xl sm:text-2xl text-tidal-muted mb-12 max-w-3xl mx-auto animate-slide-up">
            AI-powered tattoo design concepts, refined by master artists.
            <br />
            See your ideas come to life before the needle touches skin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-tidal-orange hover:bg-tidal-orange-light text-white text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-tidal-orange/30 transition-all hover:scale-105"
              >
                <Waves className="mr-2 h-5 w-5" />
                Start Your Design
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-tidal-teal text-tidal-teal hover:bg-tidal-teal/10 text-lg px-8 py-6 h-auto rounded-xl"
            >
              View Portfolio
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full text-tidal-navy-light">
            <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-tidal-navy-light">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-tidal-cream mb-4">
            How It Works
          </h2>
          <p className="text-tidal-muted text-center mb-12 max-w-2xl mx-auto">
            From concept to custom ink in three simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-tidal-navy rounded-2xl p-8 border border-tidal-blue/20 hover:border-tidal-teal/50 transition-all group">
              <div className="w-16 h-16 bg-tidal-teal/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tidal-teal/30 transition-colors">
                <Sparkles className="h-8 w-8 text-tidal-teal" />
              </div>
              <div className="text-tidal-orange font-bold text-sm mb-2">STEP 01</div>
              <h3 className="text-xl font-bold text-tidal-cream mb-3">Describe Your Vision</h3>
              <p className="text-tidal-muted">
                Tell us your tattoo idea using our guided form. Select style, mood, size, and upload reference images.
              </p>
            </div>

            <div className="bg-tidal-navy rounded-2xl p-8 border border-tidal-blue/20 hover:border-tidal-teal/50 transition-all group">
              <div className="w-16 h-16 bg-tidal-teal/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tidal-teal/30 transition-colors">
                <Eye className="h-8 w-8 text-tidal-teal" />
              </div>
              <div className="text-tidal-orange font-bold text-sm mb-2">STEP 02</div>
              <h3 className="text-xl font-bold text-tidal-cream mb-3">Review AI Concepts</h3>
              <p className="text-tidal-muted">
                Get 4 unique design concepts in minutes. Like your favorites, request variations until it's perfect.
              </p>
            </div>

            <div className="bg-tidal-navy rounded-2xl p-8 border border-tidal-blue/20 hover:border-tidal-teal/50 transition-all group">
              <div className="w-16 h-16 bg-tidal-teal/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-tidal-teal/30 transition-colors">
                <CheckCircle className="h-8 w-8 text-tidal-teal" />
              </div>
              <div className="text-tidal-orange font-bold text-sm mb-2">STEP 03</div>
              <h3 className="text-xl font-bold text-tidal-cream mb-3">Approve & Book</h3>
              <p className="text-tidal-muted">
                Love it? Approve your design and schedule your appointment with our artist.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-tidal-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 120" className="w-full text-tidal-navy-light">
            <path fill="currentColor" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>

        <div className="max-w-xl mx-auto text-center px-4 relative z-10">
          <div className="w-16 h-16 bg-tidal-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-tidal-orange" />
          </div>
          <h2 className="text-3xl font-bold text-tidal-cream mb-4">Not Ready to Dive In?</h2>
          <p className="text-tidal-muted mb-8">
            Get tattoo inspiration, flash sales, and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-tidal-navy-light border-tidal-blue/30 text-tidal-cream placeholder:text-tidal-muted focus:border-tidal-teal h-12"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-tidal-orange hover:bg-tidal-orange-light text-white h-12 px-6"
            >
              <Anchor className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="text-tidal-muted-dark text-sm mt-4">
            No spam, just ink. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-tidal-navy-dark border-t border-tidal-blue/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Waves className="h-8 w-8 text-tidal-teal" />
                <span className="text-2xl font-display font-bold">
                  Tidal Ink <span className="text-tidal-teal">Tattoo</span>
                </span>
              </div>
              <p className="text-tidal-muted max-w-sm mb-4">
                Custom tattoo designs powered by AI, refined by master artists. Your vision, our artistry.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/tidalink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tidal-muted hover:text-tidal-teal transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-tidal-cream font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-tidal-muted hover:text-tidal-teal transition-colors">Start Design</Link></li>
                <li><Link to="/" className="text-tidal-muted hover:text-tidal-teal transition-colors">Gallery</Link></li>
                <li><Link to="/" className="text-tidal-muted hover:text-tidal-teal transition-colors">Book Appointment</Link></li>
                <li><Link to="/" className="text-tidal-muted hover:text-tidal-teal transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-tidal-cream font-semibold mb-4">Studio</h4>
              <ul className="space-y-2 text-tidal-muted text-sm">
                <li>Your Location Here</li>
                <li>(555) 123-4567</li>
                <li>hello@tidalink.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-tidal-blue/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-tidal-muted-dark text-sm">
              © 2024 Tidal Ink Tattoo. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="text-tidal-muted-dark hover:text-tidal-muted transition-colors">Privacy</Link>
              <Link to="/" className="text-tidal-muted-dark hover:text-tidal-muted transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

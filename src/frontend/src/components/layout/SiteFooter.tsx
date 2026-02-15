import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'fundgrowth';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <img
              src="/assets/generated/fundgrowth-logo.dim_512x192.png"
              alt="FUNDGROWTH"
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Invest with confidence. Secure, transparent, and accessible financial products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/bonds" className="hover:text-foreground transition-colors">Bonds</Link></li>
              <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How it Works</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} FUNDGROWTH. Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

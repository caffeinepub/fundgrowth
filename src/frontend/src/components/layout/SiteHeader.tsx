import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/LoginButton';
import { useAuth } from '@/hooks/useAuth';
import { useGetCallerUserProfile } from '@/hooks/useCallerProfile';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { data: userProfile } = useGetCallerUserProfile();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Bonds', path: '/bonds' },
    { label: 'How it Works', path: '/how-it-works' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ label: 'Dashboard', path: '/dashboard' });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/generated/fundgrowth-logo.dim_512x192.png"
                alt="FUNDGROWTH"
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: 'text-foreground' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && userProfile && (
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {userProfile.name}
              </span>
            )}
            <LoginButton />
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container-custom py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                activeProps={{ className: 'text-foreground' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

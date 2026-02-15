import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-20">
      <div className="container-custom max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            The page you're looking for doesn't exist or has been removed.
          </p>
          <p className="text-muted-foreground">
            We've recently updated our platform. Please return to the home page to explore our current offerings.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

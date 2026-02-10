import { Link } from '@tanstack/react-router';
import { useGetBondListings } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import BondCard from '../bonds/BondCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedBonds() {
  const { data: bonds, isLoading } = useGetBondListings();

  const featuredBonds = bonds?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Featured Bonds
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featuredBonds.length) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Featured Bonds
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our top-rated bond offerings with attractive returns and flexible tenures.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredBonds.map((bond, index) => (
            <BondCard key={index} bond={bond} bondId={index + 1} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/bonds">
              View All Bonds <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

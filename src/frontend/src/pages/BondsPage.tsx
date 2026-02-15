import { useState, useMemo } from 'react';
import { useGetBondListingsWithIds } from '@/hooks/useBonds';
import BondCard from '@/components/bonds/BondCard';
import BondFilters from '@/components/bonds/BondFilters';
import GoldOfferingsSection from '@/components/bonds/GoldOfferingsSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, TrendingUp } from 'lucide-react';
import type { BondListingWithId, RiskTag } from '../backend';

export default function BondsPage() {
  const { data: bonds, isLoading, error } = useGetBondListingsWithIds();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('coupon-high');
  const [selectedRiskTags, setSelectedRiskTags] = useState<RiskTag[]>([]);

  const filteredAndSortedBonds = useMemo(() => {
    if (!bonds) return [];

    let filtered = [...bonds];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((bond) =>
        bond.listing.issuer.toLowerCase().includes(query)
      );
    }

    // Apply risk tag filter
    if (selectedRiskTags.length > 0) {
      filtered = filtered.filter((bond) =>
        bond.listing.riskTags.some((tag) => selectedRiskTags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'coupon-high':
          return b.listing.couponRate - a.listing.couponRate;
        case 'coupon-low':
          return a.listing.couponRate - b.listing.couponRate;
        case 'tenure-short':
          return Number(a.listing.tenure) - Number(b.listing.tenure);
        case 'tenure-long':
          return Number(b.listing.tenure) - Number(a.listing.tenure);
        case 'investment-low':
          return Number(a.listing.minInvestment) - Number(b.listing.minInvestment);
        case 'investment-high':
          return Number(b.listing.minInvestment) - Number(a.listing.minInvestment);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bonds, searchQuery, sortBy, selectedRiskTags]);

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display mb-4">Bond Catalog</h1>
          <p className="text-lg text-muted-foreground">
            Explore our curated selection of investment-grade bonds with attractive returns.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load bond listings. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <BondFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              selectedRiskTags={selectedRiskTags}
              onRiskTagsChange={setSelectedRiskTags}
            />
          </aside>

          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                  </div>
                ))}
              </div>
            ) : filteredAndSortedBonds.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bonds found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || selectedRiskTags.length > 0
                    ? 'Try adjusting your filters to see more results.'
                    : 'No bond listings are currently available.'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredAndSortedBonds.length} bond{filteredAndSortedBonds.length !== 1 ? 's' : ''}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredAndSortedBonds.map((bond) => (
                    <BondCard key={bond.bondId} bond={bond} />
                  ))}
                </div>
              </>
            )}

            <GoldOfferingsSection />
          </main>
        </div>
      </div>
    </div>
  );
}

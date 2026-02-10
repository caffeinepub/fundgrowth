import { useState, useMemo } from 'react';
import { useGetBondListings } from '@/hooks/useQueries';
import BondCard from '../components/bonds/BondCard';
import BondFilters from '../components/bonds/BondFilters';
import { RiskTag } from '../backend';

export default function BondsPage() {
  const { data: bonds, isLoading } = useGetBondListings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskTags, setSelectedRiskTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('coupon-desc');

  const filteredAndSortedBonds = useMemo(() => {
    if (!bonds) return [];

    let filtered = [...bonds];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((bond) =>
        bond.issuer.toLowerCase().includes(query)
      );
    }

    // Risk tag filter
    if (selectedRiskTags.length > 0) {
      filtered = filtered.filter((bond) =>
        bond.riskTags.some((tag) => selectedRiskTags.includes(RiskTag[tag]))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'coupon-desc':
          return b.couponRate - a.couponRate;
        case 'coupon-asc':
          return a.couponRate - b.couponRate;
        case 'tenure-asc':
          return Number(a.tenure) - Number(b.tenure);
        case 'tenure-desc':
          return Number(b.tenure) - Number(a.tenure);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bonds, searchQuery, selectedRiskTags, sortBy]);

  const handleRiskTagToggle = (tag: string) => {
    setSelectedRiskTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRiskTags([]);
    setSortBy('coupon-desc');
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
            Browse Bonds
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our curated selection of high-quality corporate bonds.
          </p>
        </div>

        <div className="mb-8">
          <BondFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedRiskTags={selectedRiskTags}
            onRiskTagToggle={handleRiskTagToggle}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredAndSortedBonds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No bonds found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedBonds.map((bond, index) => (
              <BondCard key={index} bond={bond} bondId={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

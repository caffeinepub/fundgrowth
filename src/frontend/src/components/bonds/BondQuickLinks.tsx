import { Link } from '@tanstack/react-router';
import { useGetBondListingsWithIds } from '@/hooks/useBonds';
import { Loader2 } from 'lucide-react';

interface BondQuickLinksProps {
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

export default function BondQuickLinks({ onNavigate, variant = 'desktop' }: BondQuickLinksProps) {
  const { data: bonds, isLoading, isError } = useGetBondListingsWithIds();

  // Loading state
  if (isLoading) {
    return variant === 'desktop' ? (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Loading bonds...</span>
      </div>
    ) : null;
  }

  // Error state - hide section
  if (isError) {
    return null;
  }

  // Empty state - hide section
  if (!bonds || bonds.length === 0) {
    return null;
  }

  // Desktop variant - horizontal scrollable list
  if (variant === 'desktop') {
    return (
      <div className="flex items-center gap-1 max-w-2xl overflow-x-auto scrollbar-hide">
        {bonds.map((bond) => (
          <Link
            key={bond.bondId}
            to="/bonds/$bondId"
            params={{ bondId: bond.bondId.toString() }}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap px-3 py-1 rounded-md hover:bg-accent"
            onClick={onNavigate}
          >
            {bond.listing.issuer}
          </Link>
        ))}
      </div>
    );
  }

  // Mobile variant - vertical list with max height
  return (
    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
        Quick Access
      </div>
      {bonds.map((bond) => (
        <Link
          key={bond.bondId}
          to="/bonds/$bondId"
          params={{ bondId: bond.bondId.toString() }}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 px-2 rounded-md hover:bg-accent"
          onClick={onNavigate}
        >
          {bond.listing.issuer}
        </Link>
      ))}
    </div>
  );
}

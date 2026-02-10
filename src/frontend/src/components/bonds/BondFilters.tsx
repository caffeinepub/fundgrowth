import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BondFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRiskTags: string[];
  onRiskTagToggle: (tag: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

const riskTagOptions = [
  { value: 'secured', label: 'Secured' },
  { value: 'unsecured', label: 'Unsecured' },
  { value: 'seniorSecured', label: 'Senior Secured' },
  { value: 'securedByMovableAssets', label: 'Asset-Backed' },
];

export default function BondFilters({
  searchQuery,
  onSearchChange,
  selectedRiskTags,
  onRiskTagToggle,
  sortBy,
  onSortChange,
  onClearFilters,
}: BondFiltersProps) {
  const hasActiveFilters = searchQuery || selectedRiskTags.length > 0 || sortBy !== 'coupon-desc';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Search bonds</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by issuer or name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Label htmlFor="sort" className="sr-only">Sort by</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coupon-desc">Highest Yield</SelectItem>
              <SelectItem value="coupon-asc">Lowest Yield</SelectItem>
              <SelectItem value="tenure-asc">Shortest Tenure</SelectItem>
              <SelectItem value="tenure-desc">Longest Tenure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Risk Profile</Label>
        <div className="flex flex-wrap gap-2">
          {riskTagOptions.map((option) => (
            <Badge
              key={option.value}
              variant={selectedRiskTags.includes(option.value) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onRiskTagToggle(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}

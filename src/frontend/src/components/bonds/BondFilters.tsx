import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RiskTag } from '../../backend';
import { getRiskTagLabel } from '@/lib/formatters';
import { Search } from 'lucide-react';

interface BondFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedRiskTags: RiskTag[];
  onRiskTagsChange: (tags: RiskTag[]) => void;
}

export default function BondFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedRiskTags,
  onRiskTagsChange,
}: BondFiltersProps) {
  const allRiskTags = [
    RiskTag.secured,
    RiskTag.unsecured,
    RiskTag.seniorSecured,
    RiskTag.securedByMovableAssets,
  ];

  const handleRiskTagToggle = (tag: RiskTag) => {
    if (selectedRiskTags.includes(tag)) {
      onRiskTagsChange(selectedRiskTags.filter((t) => t !== tag));
    } else {
      onRiskTagsChange([...selectedRiskTags, tag]);
    }
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="search">Search Bonds</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="Search by issuer name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="coupon-high">Coupon Rate (High to Low)</SelectItem>
            <SelectItem value="coupon-low">Coupon Rate (Low to High)</SelectItem>
            <SelectItem value="tenure-short">Tenure (Short to Long)</SelectItem>
            <SelectItem value="tenure-long">Tenure (Long to Short)</SelectItem>
            <SelectItem value="investment-low">Min. Investment (Low to High)</SelectItem>
            <SelectItem value="investment-high">Min. Investment (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Risk Tags</Label>
        <div className="space-y-2">
          {allRiskTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`risk-${tag}`}
                checked={selectedRiskTags.includes(tag)}
                onCheckedChange={() => handleRiskTagToggle(tag)}
              />
              <label
                htmlFor={`risk-${tag}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {getRiskTagLabel(tag)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BondListing } from '../../backend';
import { formatCurrency, formatCouponRate, formatTenure, getRatingColor, getRiskTagLabel } from '@/lib/formatters';
import { TrendingUp, Clock, Shield } from 'lucide-react';

interface BondCardProps {
  bond: BondListing;
  bondId: number;
}

export default function BondCard({ bond, bondId }: BondCardProps) {
  const statusLabel = bond.status.__kind__ === 'active' ? 'Active' : 'Closed';
  const statusVariant = bond.status.__kind__ === 'active' ? 'default' : 'secondary';

  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{bond.issuer}</CardTitle>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={`font-semibold ${getRatingColor(bond.rating)}`}>
            {String.fromCharCode(bond.rating)} Rated
          </span>
          <span>•</span>
          <span>{bond.ratingAgency}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-accent mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Coupon Rate</div>
              <div className="font-semibold text-accent">{formatCouponRate(bond.couponRate)}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Tenure</div>
              <div className="font-semibold">{formatTenure(bond.tenure)}</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Risk Profile</div>
            <div className="flex flex-wrap gap-1">
              {bond.riskTags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {getRiskTagLabel(tag)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="text-sm text-muted-foreground">Minimum Investment</div>
          <div className="text-lg font-semibold">{formatCurrency(bond.minInvestment)}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link to="/bonds/$bondId" params={{ bondId: String(bondId) }}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatCouponRate, formatTenure, getRatingColor, getRiskTagLabel } from '@/lib/formatters';
import type { BondListingWithId } from '../../backend';
import { TrendingUp, Calendar, Shield } from 'lucide-react';

interface BondCardProps {
  bond: BondListingWithId;
}

export default function BondCard({ bond }: BondCardProps) {
  const { bondId, listing } = bond;
  const rating = String.fromCharCode(listing.rating);

  return (
    <Link 
      to="/bonds/$bondId" 
      params={{ bondId: bondId.toString() }}
      className="block"
    >
      <Card className="h-full hover:shadow-medium transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg">{listing.issuer}</CardTitle>
            <Badge variant="outline" className={getRatingColor(listing.rating)}>
              {rating} Rated
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{listing.ratingAgency}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Coupon Rate</p>
                <p className="font-semibold text-primary">{formatCouponRate(listing.couponRate)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Tenure</p>
                <p className="font-semibold">{formatTenure(listing.tenure)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Minimum Investment</p>
              <p className="font-semibold">{formatCurrency(listing.minInvestment)}</p>
            </div>
          </div>

          {listing.riskTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {listing.riskTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {getRiskTagLabel(tag)}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

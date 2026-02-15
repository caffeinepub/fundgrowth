import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { useGetBondListing } from '@/hooks/useBonds';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  formatCurrency,
  formatCouponRate,
  formatTenure,
  formatDate,
  getRatingColor,
  getRiskTagLabel,
} from '@/lib/formatters';
import { ArrowLeft, AlertCircle, TrendingUp, Calendar, Shield, Building2, FileText } from 'lucide-react';
import { RedemptionType, RepaymentFrequency } from '../backend';

function getRedemptionTypeLabel(type: RedemptionType): string {
  const labels: Record<RedemptionType, string> = {
    [RedemptionType.bulletRepayment]: 'Bullet Repayment',
    [RedemptionType.staggeredRedemption]: 'Staggered Redemption',
    [RedemptionType.prepayment]: 'Prepayment',
  };
  return labels[type] || String(type);
}

function getRepaymentFrequencyLabel(freq: RepaymentFrequency): string {
  const labels: Record<RepaymentFrequency, string> = {
    [RepaymentFrequency.monthly]: 'Monthly',
    [RepaymentFrequency.quarterly]: 'Quarterly',
    [RepaymentFrequency.annually]: 'Annually',
  };
  return labels[freq] || String(freq);
}

function getBondStatusLabel(status: any): string {
  if (status.__kind__ === 'active') return 'Active';
  if (status.__kind__ === 'matured') return 'Matured';
  if (status.__kind__ === 'fullyRedeemed') return 'Fully Redeemed';
  if (status.__kind__ === 'defaulted') return 'Defaulted';
  return 'Unknown';
}

export default function BondDetailPage() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const bondId = params.bondId ? parseInt(params.bondId, 10) : 0;
  const { data: bond, isLoading, error } = useGetBondListing(bondId);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container-custom max-w-4xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load bond details. Please try again later.
            </AlertDescription>
          </Alert>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/bonds">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bonds
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!bond) {
    return (
      <div className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bond Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The bond you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/bonds">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bonds
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const rating = String.fromCharCode(bond.rating);
  const statusLabel = getBondStatusLabel(bond.status);
  const isActive = bond.status.__kind__ === 'active';

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/bonds">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bonds
          </Link>
        </Button>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-4xl font-bold font-display">{bond.issuer}</h1>
              <Badge variant={isActive ? 'default' : 'secondary'}>{statusLabel}</Badge>
            </div>
            <p className="text-lg text-muted-foreground">{bond.ratingAgency}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Key Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Coupon Rate</p>
                <p className="text-2xl font-bold text-primary">{formatCouponRate(bond.couponRate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rating</p>
                <p className={`text-2xl font-bold ${getRatingColor(bond.rating)}`}>{rating}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tenure</p>
                <p className="text-xl font-semibold">{formatTenure(bond.tenure)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Minimum Investment</p>
                <p className="text-xl font-semibold">{formatCurrency(bond.minInvestment)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Face Value</p>
                <p className="text-xl font-semibold">{formatCurrency(bond.faceValue)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Launch Date</p>
                <p className="text-xl font-semibold">{formatDate(bond.launchDate)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Bond Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Coupon Type</p>
                  <p className="font-semibold">
                    {bond.couponType.__kind__ === 'zeroCoupon' ? 'Zero Coupon' : `Coupon (${formatCouponRate(bond.couponRate)})`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Repayment Frequency</p>
                  <p className="font-semibold">{getRepaymentFrequencyLabel(bond.repaymentFrequency)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Redemption Type</p>
                  <p className="font-semibold">{getRedemptionTypeLabel(bond.redemptionType)}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Risk Tags</p>
                <div className="flex flex-wrap gap-2">
                  {bond.riskTags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {getRiskTagLabel(tag)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {isActive && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Ready to invest?</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with as low as {formatCurrency(bond.minInvestment)}
                    </p>
                  </div>
                  <Button size="lg" disabled>
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

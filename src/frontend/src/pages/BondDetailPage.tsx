import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { useGetBondListing } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, TrendingUp, Clock, Shield, DollarSign, Calendar, FileText } from 'lucide-react';
import { formatCurrency, formatCouponRate, formatTenure, formatDate, getRatingColor, getRiskTagLabel } from '@/lib/formatters';
import { useAuth } from '@/hooks/useAuth';
import { RepaymentFrequency, RedemptionType } from '../backend';

export default function BondDetailPage() {
  const { bondId } = useParams({ from: '/bonds/$bondId' });
  const navigate = useNavigate();
  const { isAuthenticated, login, isLoggingIn } = useAuth();
  const { data: bond, isLoading } = useGetBondListing(Number(bondId));

  const handleInvest = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    navigate({ to: '/invest/$bondId', params: { bondId } });
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (!bond) {
    return (
      <div className="py-12">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Bond Not Found</h1>
          <Button asChild>
            <Link to="/bonds">Back to Bonds</Link>
          </Button>
        </div>
      </div>
    );
  }

  const statusLabel = bond.status.__kind__ === 'active' ? 'Active' : 'Closed';
  const statusVariant = bond.status.__kind__ === 'active' ? 'default' : 'secondary';
  const isActive = bond.status.__kind__ === 'active';

  const getRepaymentFrequencyLabel = (freq: RepaymentFrequency): string => {
    switch (freq) {
      case RepaymentFrequency.quarterly:
        return 'Quarterly';
      case RepaymentFrequency.monthly:
        return 'Monthly';
      case RepaymentFrequency.annually:
        return 'Annually';
      default:
        return 'Unknown';
    }
  };

  const getRedemptionTypeLabel = (type: RedemptionType): string => {
    switch (type) {
      case RedemptionType.bulletRepayment:
        return 'Bullet repayment';
      case RedemptionType.staggeredRedemption:
        return 'Staggered';
      case RedemptionType.prepayment:
        return 'Prepayment option';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link to="/bonds">
            <ArrowLeft className="h-4 w-4" />
            Back to Bonds
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">{bond.issuer}</CardTitle>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`font-semibold ${getRatingColor(bond.rating)}`}>
                        {String.fromCharCode(bond.rating)} Rated
                      </span>
                      <span className="text-muted-foreground">by {bond.ratingAgency}</span>
                    </div>
                  </div>
                  <Badge variant={statusVariant} className="text-sm">
                    {statusLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Coupon Rate</div>
                      <div className="text-2xl font-bold text-accent">{formatCouponRate(bond.couponRate)}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getRepaymentFrequencyLabel(bond.repaymentFrequency)} payments
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Tenure</div>
                      <div className="text-2xl font-bold">{formatTenure(bond.tenure)}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getRedemptionTypeLabel(bond.redemptionType)}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold mb-2">Risk Profile</div>
                      <div className="flex flex-wrap gap-2">
                        {bond.riskTags.map((tag, idx) => (
                          <Badge key={idx} variant="outline">
                            {getRiskTagLabel(tag)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Face Value</div>
                      <div className="text-muted-foreground">{formatCurrency(bond.faceValue)}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Launch Date</div>
                      <div className="text-muted-foreground">{formatDate(bond.launchDate)}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Coupon Type</div>
                      <div className="text-muted-foreground">
                        {bond.couponType.__kind__ === 'zeroCoupon' ? 'Zero Coupon' : 'Regular Coupon'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Minimum Investment</div>
                  <div className="text-2xl font-bold">{formatCurrency(bond.minInvestment)}</div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Return</span>
                    <span className="font-semibold">{formatCouponRate(bond.couponRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investment Period</span>
                    <span className="font-semibold">{formatTenure(bond.tenure)}</span>
                  </div>
                </div>
                <Button
                  onClick={handleInvest}
                  disabled={!isActive || isLoggingIn}
                  className="w-full"
                  size="lg"
                >
                  {!isActive ? 'Not Available' : isLoggingIn ? 'Signing in...' : isAuthenticated ? 'Invest Now' : 'Sign In to Invest'}
                </Button>
                {!isAuthenticated && (
                  <p className="text-xs text-center text-muted-foreground">
                    Sign in to start investing in this bond
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

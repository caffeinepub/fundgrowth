import { useState } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetBondListing, useInvest } from '@/hooks/useQueries';
import AuthGate from '../components/auth/AuthGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatCouponRate, formatTenure } from '@/lib/formatters';
import { toast } from 'sonner';

export default function InvestPage() {
  return (
    <AuthGate>
      <InvestPageContent />
    </AuthGate>
  );
}

function InvestPageContent() {
  const { bondId } = useParams({ from: '/invest/$bondId' });
  const navigate = useNavigate();
  const { data: bond, isLoading } = useGetBondListing(Number(bondId));
  const invest = useInvest();

  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'amount' | 'review' | 'success'>('amount');

  const parsedAmount = amount ? Number(amount) : 0;
  const minInvestment = bond ? Number(bond.minInvestment) : 0;
  const isValidAmount = parsedAmount >= minInvestment && parsedAmount > 0;

  const handleContinue = () => {
    if (!isValidAmount) {
      toast.error(`Minimum investment is ${formatCurrency(minInvestment)}`);
      return;
    }
    setStep('review');
  };

  const handleConfirm = async () => {
    if (!bond) return;

    try {
      await invest.mutateAsync({
        bondId: Number(bondId),
        amount: BigInt(parsedAmount),
        diversification: { __kind__: 'investmentAmount', investmentAmount: BigInt(parsedAmount) },
      });
      setStep('success');
    } catch (error) {
      toast.error('Investment failed. Please try again.');
      console.error('Investment error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom max-w-2xl">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (!bond) {
    return (
      <div className="py-12">
        <div className="container-custom max-w-2xl text-center">
          <h1 className="text-2xl font-bold mb-4">Bond Not Found</h1>
          <Button asChild>
            <Link to="/bonds">Back to Bonds</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="py-12">
        <div className="container-custom max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Investment Successful!</CardTitle>
              <CardDescription>
                Your investment in {bond.issuer} has been confirmed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bond</span>
                  <span className="font-semibold">{bond.issuer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Investment Amount</span>
                  <span className="font-semibold">{formatCurrency(parsedAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Return</span>
                  <span className="font-semibold text-accent">{formatCouponRate(bond.couponRate)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/bonds/$bondId" params={{ bondId }}>View Bond</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom max-w-2xl">
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link to="/bonds/$bondId" params={{ bondId }}>
            <ArrowLeft className="h-4 w-4" />
            Back to Bond Details
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 'amount' ? 'Enter Investment Amount' : 'Review Your Investment'}
            </CardTitle>
            <CardDescription>
              {step === 'amount'
                ? `Minimum investment: ${formatCurrency(minInvestment)}`
                : 'Please review the details before confirming'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="font-semibold text-lg">{bond.issuer}</div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{formatCouponRate(bond.couponRate)} p.a.</span>
                <span>•</span>
                <span>{formatTenure(bond.tenure)}</span>
                <span>•</span>
                <span>{String.fromCharCode(bond.rating)} Rated</span>
              </div>
            </div>

            {step === 'amount' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Min. ${formatCurrency(minInvestment)}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={minInvestment}
                    step="1000"
                  />
                  {amount && !isValidAmount && (
                    <p className="text-sm text-destructive">
                      Amount must be at least {formatCurrency(minInvestment)}
                    </p>
                  )}
                </div>
                <Button onClick={handleContinue} disabled={!isValidAmount} className="w-full">
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investment Amount</span>
                    <span className="font-semibold">{formatCurrency(parsedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coupon Rate</span>
                    <span className="font-semibold text-accent">{formatCouponRate(bond.couponRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenure</span>
                    <span className="font-semibold">{formatTenure(bond.tenure)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Estimated Annual Return</span>
                    <span className="font-bold text-accent">
                      {formatCurrency(Math.floor(parsedAmount * (bond.couponRate / 10000)))}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('amount')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleConfirm} disabled={invest.isPending} className="flex-1">
                    {invest.isPending ? 'Confirming...' : 'Confirm Investment'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

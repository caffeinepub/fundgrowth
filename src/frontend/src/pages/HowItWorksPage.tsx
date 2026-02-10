import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Search, DollarSign, TrendingUp } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your account using Internet Identity for secure, passwordless authentication.',
    },
    {
      icon: Search,
      title: 'Browse Bonds',
      description: 'Explore our curated selection of high-quality corporate bonds with detailed information on ratings, returns, and tenures.',
    },
    {
      icon: DollarSign,
      title: 'Invest',
      description: 'Choose a bond that matches your investment goals and invest with amounts starting from ₹10,000.',
    },
    {
      icon: TrendingUp,
      title: 'Track & Earn',
      description: 'Monitor your investments through your dashboard and receive regular coupon payments as per the bond schedule.',
    },
  ];

  return (
    <div className="py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            How FUNDGROWTH Works
          </h1>
          <p className="text-lg text-muted-foreground">
            Start investing in bonds in four simple steps
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Why Invest in Bonds?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Fixed Returns</h3>
                <p className="text-sm opacity-90">
                  Earn predictable returns with fixed coupon rates, unlike volatile equity markets.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Lower Risk</h3>
                <p className="text-sm opacity-90">
                  Bonds are generally less risky than stocks, especially those with high credit ratings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Portfolio Diversification</h3>
                <p className="text-sm opacity-90">
                  Add stability to your investment portfolio by balancing equity exposure with fixed income.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GoldOffering {
  name: string;
  details: string;
  isPremium?: boolean;
}

const goldOfferings: GoldOffering[] = [
  {
    name: 'GoldSecure Capital Protection',
    details: '10.75% p.a. | 1 Year | Annual | Low Risk',
  },
  {
    name: 'GoldShield Regular Income',
    details: '12.50% p.a. | Monthly | 2 Years',
  },
  {
    name: 'GoldGrowth Wealth Builder',
    details: '14.25% p.a. | Compounding | 3 Years',
  },
  {
    name: 'GoldPlus Long Term Wealth',
    details: '15.75% p.a. | Compounding | 5 Years',
  },
  {
    name: 'GoldPlatinum WealthSecure (Premium)',
    details: '17.50% p.a. | Compounding | HNI | ₹5L+',
    isPremium: true,
  },
];

export default function GoldOfferingsSection() {
  return (
    <section className="mt-16 pt-12 border-t">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-display mb-3">Gold-Backed Investment Plans</h2>
        <p className="text-lg text-muted-foreground">
          Secure your wealth with our gold-backed investment offerings featuring competitive returns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goldOfferings.map((offering, index) => (
          <Card key={index} className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">
                    {offering.name}
                  </CardTitle>
                  {offering.isPremium && (
                    <Badge variant="secondary" className="mt-2">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {offering.details}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

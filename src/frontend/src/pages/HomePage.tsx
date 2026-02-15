import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, Clock, FileText, BarChart3, HeadphonesIcon } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Investments',
      description: 'All offerings are carefully vetted and rated by leading agencies for your peace of mind.',
    },
    {
      icon: TrendingUp,
      title: 'Attractive Returns',
      description: 'Earn competitive fixed returns with investment products offering yields up to 12% per annum.',
    },
    {
      icon: Clock,
      title: 'Flexible Tenures',
      description: 'Choose from a variety of tenures ranging from 12 to 60 months to match your goals.',
    },
    {
      icon: FileText,
      title: 'Transparent Process',
      description: 'Complete visibility into product details, ratings, and repayment schedules.',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments and track returns in real-time through your dashboard.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Support',
      description: 'Our team is here to help you make informed investment decisions.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight">
                Invest with{' '}
                <span className="text-primary">Confidence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Access high-quality investment opportunities with attractive returns. Start building a secure financial future with FUNDGROWTH.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/how-it-works">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/faq">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-primary">8-12%</div>
                  <div className="text-sm text-muted-foreground">Annual Returns</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-2xl font-bold text-primary">₹10,000</div>
                  <div className="text-sm text-muted-foreground">Min. Investment</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Transparent</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/fundgrowth-hero-illustration-generic-investing.dim_1600x900.png"
                alt="Investment Illustration"
                className="w-full h-auto rounded-lg shadow-strong"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Why Choose FUNDGROWTH?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make investing simple, secure, and accessible for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of investors who trust FUNDGROWTH for their investment needs.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link to="/how-it-works">
              Learn How It Works <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

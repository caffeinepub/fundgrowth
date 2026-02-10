import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="py-12">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help you with your investment journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Email</div>
                    <a href="mailto:support@fundgrowth.in" className="text-sm text-muted-foreground hover:text-primary">
                      support@fundgrowth.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Phone</div>
                    <a href="tel:+911234567890" className="text-sm text-muted-foreground hover:text-primary">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Address</div>
                    <p className="text-sm text-muted-foreground">
                      Mumbai, Maharashtra<br />
                      India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-sm opacity-90">
                  Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                  Saturday: 10:00 AM - 4:00 PM IST<br />
                  Sunday: Closed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface AuthGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AuthGate({ children, fallback }: AuthGateProps) {
  const { isAuthenticated, login, isLoggingIn } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access this feature and manage your investments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full"
            >
              {isLoggingIn ? 'Signing in...' : 'Sign In with Internet Identity'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

export default function LoginButton() {
  const { isAuthenticated, login, logout, isLoggingIn } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? 'outline' : 'default'}
      size="sm"
      className="gap-2"
    >
      {isLoggingIn ? (
        'Signing in...'
      ) : isAuthenticated ? (
        <>
          <LogOut className="h-4 w-4" />
          Sign Out
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Sign In
        </>
      )}
    </Button>
  );
}

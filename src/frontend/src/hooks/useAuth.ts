import { useInternetIdentity } from './useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export function useAuth() {
  const { identity, login: iiLogin, clear, loginStatus, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const login = useCallback(async () => {
    try {
      await iiLogin();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => iiLogin(), 300);
      }
    }
  }, [iiLogin, clear]);

  const logout = useCallback(async () => {
    await clear();
    queryClient.clear();
  }, [clear, queryClient]);

  return {
    identity,
    isAuthenticated,
    login,
    logout,
    loginStatus,
    isLoggingIn,
  };
}

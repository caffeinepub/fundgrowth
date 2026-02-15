import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PortfolioSummary } from '../backend';

export function useGetUserPortfolio() {
  const { actor, isFetching } = useActor();

  return useQuery<PortfolioSummary>({
    queryKey: ['userPortfolio'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserPortfolio();
    },
    enabled: !!actor && !isFetching,
  });
}

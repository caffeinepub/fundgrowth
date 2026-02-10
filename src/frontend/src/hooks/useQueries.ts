import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BondListing, PortfolioSummary, Diversification } from '../backend';

export function useGetBondListings() {
  const { actor, isFetching } = useActor();

  return useQuery<BondListing[]>({
    queryKey: ['bondListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBondListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBondListing(bondId: number | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<BondListing | null>({
    queryKey: ['bondListing', bondId],
    queryFn: async () => {
      if (!actor || bondId === undefined) return null;
      return actor.getBondListing(bondId);
    },
    enabled: !!actor && !isFetching && bondId !== undefined,
  });
}

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

export function useInvest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bondId,
      amount,
      diversification,
    }: {
      bondId: number;
      amount: bigint;
      diversification: Diversification;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.invest(bondId, amount, diversification);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPortfolio'] });
      queryClient.invalidateQueries({ queryKey: ['bondListings'] });
    },
  });
}

export function useInitializeDefaultBonds() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.initializeDefaultBonds();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bondListings'] });
    },
  });
}

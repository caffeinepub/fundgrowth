import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BondListingWithId, BondListing } from '../backend';

export function useGetBondListingsWithIds() {
  const { actor, isFetching } = useActor();

  return useQuery<BondListingWithId[]>({
    queryKey: ['bondListingsWithIds'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBondListingsWithIds();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBondListing(bondId: number) {
  const { actor, isFetching } = useActor();

  return useQuery<BondListing | null>({
    queryKey: ['bondListing', bondId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBondListing(bondId);
    },
    enabled: !!actor && !isFetching && bondId > 0,
  });
}

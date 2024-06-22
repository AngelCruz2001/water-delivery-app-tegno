import {useQuery} from '@tanstack/react-query';
import {
  OptimizedRoute,
  TDisplayEnrichedRoute,
  TDisplayRoute,
  TGetOptimizedRoute,
} from '../../../interfaces/routers';
import {RouteState, useRoutesStore} from '../../../store/routes/useRoutesStore';
import {useEffect} from 'react';
import {
  fetchRouteByUserId,
  fetchRouteOptimized,
} from '../../../store/routes/api/fetchRoutes';

export function useGetOptimizedRoutes(params: TGetOptimizedRoute): {
  optimizedRoute: OptimizedRoute[] | null;
  isLoading: boolean;
  isError: boolean;
} {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['routes/optimized'],
    queryFn: () => fetchRouteOptimized(params),
    refetchOnMount: 'always',
  });

  const {optimizedRoute, setOptimizedRoute} = useRoutesStore(
    (state: RouteState) => state,
  );

  useEffect(() => {
    if (data) {
      setOptimizedRoute(data);
    }
  }, [data, setOptimizedRoute]);

  if (isError) {
    console.log(error?.message);
  }

  return {optimizedRoute, isLoading, isError};
}

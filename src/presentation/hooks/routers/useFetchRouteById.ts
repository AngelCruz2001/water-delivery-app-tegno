import {useQuery} from '@tanstack/react-query';
import {
  TDisplayEnrichedRoute,
  TDisplayRoute,
} from '../../../interfaces/routers';
import {RouteState, useRoutesStore} from '../../../store/routes/useRoutesStore';
import {useEffect} from 'react';
import {fetchRouteById} from '../../../store/routes/api/fetchRoutes';

export function useFetchRouteById(id: string): {
  activeRoute: TDisplayEnrichedRoute | null;
  isLoading: boolean;
  isError: boolean;
} {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['routes/enriched', id],
    queryFn: () => fetchRouteById(id),
    refetchOnMount: 'always',
  });

  const {activeRoute, setActiveRoute} = useRoutesStore(
    (state: RouteState) => state,
  );

  useEffect(() => {
    if (data) {
      setActiveRoute(data);
    }
  }, [data, setActiveRoute]);

  return {activeRoute, isLoading, isError};
}

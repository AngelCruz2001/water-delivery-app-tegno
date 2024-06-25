import {useQuery} from '@tanstack/react-query';
import {TDisplayRoute} from '../../../interfaces/routers';
import {fetchRoutes} from '../../../store/routes';
import {RouteState, useRoutesStore} from '../../../store/routes/useRoutesStore';
import { useEffect } from 'react';

export function useFetchRouteById(id: string): {
  route: TDisplayRoute;
  isLoading: boolean;
  isError: boolean;
} {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['routes/enriched', id],
    queryFn: fetchRoutes,
    refetchOnMount: 'always',
  });

  const {routes, setRoutes} = useRoutesStore((state: RouteState) => state);

  useEffect(() => {
    if (data) {
      setRoutes(data);
    }
  }, [data, setRoutes]);

  return {routes, isLoading, isError};
}

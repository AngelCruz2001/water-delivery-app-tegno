import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {TDisplayRoute} from '../../../interfaces/routers';
import {fetchRoutes} from '../../../store/routes/api/fetchRoutes';
import {RouteState, useRoutesStore} from '../../../store/routes/useRoutesStore';

export function useGetRouters(): {
  routes: TDisplayRoute[];
  isLoading: boolean;
  isError: boolean;
} {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['routes/enriched'],
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

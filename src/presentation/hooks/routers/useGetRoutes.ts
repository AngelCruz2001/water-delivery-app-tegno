import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import {useCallback, useEffect} from 'react';
import {TDisplayRoute} from '../../../interfaces/routers';
import {fetchRoutes} from '../../../store/routes/api/fetchRoutes';
import {RouteState, useRoutesStore} from '../../../store/routes/useRoutesStore';
import {useFocusEffect} from '@react-navigation/native';

export function useGetRoutes(): {
  routes: TDisplayRoute[];
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
} {
  const {data, isLoading, isError, refetch} = useQuery({
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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return {routes, isLoading, isError, refetch};
}

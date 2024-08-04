import {QueryObserverResult, RefetchOptions, useQuery} from '@tanstack/react-query';
import {
  TDisplayEnrichedRoute,
  TDisplayRoute,
} from '../../../interfaces/routers';
import {RouteState, useRoutesStore} from '../../../store/routes/useRoutesStore';
import {useEffect} from 'react';
import {fetchRouteByUserId} from '../../../store/routes/api/fetchRoutes';

export function useFetchRouteByUserId(id: string): {
  routeOnView: TDisplayRoute | null;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
} {
  const {data, isLoading, isError, error, refetch} = useQuery({
    queryKey: [`routes/driver/${id}`],
    queryFn: () => fetchRouteByUserId(id),
    refetchOnMount: 'always',
  });

  const {routeOnView, setRouteOnView} = useRoutesStore(
    (state: RouteState) => state,
  );

  useEffect(() => {
    if (data) {
      console.log("change")
      setRouteOnView(data);
    }
  }, [data, setRouteOnView]);

  if (isError) {
    console.log(error?.message);
  }

  return {routeOnView, isLoading, isError, refetch};
}

import {useState, useEffect} from 'react';
import {useFetchRouteByUserId} from '../../hooks/routers/useFetchRouteByUserId';
import {TDisplayRoute, TWaypoint} from '../../../interfaces/routers';
import {TProduct} from '../../../interfaces/products';
import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query';

interface UseRouteOnViewResult {
  routeOnView: TDisplayRoute | null;
  waypointsInfo: TWaypoint[];
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
}

export const useRouteOnView = (userId: string): UseRouteOnViewResult => {
  const {routeOnView, isLoading, refetch} = useFetchRouteByUserId(userId);
  const [waypointsInfo, setWaypointsInfo] = useState<TWaypoint[]>([]);

  useEffect(() => {
    if (routeOnView) {
      const updatedWaypoints: TWaypoint[] = routeOnView.routeOrders.map(
        order => ({
          clientName: order.clientName,
          clientId: order.clientId,
          userId: order.userId,
          orderNote: order.note,
          addressName: order.addressName,
          productsOrder: order.products,
          location: {
            latitude: order.location.lat,
            longitude: order.location.lng,
          },
          status: order.status,
          orderId: order._id,
        }),
      );
      setWaypointsInfo(updatedWaypoints);
    }
  }, [routeOnView]);

  if (!routeOnView) {
    return {routeOnView: null, waypointsInfo: [], isLoading: false, refetch};
  }

  return {routeOnView, waypointsInfo, isLoading, refetch};
};

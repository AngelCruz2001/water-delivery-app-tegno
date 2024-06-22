import {TGetOptimizedRoute} from '../../../interfaces/routers';
import {api, getToken} from '../../../presentation/api/api';

export async function fetchRoutes() {
  const {data} = await api.get('/routes', {
    headers: {
      authorization: await getToken(),
    },
  });
  return data;
}

export async function fetchRouteById(id: string) {
  const {data} = await api.get(`/routes/enriched/${id}`, {
    headers: {
      authorization: await getToken(),
    },
  });
  return data;
}

export async function fetchRouteByUserId(id: string) {
  const {data} = await api.get(`/routes/driver/${id}`, {
    headers: {

      authorization: await getToken(),
    },
  });

  console.log(`GET - /routes/driver/${id}`);

  return data;
}

export async function fetchRouteOptimized(params: TGetOptimizedRoute) {
  try {

    const body = {
      origin: {
        lat: params.origin.lat,
        lng: params.origin.lng,
      },
      destiny: {
        lat: params.destiny.lat,
        lng: params.destiny.lng,
      },
      waypoints: params.waypoints,
      userId: params.userId,
    };

    const token = await getToken();

    console.log(`POST - /routes/optimized - ${params.userId}`);
    const {data} = await api.post(`/routes/optimized`, body, {
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching optimized route', error);
    return null;
  }
}

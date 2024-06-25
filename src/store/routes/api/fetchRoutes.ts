import {api, getToken} from '../../../presentation/api/api';

export async function fetchRoutes() {
  const {data} = await api.get('/routes/enriched', {
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

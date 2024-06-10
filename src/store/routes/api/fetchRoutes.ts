import {api, getToken} from '../../../presentation/api/api';

export async function fetchRoutes() {
  const {data} = await api.get('/routes', {
    headers: {
      authorization: await getToken(),
    },
  });
  return data;
}

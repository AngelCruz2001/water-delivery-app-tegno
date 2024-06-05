import {api, getToken} from '../../../presentation/api/api';

export async function fetchClients() {
  const {data} = await api.get('/clients', {
    headers: {
      authorization: await getToken(),
    },
  });
  return data;
}

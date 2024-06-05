import {api, getToken} from '../../../presentation/api/api';

export async function fetchUsers() {
  const {data} = await api.get('/users', {
    headers: {
      authorization: await getToken(),
    },
  });
  return data;
}

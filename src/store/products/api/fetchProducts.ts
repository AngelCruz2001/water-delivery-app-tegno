import {api, getToken} from '../../../presentation/api/api';

export async function fetchProducts() {
  try {
    const {data} = await api.get('/products', {
      headers: {
        authorization: await getToken(),
      },
    });
    return data;
  } catch (error) {
    console.log({error});
    return {};
  }
}

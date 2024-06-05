import {TPostProduct, TProduct} from '../../../interfaces/products';
import {api, getToken} from '../../../presentation/api/api';

export const postProduct = async (formData: FormData): Promise<TProduct> => {
  const {data} = await api.post<TProduct>('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: await getToken(),
    },
  });
  return data;
};

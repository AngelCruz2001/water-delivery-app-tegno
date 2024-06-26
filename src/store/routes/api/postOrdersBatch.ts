import {TCreateOrderDto, TDisplayOrder} from '../../../interfaces/order';
import {api, getToken} from '../../../presentation/api/api';

export const postOrdersBatch = async (
  createOrders: TCreateOrderDto[],
): Promise<any> => {
  try {
    const {data} = await api.post<TDisplayOrder[]>(
      '/orders/batch',
      createOrders,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: await getToken(),
        },
      },
    );
    return data;
  } catch (error) {
    console.log('pst route error: ', {error});
    return {};
  }
};

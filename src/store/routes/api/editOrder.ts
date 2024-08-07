import {TDisplayOrder} from '../../../interfaces/order';
import {TDisplayEnrichedRoute} from '../../../interfaces/routers';
import {api, getToken} from '../../../presentation/api/api';

export const editOrder = async (orderId: string, body: any): Promise<any> => {
  try {
    const res = await api.patch<string>('/routes/' + orderId, body, {
      headers: {
        'Content-Type': 'application/json',
        authorization: await getToken(),
      },
    });
    return res.data;
  } catch (error) {
    console.log('pst route error: ', {error});
    return {};
  }
};

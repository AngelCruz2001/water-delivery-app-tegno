import {TDisplayOrder} from '../../../interfaces/order';
import {TDisplayEnrichedRoute} from '../../../interfaces/routers';
import {api, getToken} from '../../../presentation/api/api';

export const deleteOrder = async (orderId: string): Promise<any> => {
  try {
    const res = await api.delete<string>('/orders/' + orderId, {
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

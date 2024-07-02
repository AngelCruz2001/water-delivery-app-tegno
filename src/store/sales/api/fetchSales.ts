import {TSale} from '../../../interfaces/sale';
import {api, getToken} from '../../../presentation/api/api';

export async function fetchSales(date: string): Promise<TSale[]> {
  try {
    const {data} = await api.get<TSale[]>('/sales?date=' + date + '', {
      headers: {
        authorization: await getToken(),
      },
    });
    return data;
  } catch (error) {
    console.log({error});
    return [];
  }
}

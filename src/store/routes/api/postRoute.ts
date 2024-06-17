import {TDisplayEnrichedRoute, TPostRoute} from '../../../interfaces/routers';
import {api, getToken} from '../../../presentation/api/api';

export const postRoute = async (createRouteDTO: TPostRoute): Promise<any> => {
  try {
    const programmedDate = new Date(createRouteDTO.programedDate);
    const postData = {
      routeName: createRouteDTO.routeName,
      driverId: createRouteDTO.driverId,
      programedDate: String(programmedDate),
    };
    console.log({postData});
    const {data} = await api.post<TDisplayEnrichedRoute>('/routes', postData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: await getToken(),
      },
    });
    return data;
  } catch (error) {
    console.log('pst route error: ', {error});
    return {};
  }
};

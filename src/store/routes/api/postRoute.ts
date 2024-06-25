import {TDisplayEnrichedRoute, TPostRoute} from '../../../interfaces/routers';
import {api, getToken} from '../../../presentation/api/api';

export const postRoute = async (createRouteDTO: TPostRoute): Promise<any> => {
  try {
    const programmedDate = String(createRouteDTO.programedDate);
    const postData = {
      routeName: createRouteDTO.routeName,
      driverId: createRouteDTO.driverId,
      programedDate: String(new Date(programmedDate)),
    };
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

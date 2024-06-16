import {TDisplayEnrichedRoute, TPostRoute} from '../../../interfaces/routers';
import {api, getToken} from '../../../presentation/api/api';

export const postRoute = async (
  createRouteDTO: TPostRoute,
): Promise<TDisplayEnrichedRoute> => {
  const programmedDate = new Date(createRouteDTO.programedDate);
  const {data} = await api.post<TDisplayEnrichedRoute>(
    '/routes',
    {
      routeName: createRouteDTO.routeName,
      driverId: createRouteDTO.driverId,
      programedDate: String(programmedDate),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: await getToken(),
      },
    },
  );
  return data;
};

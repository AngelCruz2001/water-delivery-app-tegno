import {api, getToken} from '../../../presentation/api/api';

export const deleteClient = async (clientID: string): Promise<any> => {
  try {
    const res = await api.delete<string>('/clients/' + clientID, {
      headers: {
        'Content-Type': 'application/json',
        authorization: await getToken(),
      },
    });
    return res.data;
  } catch (error) {
    console.log('pst client error: ', {error});
    throw error;
  }
};

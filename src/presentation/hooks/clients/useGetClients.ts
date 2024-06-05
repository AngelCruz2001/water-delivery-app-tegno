import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useClientsStore} from '../../../store/clients/useClientsStore';
import {TDisplayClient} from '../../../interfaces/clients';
import {fetchClients} from '../../../store/clients';

export function useGetClients(): {
  clients: TDisplayClient[];
  isLoading: boolean;
  isError: boolean;
} {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    refetchOnMount: 'always',
  });
  const clients = useClientsStore(state => state.clients);
  const setClients = useClientsStore(state => state.setClients);

  useEffect(() => {
    if (data) {
      setClients(data);
    }
  }, [data, setClients]);

  return {clients, isLoading, isError};
}

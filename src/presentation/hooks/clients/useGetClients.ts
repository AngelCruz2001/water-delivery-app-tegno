import {QueryObserverResult, useQuery} from '@tanstack/react-query';
import {useCallback, useEffect} from 'react';
import {useClientsStore} from '../../../store/clients/useClientsStore';
import {TDisplayClient} from '../../../interfaces/clients';
import {fetchClients} from '../../../store/clients';
import {useFocusEffect} from '@react-navigation/native';

interface ClientsState {
  clients: TDisplayClient[];
  setClients: (clients: TDisplayClient[]) => void;
}

export function useGetClients(): {
  clients: TDisplayClient[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<any, Error>>;
} {
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    refetchOnMount: 'always',
  });

  const clients = useClientsStore((state: ClientsState) => state.clients);
  const setClients = useClientsStore((state: ClientsState) => state.setClients);

  useEffect(() => {
    if (data) {
      setClients(data);
    }
  }, [data, setClients]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return {clients, isLoading, isError, refetch};
}

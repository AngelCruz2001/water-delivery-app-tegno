import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import {useEffect} from 'react';
import {TSale} from '../../../interfaces/sale';
import {useSalesStore} from '../../../store/sales/useSalesStore';
import {fetchSales} from '../../../store/sales/api/fetchSales';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export function useGetSales(date: string): {
  sales: TSale[];
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
} {
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['sales'],
    queryFn: () => fetchSales(date),
    refetchOnMount: 'always',
  });
  const sales = useSalesStore(state => state.sales);
  const setSales = useSalesStore(state => state.setSales);

  useEffect(() => {
    if (data) {
      setSales(data);
    }
  }, [data, setSales]);

  useEffect(() => {
    refetch();
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return {sales, isLoading, isError, refetch};
}

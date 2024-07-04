import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import {TProduct} from '../../../interfaces/products';
import {fetchProducts} from '../../../store/products/api/fetchProducts';
import {useProductsStore} from '../../../store/products/useProductsStore';
import {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

export function useGetProducts(): {
  products: TProduct[];
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
} {
  const {data, isLoading, isError, isFetching, error, refetch} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchOnMount: 'always',
  });
  const products = useProductsStore(state => state.products);
  const setProducts = useProductsStore(state => state.setProducts);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return {products, isLoading, isError, refetch};
}

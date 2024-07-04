

import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { fetchClients } from '../../../store/clients';
import { useUserStore } from '../../../store/users/useUserStore';
import { TUser } from '../../../interfaces/user';
import { fetchUsers } from '../../../store/users/api/fetchUsers';
import { useFocusEffect } from '@react-navigation/native';

export function useGetUsers(): {
    users: TUser[];
    isLoading: boolean;
    isError: boolean;
    refetch: (
        options?: RefetchOptions | undefined,
    ) => Promise<QueryObserverResult<any, Error>>;
} {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        refetchOnMount: 'always',
    });

    const setUsers = useUserStore(state => state.setUsers);
    const users = useUserStore(state => state.users);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data, setUsers]);

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]),
    );

    return { users, isLoading, isError, refetch };
}

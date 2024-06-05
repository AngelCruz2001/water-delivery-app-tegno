import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'


const queryClient = new QueryClient()

export function QueryProvider({ children }: PropsWithChildren) {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
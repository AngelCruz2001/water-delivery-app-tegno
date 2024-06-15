

import React from 'react'
import { ScreenContainer } from '../../../components/shared/ScreenContainer'
import { useGetClients } from '../../../hooks/clients/useGetClients';
import { useClientsStore } from '../../../../store/clients/useClientsStore';
import { AddClientsMap } from './AddClientsMap';

export const AddOrdersScreen = () => {

  const { isLoading, isError } = useGetClients();
  const clients = useClientsStore(state => state.clients);


  return (
    <ScreenContainer>
      <AddClientsMap />
    </ScreenContainer>
  )
}

import {create} from 'zustand';
import {TDisplayClient, TPostClient} from '../../interfaces/clients';

type ClientsState = {
  clients: TDisplayClient[];
  clientToEditAddress: TDisplayClient | null;

  // Methods
  setClients: (clients: TDisplayClient[]) => void;
  addClient: (client: TDisplayClient) => void;
  setSpecificClient: (client: TDisplayClient | null) => void;
};

export const useClientsStore = create<ClientsState>()(set => ({
  clients: [],
  clientToEditAddress: null,

  // Methods
  setClients: (clients: TDisplayClient[]) => set(() => ({clients})),
  addClient: (client: TDisplayClient) =>
    set(state => {
      return {
        clients: [...state.clients, client],
      };
    }),
  setSpecificClient: (client: TDisplayClient | null) =>
    set(() => ({clientToEditAddress: client})),
}));

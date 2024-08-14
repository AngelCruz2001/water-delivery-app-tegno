import {create} from 'zustand';
import {TDisplayClient, TPostClient} from '../../interfaces/clients';

type ClientsState = {
  clients: TDisplayClient[];
  clientToEditAddress: TDisplayClient | null;

  // Methods
  setClients: (clients: TDisplayClient[]) => void;
  addClient: (client: TDisplayClient) => void;
  setSpecificClient: (client: TDisplayClient | null) => void;
  switchClient: (client: TDisplayClient) => void;
  removeClient: (clientID: string) => void;
  editClient: (client: TPostClient) => void;
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
  editClient: (client: TPostClient) =>
    set(state => ({
      clients: state.clients.map(c => (c._id === client._id ? {
        ...c,
        businessName: client.businessName,
        name: client.name,
        phoneNumber: client.phoneNumber,
      } : c)),
    })),
  setSpecificClient: (client: TDisplayClient | null) =>
    set(() => ({clientToEditAddress: client})),
  switchClient: (client: TDisplayClient) =>
    set(state => ({
      clients: state.clients.map(c => (c._id === client._id ? client : c)),
    })),
  removeClient: (clientID: string) =>
    set(state => ({
      clients: state.clients.filter(c => c._id !== clientID),
    })),
}));

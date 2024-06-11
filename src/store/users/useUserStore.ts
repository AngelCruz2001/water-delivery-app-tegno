import {create} from 'zustand';
import {
  api,
  getToken,
  removeToken,
  saveToken,
} from '../../presentation/api/api';
import {TUser} from '../../interfaces/user';

type UserState = {
  user: TUser | null;
  users: TUser[];

  // Methods
  verifyToken: () => Promise<boolean>;
  setUser: (user: TUser) => void;
  setUsers: (users: TUser[]) => void;
  setToken: (token: string, user: TUser) => void;
  addUser: (user: TUser) => void;
};

export const useUserStore = create<UserState>()(set => ({
  user: null,
  users: [],

  // methods

  setUser: (user: TUser) => {
    set(() => ({user}));
  },
  setUsers: (users: TUser[]) => {
    set(() => ({users}));
  },

  verifyToken: async () => {
    const token = await getToken();
    if (!token) return false;
    try {
      const {data} = await api.get<{user: TUser}>(`/login/${token}`);
      set(() => ({user: data.user}));
      return true;
    } catch (error) {
      console.log({error});
      removeToken();
      return false;
    }
  },

  addUser: (user: TUser) => {
    set(state => ({users: [...state.users, user]}));
  },

  setToken: (token, user) => {
    saveToken(token);
    set(() => ({
      token,
      user,
    }));
  },
}));

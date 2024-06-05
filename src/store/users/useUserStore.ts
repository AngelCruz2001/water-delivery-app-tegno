import {create} from 'zustand';
import {
  api,
  getToken,
  removeToken,
  saveToken,
} from '../../presentation/api/api';
import {TUser} from '../../interfaces/user';
import {DisplayUser} from '../../presentation/components/users/DisplayUser';

type UserState = {
  user: TUser;
  users: TUser[];
  verifyToken: () => Promise<boolean>;

  // Methods
  setUser: (user: TUser) => void;
  setUsers: (users: TUser[]) => void;
  setToken: (token: string, user: TUser) => void;
  addUser: (user: TUser) => void;
};

export const useUserStore = create<UserState>()(set => ({
  user: {
    _id: '0',
    name: 'Ricardito',
    username: 'Ricks',
    type: 'super',
    createdAt: Date.now().toString(),
    phoneNumber: '123456789',
  },

  users: [
    {
      _id: '01231',
      name: 'Ricardito',
      username: 'Ricks',
      type: 'super',
      createdAt: Date.now().toString(),
      phoneNumber: '123456789',
    },
  ],

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

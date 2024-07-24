import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from 'react-native-config';

axios.interceptors.request.use(
  async config => {
    console.log('config: ', config);
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.authorization = `${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const api = axios.create({
  baseURL: Config.API_URL
});

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);

    console.log('Token', token);
    console.log('Token guardado con éxito');
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = (await AsyncStorage.getItem('token')) || '';
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token eliminado');
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};

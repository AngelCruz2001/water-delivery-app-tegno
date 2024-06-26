import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // baseURL: 'https://water-delivery-backend.onrender.com',
  // baseURL: 'http://192.168.1.73:8080',
  baseURL: 'http://localhost:8080',
  // baseURL: 'http://10.0.2.2:8080',
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

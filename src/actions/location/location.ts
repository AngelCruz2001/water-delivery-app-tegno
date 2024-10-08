import Geolocation from '@react-native-community/geolocation';
import {TApiResponse, TLocation} from '../../interfaces/location';
import {Platform} from 'react-native';
import {
  androidGoogleApiKey,
  iOSGoogleApiKey,
} from '../../config/theme/variables';
import axios from 'axios';

export const getCurrentLocation = (): Promise<TLocation> => {
  return new Promise((resolve, reject) => {
    try {
      Geolocation.getCurrentPosition(
        position =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        error => {
          console.log('No se pudo obtener la ubicación', error);
          reject(error);
        },
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.log('error from getCurrentLocation: ', error);
      reject(error);
    }
  });
};

export const watchCurrentLocation = (
  locationCallback: (location: TLocation) => void,
): number => {
  const watchId = Geolocation.watchPosition(
    position =>
      locationCallback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    error => {
      console.log('No se pudo obtener la ubicación', error);
      throw new Error('No se pudo obtener la ubicación');
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );

  return watchId;
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};

export const reverseGeocoding = async (
  location: TLocation,
): Promise<string> => {
  try {
    const key = Platform.OS === 'ios' ? iOSGoogleApiKey : androidGoogleApiKey;
    const {latitude, longitude} = location;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
    const {data} = await axios.get<TApiResponse>(url);
    const res = data.results[0].formatted_address;
    return res;
  } catch (error) {
    console.log({'error from reverseGeocoding': error});
    return 'sin resultado';
    // throw error;
  }
};

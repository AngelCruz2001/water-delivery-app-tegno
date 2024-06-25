import React, {useEffect, useState} from 'react';
import {getCurrentLocation} from '../../../actions/location/location';
import MapView from 'react-native-maps';
import {TLocation} from '../../../interfaces/location';

export const useCurrentLocation = (
  mapRef: React.MutableRefObject<MapView | null>,
) => {
  const [location, setLocation] = useState({
    latitude: 24.015575981424856,
    longitude: -104.65724498033524,
  });
  useEffect(() => {
    getCurrentLocation().then(location => {
      setLocation(location);
      moveCameraToLocation(location);
    });

    return () => {};
  }, []);

  const moveCameraToLocation = (location: TLocation) => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: location,
      });
    }
  };
  return {
    location,
    moveCameraToLocation,
  };
};

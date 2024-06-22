import { TOrderProduct } from './order';
export type TLocation = {
  latitude: number;
  longitude: number;
};

export type TClientLocation = {
  lat: number;
  lng: number;
};

export type TMarker = TLocation & {
  title: string;
  description: string;
};

export type TPlusCode = {
  compound_code: string;
  global_code: string;
};

export type TAddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export type TLocationResponse = {
  lat: number;
  lng: number;
};

export type TViewport = {
  northeast: TLocationResponse;
  southwest: TLocationResponse;
};

export type TGeometry = {
  location: TLocationResponse;
  location_type: string;
  viewport: TViewport;
};

export type TResult = {
  address_components: TAddressComponent[];
  formatted_address: string;
  geometry: TGeometry;
  place_id: string;
  plus_code: TPlusCode;
  types: string[];
};

export type TApiResponse = {
  plus_code: TPlusCode;
  results: TResult[];
  status: string;
};

export type TPostLocation = {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  clientId: string;
  reference: string;
};

export interface TDriver {
  _id: string;
  name: string;
  location: TLocation;
}


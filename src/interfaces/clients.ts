import {TClientLocation} from './location';

export type TPostClient = {
  _id?: string;
  businessName: string;
  name: string;
  phoneNumber: string;
};

export type TDisplayClient = TPostClient & {
  _id: string;
  createdAt: string;
  addressId?: string;
  address?: string;
  location?: TClientLocation;
  registeredByName: string;
  registeredById: string;
};

export type TLogin = {
  username: string;
  password: string;
};

import {TLocation, TOrderProduct} from './order';

export interface TSale {
  _id: string;
  date: Date;
  products: TOrderProduct[];
  userId: string;
  clientId?: string;
  clientAddress: string;
  location: TLocation;
  total: number;
}

export interface TCreateSaleDTO {
  products: TOrderProduct[];
  clientId?: string;
  clientAddress: string;
  location: TLocation;
  orderId?: string;
}

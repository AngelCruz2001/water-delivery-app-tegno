import {create} from 'zustand';
import {TProduct} from '../../interfaces/products';
import {TSale} from '../../interfaces/sale';

type SalesState = {
  sales: TSale[];

  // Methods
  setSales: (sales: TSale[]) => void;
  addSale: (sale: TSale) => void;
};

export const useSalesStore = create<SalesState>()(set => ({
  sales: [],

  // Methods
  setSales: (sales: TSale[]) => set(state => ({...state, sales})),
  addSale: (sale: TSale) =>
    set(state => ({...state, sales: [...state.sales, sale]})),
}));

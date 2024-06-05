import {create} from 'zustand';
import {TProduct} from '../../interfaces/products';

type ProdcutsState = {
  products: TProduct[];

  // Methods
  setProducts: (products: TProduct[]) => void;
  addProduct: (product: TProduct) => void;
};

export const useProductsStore = create<ProdcutsState>()(set => ({
  products: [],

  // Methods
  setProducts: (products: TProduct[]) => set(state => ({...state, products})),
  addProduct: (product: TProduct) =>
    set(state => ({...state, products: [...state.products, product]})),
}));

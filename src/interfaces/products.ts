export type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    key: string;
  };
};

export type TPostProduct = {
  name: string;
  description: string;
  price: string;
};

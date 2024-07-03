export type TDriver = {
  _id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  routeMade?: {latitude: number; longitude: number}[];
};

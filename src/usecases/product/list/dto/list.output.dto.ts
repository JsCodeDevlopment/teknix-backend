export type ListProductOutputDto = {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};
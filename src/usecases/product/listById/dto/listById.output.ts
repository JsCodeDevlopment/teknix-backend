export type ListProductByIdOutputDto = {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
};
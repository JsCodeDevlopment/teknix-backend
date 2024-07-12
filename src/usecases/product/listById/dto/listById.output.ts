export type ListProductByIdOutputDto = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
};
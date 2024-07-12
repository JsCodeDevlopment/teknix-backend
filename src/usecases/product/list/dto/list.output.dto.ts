export type ListProductOutputDto = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }[];
};
export type ListProductByIdResponseDto = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
};
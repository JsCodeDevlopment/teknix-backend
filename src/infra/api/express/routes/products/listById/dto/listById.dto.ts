export type ListProductByIdResponseDto = {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
};
export type LoginOutputDto = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

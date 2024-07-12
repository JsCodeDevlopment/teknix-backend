export type ListUserByIdOutputDto = {
  user: {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
    verificationToken: string;
  };
};
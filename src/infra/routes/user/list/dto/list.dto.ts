export type ListUserResponseDto = {
  users: {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
    verificationToken: string;
  }[];
};

export const loginSchema = {
  Login: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
      user: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
        },
      },
    },
  },
};

export const userInputSchemas = {
  UserInput: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["username", "email", "password"],
  },
};

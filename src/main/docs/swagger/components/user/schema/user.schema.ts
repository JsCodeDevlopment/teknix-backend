export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
    required: ['username', 'email', 'password'],
  },
};
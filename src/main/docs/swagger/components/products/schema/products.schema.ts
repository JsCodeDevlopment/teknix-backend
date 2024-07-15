export const productSchemas = {
  Product: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
      description: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
    },
    required: ['name', 'price', 'quantity'],
  },
};
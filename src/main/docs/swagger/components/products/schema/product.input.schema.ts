export const productInputSchemas = {
  ProductInput: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      price: {
        type: "number",
      },
      description: {
        type: "string",
      },
      image: {
        type: "string",
      },
    },
    required: ["name", "price", "description", "image"],
  },
};

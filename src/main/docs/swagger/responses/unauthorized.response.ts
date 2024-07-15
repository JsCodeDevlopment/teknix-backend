export function unauthorizedResponse() {
  return {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Error",
        },
      },
    },
  };
}

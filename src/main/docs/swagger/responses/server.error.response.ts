export function internalServerErrorResponse() {
  return {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Error",
        },
      },
    },
  };
}

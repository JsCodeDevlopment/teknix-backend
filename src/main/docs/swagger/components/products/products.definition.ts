import { StatusCode } from "../../../../adapters/http/interfaces/statusCode.enum";
import { internalServerErrorResponse } from "../../responses/server.error.response";
import { unauthorizedResponse } from "../../responses/unauthorized.response";

export const productSwaggerDefinitions = {
  "/products/create": {
    post: {
      summary: "Permite a criação de um novo produto.",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProductInput",
            },
          },
        },
      },
      responses: {
        [StatusCode.OK]: {
          description: "Produto criado com sucesso.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductOutput",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/products": {
    get: {
      summary: "Retorna a lista de produtos",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        [StatusCode.OK]: {
          description: "Lista de produtos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/products/list/:id": {
    get: {
      summary: "Retorna um único produto",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        [StatusCode.OK]: {
          description: "Lista o produto pesquisado.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/products/update/:id": {
    put: {
      summary: "Permite a edição de um produto.",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProductInput",
            },
          },
        },
      },
      responses: {
        [StatusCode.OK]: {
          description: "Produto editado com sucesso.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductOutput",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/products/delete/:id": {
    delete: {
      summary: "Deleta um produto.",
      tags: ["Products"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        [StatusCode.OK]: {
          description: "Deleta o produto selecionado.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductOutput",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
};

import { StatusCode } from "../../../../adapters/http/interfaces/statusCode.enum";
import { internalServerErrorResponse } from "../../responses/server.error.response";
import { unauthorizedResponse } from "../../responses/unauthorized.response";

export const userSwaggerDefinitions = {
  "/users/create": {
    post: {
      summary: "Permite a criação de um novo usuário.",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserInput",
            },
          },
        },
      },
      responses: {
        [StatusCode.OK]: {
          description: "Usuário criado com sucesso.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserOutput",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/users/list": {
    get: {
      summary: "Retorna a lista de usuários",
      tags: ["Users"],
      responses: {
        [StatusCode.OK]: {
          description: "Lista de usuários",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
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
  "/users/list/:id": {
    get: {
      summary: "Retorna um único usuário",
      tags: ["Users"],
      responses: {
        [StatusCode.OK]: {
          description: "Lista o usuário pesquisado.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/users/delete/:id": {
    delete: {
      summary: "Deleta um usuário.",
      tags: ["Users"],
      responses: {
        [StatusCode.OK]: {
          description: "Deleta o usuário selecionado.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserOutput",
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

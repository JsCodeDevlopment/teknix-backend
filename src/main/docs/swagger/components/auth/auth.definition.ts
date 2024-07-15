import { StatusCode } from "../../../../adapters/http/interfaces/statusCode.enum";
import { internalServerErrorResponse } from "../../responses/server.error.response";
import { unauthorizedResponse } from "../../responses/unauthorized.response";

export const authSwaggerDefinitions = {
  "/login": {
    post: {
      summary: "Permite o login do usuário e retorna o token de autenticação.",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginInput",
            },
          },
        },
      },
      responses: {
        [StatusCode.OK]: {
          description: "Usuário autenticado com sucesso. Token + informações do usuário.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        [StatusCode.UNAUTHORIZED]: unauthorizedResponse(),
        [StatusCode.INTERNAL_SERVER_ERROR]: internalServerErrorResponse(),
      },
    },
  },
  "/me": {
    get: {
      summary: "Retorna informações do usuário autenticado",
      tags: ["Auth"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        [StatusCode.OK]: {
          description: "Informações do usuário autenticado",
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
};

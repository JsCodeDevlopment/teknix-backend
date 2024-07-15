import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { userSchemas } from '../components/user/schema/user.schema';
import { productSchemas } from '../components/products/schema/products.schema';
import { userSwaggerDefinitions } from '../components/user/user.definition';
import { productSwaggerDefinitions } from '../components/products/products.definition';
import { errorSchema } from '../schemas/error.schema';
import { loginSchema } from '../components/auth/schema/login.schema';
import { authSwaggerDefinitions } from '../components/auth/auth.definition';
import { loginInputSchema } from '../components/auth/schema/login.input.schema';
import { userInputSchemas } from '../components/user/schema/user.input.schema';
import { userOutputSchemas } from '../components/user/schema/user.output.schema';
import { productInputSchemas } from '../components/products/schema/product.input.schema';
import { productOutputSchemas } from '../components/products/schema/product.output.schema';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Teknix Backend API',
    version: '1.0.0',
    description: 'Documentação da API do backend Teknix.',
  },
  servers: [
    {
      url: 'http://localhost:8000/',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...loginSchema,
      ...loginInputSchema,
      ...errorSchema,
      ...userSchemas,
      ...userInputSchemas,
      ...userOutputSchemas,
      ...productSchemas,
      ...productInputSchemas,
      ...productOutputSchemas,
    },
  },
  paths: {
    ...authSwaggerDefinitions,
    ...productSwaggerDefinitions,
    ...userSwaggerDefinitions,
  },
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

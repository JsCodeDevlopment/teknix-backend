import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { ApiExpress } from "./main/api/api.express";
import { createProductRepository } from "./factories/repositories/product/product.repository.factory";
import { createProductUseCases } from "./factories/useCases/product/product.usecase.factory";
import { createProductRoutes } from "./factories/routes/product/product.routes.factory";
import { corsOptions } from "./main/api/config/cors";
import { createUserRepository } from "./factories/repositories/user/user.repository.factory";
import { createUserUseCases } from "./factories/useCases/user/user.usecase.factory";
import { createUserRoutes } from "./factories/routes/user/user.routes.factory.";
import { generateFolderStructure } from "./main/docs/make.structure";
import { BcryptPasswordEncryptor } from "./infra/services/encryptor/bcrypt.encryptor";
import { loginUserUseCases } from "./factories/useCases/auth/login.usecase.factory";
import { loginRoutes } from "./factories/routes/auth/login.routes.factory.";
import { JwtTokenGenerator } from "./infra/services/tokenGenerator/generate.token";
import { MeRoutes } from "./factories/routes/auth/me.routes.factory";

function server() {
  const passwordEncryptor = new BcryptPasswordEncryptor();
  const jwtService = new JwtTokenGenerator();

  const productRepository = createProductRepository();
  const productUseCases = createProductUseCases(productRepository);
  const productRoutes = createProductRoutes(productUseCases);

  const userRepository = createUserRepository();
  const userUseCases = createUserUseCases(userRepository, passwordEncryptor);
  const userRoutes = createUserRoutes(userUseCases);

  const loginUseCases = loginUserUseCases(
    userRepository,
    passwordEncryptor,
    jwtService
  );
  const loginRoute = loginRoutes(loginUseCases);

  const meRoute = MeRoutes(userRepository);

  const globalMiddlawares = [];

  const api = ApiExpress.create(
    [...productRoutes, ...userRoutes, ...loginRoute, ...meRoute],
    corsOptions
  );
  const port = 8000;
  generateFolderStructure("./src");
  api.start(port);
}

server();

import { ApiExpress } from "./main/api/api.express";
import { createProductRepository } from "./factories/repositories/product/product.repository.factory";
import { createProductUseCases } from "./factories/useCases/product/product.usecase.factory";
import { createProductRoutes } from "./factories/routes/product/product.routes.factory";
import { corsOptions } from "./main/api/config/cors";
import { createUserRepository } from "./factories/repositories/user/user.repository.factory";
import { createUserUseCases } from "./factories/useCases/user/user.usecase.factory";
import { createUserRoutes } from "./factories/routes/user/user.routes.factory.";

function server() {
  const productRepository = createProductRepository();
  const productUseCases = createProductUseCases(productRepository);
  const productRoutes = createProductRoutes(productUseCases);
  
  const userRepository = createUserRepository();
  const userUseCases = createUserUseCases(userRepository);
  const userRoutes = createUserRoutes(userUseCases);

  const globalMiddlawares = [];

  const api = ApiExpress.create([...productRoutes, ...userRoutes], corsOptions);
  const port = 8000;
  api.start(port);
}

server();

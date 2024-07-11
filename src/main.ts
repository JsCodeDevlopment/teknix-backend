import { ApiExpress } from "./main/api/api.express";
import { createProductRepository } from "./factories/repositories/product/product.repository.factory";
import { createProductUseCases } from "./factories/useCases/product/product.usecase.factory";
import { createProductRoutes } from "./factories/routes/product/product.routes.factory";
import { corsOptions } from "./main/api/config/cors";

function server() {
  const productRepository = createProductRepository();
  const productUseCases = createProductUseCases(productRepository);
  const productRoutes = createProductRoutes(productUseCases);

  const globalMiddlawares = [];

  const api = ApiExpress.create(productRoutes, corsOptions);
  const port = 8000;
  api.start(port);
}

server();

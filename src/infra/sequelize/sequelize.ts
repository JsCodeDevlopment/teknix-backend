import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./models/product/product.model";
import { UserModel } from "./models/user/user.model";

const sequelize: Sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  models: [ProductModel, UserModel],
});

export { sequelize };

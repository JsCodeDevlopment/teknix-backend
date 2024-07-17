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
  dialectModule: require("pg"),
  ssl: process.env.DB_SSL === "require",
  dialectOptions: {
    ssl: { require: process.env.DB_SSL === "require" },
  },
  models: [ProductModel, UserModel],
});

export { sequelize };

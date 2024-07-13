import { sequelize } from "./sequelize";

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection has been established successfully.\n");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

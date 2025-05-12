import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  });

export const connection = async () => {

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ 🚀  Connection has been established successfully.🎯");
    return  {sequelize}
  } catch (error) {
    console.error("❌ Unable to connect to the database:🔴", error);
  }
}

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_SETTINGS = process.env.DATABASE_SETTINGS;
const DATABASE_USERNAME_SETTINGS = process.env.DATABASE_USERNAME_SETTINGS;
const DATABASE_PASSWORD_SETTINGS = process.env.DATABASE_PASSWORD_SETTINGS;
const DATABASE_HOST_SETTINGS = process.env.DATABASE_HOST_SETTINGS;
const DATABASE_TYPE_SETTINGS = process.env.DATABASE_TYPE_SETTINGS;
const DATABASE_LOGGING_SETTINGS = process.env.DATABSE_LOGGING_SETTINGS;

/**
 * @description inisiasi config database setting dari env
 */

const DBSETTINGS = new Sequelize(
  DATABASE_SETTINGS,
  DATABASE_USERNAME_SETTINGS,
  DATABASE_PASSWORD_SETTINGS,
  {
    host: DATABASE_HOST_SETTINGS,
    dialect: DATABASE_TYPE_SETTINGS,
    logging: DATABASE_LOGGING_SETTINGS,
  }
);

export default DBSETTINGS;

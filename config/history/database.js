import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_HISTORY = process.env.DATABASE_HISTORY;
const DATABASE_USERNAME_HISTORY = process.env.DATABASE_USERNAME_HISTORY;
const DATABASE_PASSWORD_HISTORY = process.env.DATABASE_PASSWORD_HISTORY;
const DATABASE_HOST_HISTORY = process.env.DATABASE_HOST_HISTORY;
const DATABASE_TYPE_HISTORY = process.env.DATABASE_TYPE_HISTORY;
const DATABASE_LOGGING_HISTORY = process.env.DATABSE_LOGGING_HISTORY;

/**
 * @description inisiasi config untuk database history dari env
 */

const DBHISTORY = new Sequelize(
  DATABASE_HISTORY,
  DATABASE_USERNAME_HISTORY,
  DATABASE_PASSWORD_HISTORY,
  {
    host: DATABASE_HOST_HISTORY,
    dialect: DATABASE_TYPE_HISTORY,
    logging: DATABASE_LOGGING_HISTORY,
  }
);

export default DBHISTORY;

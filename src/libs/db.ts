import { Sequelize } from "sequelize";
import { Constants } from "../constants";

const db = new Sequelize(Constants.DB_NAME, Constants.DB_USER, Constants.DB_PASSWORD, {
    host: Constants.DB_HOST,
    dialect: 'mysql',
});

export default db;
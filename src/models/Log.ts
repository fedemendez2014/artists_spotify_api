import { DataTypes } from "sequelize";
import db from "../libs/db";

const Log = db.define('Log', {
    ip: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    url: { type: DataTypes.STRING },
})

export default Log;
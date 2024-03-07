import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
})



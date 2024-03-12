import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Role = sequelize.define('role', {
    role_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
})
import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Department = sequelize.define('department', {
    department: {
        type: DataTypes.STRING,
        primaryKey: true
    }
})
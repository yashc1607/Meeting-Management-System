import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    role_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
})
import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Department = sequelize.define('department', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    department: {
        type: DataTypes.STRING,
        unique: true
    }
})
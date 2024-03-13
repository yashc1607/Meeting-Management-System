import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Group = sequelize.define('group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    group_name: {
        type: DataTypes.STRING,
        unique: true
    }
})
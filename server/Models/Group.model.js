import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Group = sequelize.define('group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    group_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
})
import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const Group = sequelize.define('group', {
    group_name: {
        type: DataTypes.STRING,
        primaryKey: true
    }
})
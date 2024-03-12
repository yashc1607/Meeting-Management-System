import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    emailID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    deptID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    groupID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})



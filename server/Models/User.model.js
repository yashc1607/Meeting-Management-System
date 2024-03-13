import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { Department } from "./Dept.model.js";
export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    emailID: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    deptID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // groupID: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

// Define the association between User and UserRole
// Department.hasMany(User, { foreignKey: 'deptID' });
User.belongsTo(Department, { foreignKey: 'deptID' });



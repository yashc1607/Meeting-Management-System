import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";
import { Role } from "./Role.model.js";
export const RoleKeyword = sequelize.define('roleKeyword', {
    roleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role, 
            key: 'id'   
        }
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Define the association between User and UserRole
Role.hasMany(RoleKeyword, { foreignKey: 'roleID' });
RoleKeyword.belongsTo(Role, { foreignKey: 'roleID' });


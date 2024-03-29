import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";
import { Role } from "./Role.model.js";
export const UserRole = sequelize.define('userRole', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'   
        }
    },
    roleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role, 
            key: 'id'      
        }
    }
});

// Define the association between User and UserRole
User.hasMany(UserRole, { foreignKey: 'userID' });
UserRole.belongsTo(User, { foreignKey: 'userID' });

// Define the association between Role and UserRole
Role.hasMany(UserRole, { foreignKey: 'roleID' });
UserRole.belongsTo(Role, { foreignKey: 'roleID' });

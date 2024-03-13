import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";
import { Group } from "./Group.model.js";
export const UserGroup = sequelize.define('userGroup', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'   
        }
    },
    groupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group, 
            key: 'id'      
        }
    }
});

// Define the association between User and UserRole
User.hasMany(UserGroup, { foreignKey: 'userID' });
UserGroup.belongsTo(User, { foreignKey: 'userID' });

// Define the association between Role and UserRole
Group.hasMany(UserGroup, { foreignKey: 'groupID' });
UserGroup.belongsTo(Group, { foreignKey: 'groupID' });

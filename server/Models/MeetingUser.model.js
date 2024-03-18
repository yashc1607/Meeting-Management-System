import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";

import { Group } from "./Group.model.js";
import { Meeting } from "./Meeting.model.js";

//to optimise table can be seperated for less consumption of memory (meetingID,userID) and (meetingID,groupID)
export const MeetingUser = sequelize.define('meetinguser', {
    meetingID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Meeting, 
            key: 'id'   
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'   
        }
    },
   
    
});

// Define the association between User and UserRole
Meeting.hasMany(MeetingUser, { foreignKey: 'meetingID' });
MeetingUser.belongsTo(Meeting, { foreignKey: 'meetingID' });

// Define the association between Role and UserRole
User.hasMany(MeetingUser, { foreignKey: 'userID' });
MeetingUser.belongsTo(User, { foreignKey: 'userID' });

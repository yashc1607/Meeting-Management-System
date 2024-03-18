//for optimisation to be considered later from meetinguser.model.js
import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";

import { Group } from "./Group.model.js";
import { Meeting } from "./Meeting.model.js";

//to optimise table can be seperated for less consumption of memory (meetingID,userID) and (meetingID,groupID)
export const MeetingGroup = sequelize.define('meetinggroup', {
    meetingID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Meeting, 
            key: 'id'   
        }
    },
    groupID: {
        type: DataTypes.INTEGER,
        references: {
            model: Group, 
            key: 'id'      
        }
    },
    
});

// Define the association between User and UserRole
Meeting.hasMany(MeetingGroup, { foreignKey: 'meetingID' });
MeetingGroup.belongsTo(Meeting, { foreignKey: 'meetingID' });

//groups
Group.hasMany(MeetingGroup, { foreignKey: 'groupID' });
MeetingGroup.belongsTo(Group, { foreignKey: 'groupID' });

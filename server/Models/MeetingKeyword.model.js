import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";

import { Group } from "./Group.model.js";
import { Meeting } from "./Meeting.model.js";


//to optimise table can be seperated for less consumption of memory (meetingID,userID) and (meetingID,groupID)
export const MeetingKeyword = sequelize.define('meetingkeyword', {
    meetingID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Meeting, 
            key: 'id'   
        }
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull:false
    },
    
    
},{
    uniqueKeys: {
      Items_unique: {
        fields: ['meetingID', 'keyword']
      }
    }
  });

// Define the association between User and UserRole
Meeting.hasMany(MeetingKeyword, { foreignKey: 'meetingID' });
MeetingKeyword.belongsTo(Meeting, { foreignKey: 'meetingID' });

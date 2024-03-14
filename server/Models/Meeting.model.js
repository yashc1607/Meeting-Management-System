import { sequelize } from "../dbconnect.js"
import { DataTypes } from "sequelize"
import { User } from "./User.model.js";
export const Meeting = sequelize.define('meeting', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    agenda: {
        type: DataTypes.STRING,
    },
    hostID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'   
        }
    },
    agendaUserID:{
        type: DataTypes.INTEGER,
        references: {
            model: User, 
            key: 'id'   
        }
    },
    meetingData: {
        type: DataTypes.STRING,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    venue:{
        type:DataTypes.STRING,
        allowNull:false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

// Define the association between User and UserRole
User.hasMany(Meeting, { foreignKey: 'hostID' });
Meeting.belongsTo(User, { foreignKey: 'hostID' });

User.hasMany(Meeting, { foreignKey: 'agendaUserID' });
Meeting.belongsTo(User, { foreignKey: 'agendaUserID' });



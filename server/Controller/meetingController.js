import { Meeting } from "../Models/Meeting.model.js";
import { MeetingKeyword } from "../Models/MeetingKeyword.model.js";
import { MeetingUser } from "../Models/MeetingUser.model.js";
import { sequelize } from "../dbconnect.js";

//ADD MEETING
export const addMeeting = async (req,res,next)=>{

    try {
        
        console.log("meeting arrived");

        const data = req.body;
        console.log(data);
        sequelize.sync()
        .then( async ()=>{
            await Meeting.create(
                {
                    agenda:data.agenda,
                    hostID:data.host_id,
                    agendaUserID:data.agenda_user_id,
                    meetingData:data.meeting_data,  
                    date:data.date,
                    venue:data.venue
                }
            );
            console.log('Successfully added a meeting!');
                res.status(200).send({
                    "message":"success",
                });
        } )

    } catch (error) {
        console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to host meeting : "+error,
                });
    }

}

//recheduleMeeting
export const rescheduleMeeting = async (req,res,next)=>{

    try {
        
        console.log("meeting arrived");

        const data = req.body;
        console.log(data);
        sequelize.sync()
        .then( async ()=>{
            await Meeting.update(
                {
                    agenda:data.agenda,
                    hostID:data.host_id,
                    agendaUserID:data.agenda_user_id,
                    meetingData:data.meeting_data,  
                    date:data.date,
                    venue:data.venue
                },
                {
                    where:{
                        id:data.meeting_id
                    }
                }
            );
            console.log('Successfully updated a meeting!');
                res.status(200).send({
                    "message":"success",
                });
        } )

    } catch (error) {
        console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to update meeting : "+error,
                });
    }

}

//REMOVE MEETING
export const removeMeeting = async (req,res,next)=>{

    try {
        
        console.log("meeting arrived");

        const data = req.body;
        console.log(data);
        sequelize.sync()
        .then( async ()=>{
            await Meeting.destroy(
                {
                    where:{
                        id:data.meeting_id
                    }
                }
            );
            console.log('Successfully removed a meeting!');
                res.status(200).send({
                    "message":"success",
                });
        } )

    } catch (error) {
        console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove meeting : "+error,
                });
    }

}


//ADD USER TO MEETINGS
export const addParticipants = async (req,res,next)=>{

    try {
        
        console.log("meeting arrived");

        const data = req.body;
        console.log(data);
        sequelize.sync()
        .then( async ()=>{
            await MeetingUser.create(
                {
                    meetingID:data.meeting_id,
                    userID:data.user_id,
                    groupID:data.group_id
                }
            );
            console.log('Successfully added participant!');
                res.status(200).send({
                    "message":"success",
                });
        } )

    } catch (error) {
        console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add meeting participants : "+error,
                });
    }

}

//ADD MEETING KEYWORDS

export const addMeetingKeywords = async (req,res,next)=>{

    try {
        
        console.log("meeting arrived");

        const data = req.body;
        console.log(data);
        sequelize.sync()
        .then( async ()=>{
            await MeetingKeyword.create(
                {
                    meetingID:data.meeting_id,
                    keyword:data.keyword
                }
            );
            console.log('Successfully added keyword!');
                res.status(200).send({
                    "message":"success",
                });
        } )

    } catch (error) {
        console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add meeting keyword  : "+error,
                });
    }

}
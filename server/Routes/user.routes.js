import express from 'express';
import { addDepartment, addGroup, addRole, addUser, assignGroup, assignKeyword, assignRole, getAllUser, getAssignedGroups, getAssignedKeywords, getAssignedRoles, getDepartments, getGroups, getRoles, getUser, getUserGroups, removeAssignedGroup, removeAssignedKeyword, removeAssignedRole, removeDepartment, removeGroup, removeRole, removeUser, updateAssignedRole, updateDepartment, updateGroup, updateRole } from '../Controller/userController.js';
import { addMeeting, addMeetingKeywords, addParticipants } from '../Controller/meetingController.js';
const userRouter = express.Router();
//userRouter.use();
//public path
userRouter.post('/addUser',addUser);
userRouter.post('/getuser',getUser);
userRouter.post('/removeuser',removeUser);
userRouter.get('/getAllUser',getAllUser);
// userRouter.post('/updateUser',upda);

userRouter.post('/addRole',addRole);
userRouter.get('/getroles',getRoles);
userRouter.post('/removeRole',removeRole);
userRouter.post('updateRole',updateRole);

userRouter.post('/addDepartment',addDepartment);
userRouter.get('/getDepartment',getDepartments);
userRouter.post('/removeDepartment',removeDepartment);
userRouter.post('/updatedepartment',updateDepartment);

userRouter.post('/addGroup',addGroup);
userRouter.get('/getGroups',getGroups);
userRouter.post('/getUserGroups',getUserGroups);
userRouter.post('/removegroups',removeGroup);
userRouter.post('/updategroups',updateGroup);
userRouter.post('/removeAssignedGroup',removeAssignedGroup);

userRouter.post('/assignRole',assignRole);  
userRouter.get('/getassignedroles',getAssignedRoles);
userRouter.post('/updateassignedrole',updateAssignedRole);
userRouter.post('/removeassignedrole',removeAssignedRole);

userRouter.post('/assigngroup',assignGroup);
userRouter.post('/getassignedgroups',getAssignedGroups);
userRouter.post('/removeassignedgroups',removeAssignedGroup);

userRouter.post('/assignkeyword',assignKeyword);
userRouter.post('/getassignedkeywords',getAssignedKeywords);
userRouter.post('/removeAssignedKeyword',removeAssignedKeyword);

userRouter.post('/addmeeting',addMeeting);
userRouter.post('/addparticipants',addParticipants);
userRouter.post('/addmeetingkeyword',addMeetingKeywords);



export default userRouter; 

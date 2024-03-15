import { sequelize } from "../dbconnect.js";
import { User } from "../Models/User.model.js";
import { Role } from "../Models/Role.model.js";
import { Department } from "../Models/Dept.model.js";
import { Group } from "../Models/Group.model.js";
import { UserRole } from "../Models/UserRole.model.js";
import { UserGroup } from "../Models/UserGroup.model.js";
import { RoleKeyword } from "../Models/RoleKeyword.model.js";


//get user by email id
export const getUser = async (req, res, next) => {
    try {
        console.log("arrived");

        const data = req.body;    
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const user = await User.findOne({where:{
                    
                    emailID:data.email_id
                    
                    }
                });
                console.log('Successfully added a new user!');
                res.status(200).send({
                    "message":"success!",
                    "user":user 
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add new user : "+error,
                });
            })

        //

    } catch (error) {
        next(error);
    }
}


//ADD USER
export const addUser = async (req, res, next) => {
    try {
        console.log("arrived");

        const data = req.body;    
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await User.create({
                    emailID:data.email_id,
                    deptID:data.dept_id
                })
                console.log('Successfully added a new user!');
                res.status(200).send({
                    "message":"Successfully added a new user!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add new user : "+error,
                });
            })

        //

    } catch (error) {
        next(error);
    }
}


//REMOVE USER
export const removeUser = async (req, res, next) => {
    try {
        console.log("arrived");

        const data = req.body;    
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await User.update({active:false},{
                    where:{
                        emailID:data.email_id
                    }
                })
                console.log('Successfully removed a user!');
                res.status(200).send({
                    "message":"Successfully removed a user!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove a user : "+error,
                });
            })

        //

    } catch (error) {
        next(error);
    }
}

//get roles
export const getRoles = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const roles = await Role.findAll();
                console.log('Successfully added a new Role!');
                console.log(roles );
                res.status(200).send({
                    "message":"success",
                    "roles":roles
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add new role : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}


//ADD ROLE
export const addRole = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Role.create({
                    role_name: data.role,
                })
                console.log('Successfully added a new Role!');
                res.status(200).send({
                    "message":"Successfully added a new Role!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add new role : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//updateRole
export const updateRole = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Role.update({role_name:data.role},{
                    where:{
                        role_id:data.role_id,
                        active:true
                    }
                })
                console.log('Successfully updated a  Role!');
                res.status(200).send({
                    "message":"Successfully updated a  Role!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to update a role : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//REMOVE ROLE
export const removeRole = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Role.destroy({
                    where:{
                        role_id: data.role_id
                    }
                })
                console.log('Successfully removed a  Role!');
                res.status(200).send({
                    "message":"Successfully removed a  Role!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove role : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}


//get departments
export const getDepartments = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const depts = await Department.findAll();
                console.log('Successfully added a new Department!');
                res.status(200).send({
                    "message":"success",
                    "departments":depts
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add department : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}


// add department
export const addDepartment = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Department.create({
                    department: data.department
                })
                console.log('Successfully added a new Department!');
                res.status(200).send({
                    "message":"Successfully added a new Department!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add department : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}
//update department
export const updateDepartment = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Department.update({department:data.department},{
                    where:{
                        id: data.department_id
                    }
                })
                console.log('Successfully updated a  Department!');
                res.status(200).send({
                    "message":"Successfully updated a Department!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to update department : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//remove department
export const removeDepartment = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Department.destroy({
                    where:{
                        id: data.department_id
                    }    
                })
                console.log('Successfully removed Department!');
                res.status(200).send({
                    "message":"Successfully removed Department!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove department : "+error,
                });
            })

    } catch (error) {
        next(error);
    }
}

//get groups
export const getGroups = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const groups = await Group.findAll();
            
                console.log('Successfully found Groups!');
                res.status(200).send({
                    "message":"success",
                    "groups":groups
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to get groups : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}


//addGroup
export const addGroup = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Group.create({
                    group_name: data.group_name
                })
                console.log('Successfully added a new Group!');
                res.status(200).send({
                    "message":"Successfully added a new Group!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add group : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//update group
export const updateGroup = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Group.update({
                    group_name: data.group_name
                },{
                    where:{
                        id:data.group_id
                    }
                })
                console.log('Successfully updated Group!');
                res.status(200).send({
                    "message":"Successfully updated Group!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to update a group : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//remove group
export const removeGroup = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await Group.destroy({where:{
                    id: data.group_id
                }
                })
                console.log('Successfully removed Group!');
                res.status(200).send({
                    "message":"Successfully removed  Group!",
                    
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove group : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//get assigned roled to user
export const getAssignedRoles = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const rolesId = await UserRole.findAll({
                    where:{
                        userID: data.user_id,
                    }    
                })
                const roles = await Role.findAll({
                    where:{
                        id:[...rolesId]
                    }
                })
                console.log('Successfully found User-Roles!');
                res.status(200).send({
                    "message":"success",
                    "roles":roles
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to get user-roles : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//assignRoleToUser
export const assignRole = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await UserRole.create({
                    userID: data.user_id,
                    roleID:data.role_id
                })
                console.log('Successfully added a new User-Role!');
                res.status(200).send({
                    "message":"Successfully added a new User-Role!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add user-role : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//update assigned role
export const updateAssignedRole = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);

        

        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await UserRole.update({
                    roleID:data.role_id
                },{
                    where:{
                        user_id:data.user_id,
                        id:data.userrole_id
                    }
                })
                console.log('Successfully updated User-Role!');
                res.status(200).send({
                    "message":"Successfully updated User-Role!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to update user-role : "+error,
                });
            })
    } catch (error) {
        next(error);
    }
}

//remove assigned role
export const removeAssignedRole = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await UserRole.destroy({where:{
                        id:data.userrole_id
                    }
                })
                console.log('Successfully removed User-Role!');
                res.status(200).send({
                    "message":"Successfully removed User-Role!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove user-role : "+error,
                });
            })

    } catch (error) {
        next(error);
    }
}

//get assigned groups
export const getAssignedGroups = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const groupIdList = await UserGroup.findAll({
                    where:{
                        userID: data.user_id
                    }    
                });
                 
                const groups = await Group.findAll({
                    where:{
                        id:[...groupIdList]
                    }
                });


                console.log('Successfully added a new User-Group!');
                res.status(200).send({
                    "message":"Successfully added a new User-Group!",
                    "groups":groups
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add user-group : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}



//assignGroupToUser
export const assignGroup = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await UserGroup.create({
                    userID: data.user_id,
                    groupID:data.group_id
                })
                console.log('Successfully added a new User-Group!');
                res.status(200).send({
                    "message":"Successfully added a new User-Group!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add user-group : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//remove assigned group
export const removeAssignedGroup = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await UserGroup.destroy({
                    where:{
                        id:data.usergroup_id
                    }
                })
                console.log('Successfully removed User-Group!');
                res.status(200).send({
                    "message":"Successfully remvoed User-Group!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove user-group : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//get keywords
export const getAssignedKeywords = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                const keywords = await RoleKeyword.findAll({
                    where:{roleID: data.role_id}
                });
                console.log('Successfully fetched new role-keywrod!');
                res.status(200).send({
                    "message":"Successfully fetched new role-keywrod!",
                    "keywords":keywords
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add role-keyword : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//assign keywords to roles
export const assignKeyword = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await RoleKeyword.create({
                    roleID: data.role_id,
                    keyword:data.keyword
                })
                console.log('Successfully added a new role-keywrod!');
                res.status(200).send({
                    "message":"Successfully added a new role-keyword!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to add role-keyword : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}

//remove assigned keywords
export const removeAssignedKeyword = async (req, res, next) => {
    try {
        console.log("arrived");
        // console.log(req);
        //
        const data = req.body;
        console.log(data);
        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await RoleKeyword.destroy({
                    where:{
                        id:data.rolekeyword_id
                    }
                })
                console.log('Successfully removed Role Keyword!');
                res.status(200).send({
                    "message":"Successfully removed Role Keyword!!",
                });
            })
            .catch((error) => {
                console.log('Failed to synchronize with the database:', error);
                res.status(200).send({
                    "message":"Failed to remove role-keyword : "+error,
                });
            })

        

    } catch (error) {
        next(error);
    }
}



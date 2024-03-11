import { sequelize } from "../dbconnect.js";
import { User } from "../Models/User.model.js";

export const userCreated = async (req, res, next) => {
    try {
        console.log("arrived");

        //

        sequelize.sync()
            .then(async () => {
                // Insert new row using `create()` method
                await User.create({
                    firstName: 'tommy',
                    lastName: 'Singh'
                })
                console.log('Successfully added a new student!');
                res.status(200).send({
                    "message":"Successfully added a new student!",
                    
                });
            })
            .catch((error) => console.log('Failed to synchronize with the database:', error))

        //

    } catch (error) {
        next(error);
    }
}
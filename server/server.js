import express from "express";
import { sequelize } from "./dbconnect.js";
import { User } from "./Models/User.model.js";
const app = express()
const port = 8000

app.listen(port,()=>
console.log("ye serbhar chal raha hai"))



sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))


    sequelize.sync()
    .then(async () => {
        // Insert new row using `create()` method
        await User.create({
            firstName: 'Modi',
            lastName: 'Singh'
        })
        console.log('Successfully added a new student!')
    })
    .catch((error) => console.log('Failed to synchronize with the database:', error))


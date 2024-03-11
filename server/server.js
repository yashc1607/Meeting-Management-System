import express from "express";
import { sequelize } from "./dbconnect.js";

import userRouter from "./Routes/user.routes.js";
const app = express()
const port = 8000
app.use(express.json());

//router
app.use('/',userRouter);

app.listen(port,()=>
console.log("server running!!"))

sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))


    


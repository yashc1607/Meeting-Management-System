import express from "express";
import { sequelize } from "./dbconnect.js";
import cors from "cors";
import userRouter from "./Routes/user.routes.js";
const app = express()
const port = 8000
app.use(cors({
    credentials:true,
    origin:true,
    optionSuccessStatus:200
}));

app.use(express.json());



//router
app.use('/',userRouter);

app.listen(port,()=>
console.log("server running!!"))

sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))


    


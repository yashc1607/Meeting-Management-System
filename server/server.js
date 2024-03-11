import express from "express";
import { sequelize } from "./dbconnect.js";
<<<<<<< HEAD
//import userRouter from "./Routes/user.routes.js";
const app = express()
const port = 8000
app.use(express.json());
=======
import userRouter from "./Routes/user.routes.js";
const app = express();
const port = 8000;


app.use(express.json());

//router
app.use('/',userRouter);
>>>>>>> 2053530ff1c206ab7870ea9b906b46c68be64f34

app.listen(port,()=>
console.log("server running!!"))

sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))


    


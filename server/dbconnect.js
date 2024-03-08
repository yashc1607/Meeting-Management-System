// import {DATABASE_NAME,DATABASE_USERNAME,DATABASE_PASSWORD} from "./config.js"
import { Sequelize, DataTypes } from "sequelize"; 
import dotenv from 'dotenv';
dotenv.config();
// Creating new Object of Sequelize 
export const sequelize = new Sequelize( 
     process.env.DATABASE_NAME,
     process.env.DATABASE_USERNAME, 
     process.env.DATABASE_PASSWORD, { 
  
        // Explicitly specifying  
        // mysql database 
        dialect: 'mysql', 
  
        // By default host is 'localhost'            
        host: 'localhost'
    },
    DataTypes
); 
  
// Exporting the sequelize object.  
// We can use it in another file 
// for creating models 

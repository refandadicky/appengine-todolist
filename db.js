import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize('todolist'	, 'root', 'asdfghjkl',{ 
    host: '34.16.8.21',
    dialect:"mysql"});

    

export default db;
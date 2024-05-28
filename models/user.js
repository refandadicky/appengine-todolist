import { Sequelize } from "sequelize"
import db from "../db.js"




const User = db.define('users',{
    
    name : Sequelize.STRING,
    email : Sequelize.STRING,
    phone :  Sequelize.STRING,
    password : Sequelize.STRING,
    refres_token : Sequelize.TEXT
},{
    freezeTableName : true
});



export default User;

(async()=>{
    await db.sync()
})();
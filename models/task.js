import { Sequelize } from "sequelize"
import db from "../db.js"

const Task = db.define('user_tasks',{
    
    name : Sequelize.STRING,
    email : Sequelize.STRING,
    title :  Sequelize.STRING,
    description : Sequelize.STRING,
    category : Sequelize.ENUM('Home', 'Work', 'Education', 'Other'),
	status : Sequelize.ENUM('Pending', 'Completed', 'Restored')
},{
    freezeTableName : true
});



export default Task;

(async()=>{
    await db.sync()
})();
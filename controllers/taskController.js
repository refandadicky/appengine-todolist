import Task from "../models/task.js";

export const getTask = async(req, res) =>{
    try{
        const response = await Task.findAll();
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const getTaskById = async(req, res) =>{
    try{
        const response = await Task.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const createTask = async(req, res) =>{
    try{
        await Task.create(req.body);
        res.status(201).json({msg:"Task Created"});
    } catch(error){
        console.log(error.message);
    }
}

export const updateTask = async(req, res) =>{
    try{
        await Task.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Task Updated"});
    } catch(error){
        console.log(error.message);
    }
}

export const deleteTask = async(req, res) =>{
    try{
        await Task.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Task Deleted"});
    } catch(error){
        console.log(error.message);
    }
}

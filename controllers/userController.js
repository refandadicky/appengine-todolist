import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//Initial endpoint
export const initialEnpoint = async (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Connected to To-Do-List Backend!!",
    })
}


//get all user
export const getUser = async(req, res) =>{
    try{
        const response = await User.findAll();
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}


//Get User Data by id   
export const getUserById = async(req, res) =>{
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

//Buat tambah data user
export const Register = async(req, res) =>{
    try{
        const { email, password, name,  phone} = req.body;
        const encryptPassword = await bcrypt.hash(password, 5);
        await User.create({
            email: email,
            password: encryptPassword,
            name: name,
            phone: phone,

        });
        res.status(201).json({msg:"Register Berhasil"});
    } catch(error){
        console.log(error.message);
    }
}

//Login Handler
export const loginhandler= async(req, res)=>{
    try{
        const{email, password} = req.body;
        const user = await User.findOne({
            where : {
                email: email
            }
        });

        if(user){
            const decryptPassword = await bcrypt.compare(password, user.password);
            if(decryptPassword){
				const userPayload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                };
				console.log(process.env.ACCESS_TOKEN_SECRET);
				console.log(process.env.REFRES_TOKEN_SECRET);
                const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn : '30s' 
                });
                const refresToken = jwt.sign(userPayload, process.env.REFRES_TOKEN_SECRET, {
                    expiresIn : '1d' 
                });
                await User.update({refres_token:refresToken},{
                    where:{
                        id:user.id
                    }
                });
                res.cookie('refresToken', refresToken,{
                    httpOnly : true,
                    maxAge  : 24*60*60*1000,
                    secure: true
                });
                res.status(200).json({
                    status: "Succes",
                    message: "Login Berhasil",
                    user,
                    accessToken 
                });
            }
            else{
                res.status(400).json({
                    status: "Failed",
                    message: "Paassword atau email salah",
                  
                });
            }
        } else{
            res.status(400).json({
                status: "Failed",
                message: "Paassword atau email salah",
            });
        }
    } catch(error){
        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message
        })
    }
}

export const logout = async(req,res)=>{
    const refresToken = req.cookies.refresToken;
    if(!refresToken) return res.sendStatus(201);
    const user = await User.findOne({
        where:{
            refres_token:refresToken
        }
    });
    if(!user.refres_token) return res.sendStatus(204);
    const userId = user.id;
    await User.update({refres_token:null},{
        where:{
            id:userId
        }
    });
    res.clearCookie('refresToken');
    return res.sendStatus(200);
}

//Update user
export const updateUser = async(req, res) =>{
    try{

        const {  email, password, name, phone  } = req.body;
        let updatedData = {
            email,
            name,
            phone,
        };

        if (password) {
            const encryptPassword = await bcrypt.hash(password, 5);
            updatedData.password = encryptPassword;
        }

        const result = await User.update(updatedData, {
            where: {
                id: req.params.id
            }
        });

        // Periksa apakah ada baris yang terpengaruh (diupdate)
        if (result[0] === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found or no changes applied',
                updatedData: updatedData,
                result
            });
        }


        
        res.status(200).json({msg:"User Updated"});
    } catch(error){
        console.log(error.message);
    }
}

//Delete user
export const deleteUser = async(req, res) =>{
    try{
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User Deleted"});
    } catch(error){
        console.log(error.message);
    }
}
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const authToken = async(req, res)=>{
    try{
        const authToken = req.cookies.authToken;
        if(!authToken) return res.sendStatus(401);
        const user = await User.findAll({
            where:{
                refres_token:authToken
            }
        });
        if(!user.refres_token) return res.sendStatus(403);
        else jwt.verify(authToken, process.env.REFRES_TOKEN_SECRET,(err, decoded)=>{
            if(err) return res.sendStatus(403);
            user
            const accessToken = jwt.sign(user,   process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '30s'
            });
            res.json({accessToken});
        });
    }catch(error){
        console.log(error);
    }
}
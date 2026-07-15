import jwt from "jsonwebtoken"
import { User } from "../../models/user.models.js"
import { verifyAccessToken } from "./auth.service.js"

export const verifyJWT = async (req , res , next) => {

    try{
        //trying to get the accessToken either from authorization header
        //Authorization: Bearer eyJhbGciOi...

        const token = req.header("Authorization")?.replace("Bearer " , "")

        if(!token){
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = verifyAccessToken(token) 

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid or expired token" });
        where}

        const user = await User.findById(decodedToken.userId).select("-passwordHash")

        if(!user){
            return res.status(401).json({ message: "Invalid access token" });
        }

        req.user=user
        next()
        
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
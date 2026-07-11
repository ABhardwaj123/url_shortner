import mongoose from 'mongoose'
import { User } from '../../models/user.models.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {

    try{

        const hashedPass = await bcrypt.hash(password , 10)
        return hashedPass

    }catch(err){
        console.log(err)
    }
}

const comparePassword = async (password , hash) => {

    try{

        const isMatch = await bcrypt.compare(password , hash)
        return isMatch

    }catch(err){
        console.log(err)
    }

}

const generateAccessToken = async (user) => {

    try{

        const accessToken = jwt.sign(
            {
                userId: user._id
            },

            process.env.ACCESS_TOKEN_SECRET,

            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        return accessToken

    }catch(err){
        console.log(err)
    }
}

const generateRefreshToken = async (user) => {

    try{

        const refreshToken = jwt.sign(
            {
                userId: user._id
            },

            process.env.REFRESH_TOKEN_SECRET,

            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )

        return refreshToken

    }catch(err){
        console.log(err)
    }
}



const verifyAccessToken = (token) => {

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
}



const verifyRefreshToken = (token)=>{

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
}



export {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
import { trusted } from 'mongoose'
import { User } from '../../models/user.models.js'
import { hashPassword , generateAccessToken , generateRefreshToken , comparePassword } from './auth.service.js'

const signupUser = async (req , res) => {
    
    try{

        const { email , password } = req.body

        const existingUser = await User.findOne({
            email
        })

        if(existingUser){
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({
            email,
            passwordHash: hashedPassword
        })

        const refreshToken = generateRefreshToken(newUser)
        const accessToken = generateAccessToken(newUser)

        
        //'refreshToken' is the cookie name
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //javascript running on the browser cannot access this cookie
            secure: true  //cookie will be sent over HTTPS connections , not in plain HTTP
        });


        return res.status(201).json({
            message: "User created successfully",
            accessToken,

            //not returning the password
            user: { id: newUser._id, email: newUser.email }
        });

    }catch(err){

        console.log(err);
        return res.status(500).json({ message: "Something went wrong" })
    }


}



const loginUser = async(req , res) => {
    
    try{

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, existingUser.passwordHash);

        if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(existingUser);
        const refreshToken = generateRefreshToken(existingUser);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            //to indicate whether the app is running in "development", "production", "test"
            secure: process.env.NODE_ENV === 'production'
        });

            return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: { id: existingUser._id, email: existingUser.email }
        });

    }catch(err){

        console.log(err);
        return res.status(500).json({ message: "Something went wrong" })

    }
}

export {
    loginUser,
    signupUser
}
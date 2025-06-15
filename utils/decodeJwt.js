import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()

export const decodeJwt= async(token)=>{
   try {
     if(!token)return res.status(401).json({message:"access token required"})
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
   return decoded
   } catch (error) {
    return null
   }

}
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export function signToken(payload){
    return jwt.sign(payload, secretKey, {expiresIn: "7d"});
}

export function VerifyToken(token){
    try{
        return jwt.verify(token, secretKey);
    }catch(error){
        return null;
    }
}
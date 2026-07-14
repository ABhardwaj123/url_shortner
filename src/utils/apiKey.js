import crypto from 'crypto';
import { raw } from 'express';

//node build in module -> crypto

const generateRawApiKey = () => {
    //generates 32 random bytes from 0-255
    //then converts to hexadecimal string
    //each byte is 2 hex characters so total 64 chars
    return crypto.randomBytes(32).toString('hex')
}


const hashApiKey = (rawKey) => {
    //hash using the 'sha256' algorithm
    //update feeds input data
    //digest('hex') tells it to give output as hexadecimal string
    return crypto.createHash('sha256').update(rawKey).digest('hex')
}


export {generateRawApiKey , hashApiKey}
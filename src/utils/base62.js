import { Url } from "../models/url.models.js";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH = 7;

const generateRandomCode = () => {
    let code = '';
    for (let i = 0; i < CODE_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        code += ALPHABET[randomIndex];
    }

    return code;
};


//while loop to check and avoid collisions
const generateUniqueShortCode = async () => {
    let code;
    let exists = true;

    while(exists){
        code = generateRandomCode()

        const existingUrl = await Url.findOne({
            shortCode: code
        })

        if(!existingUrl){
            exists=false
        }
    }

    return code
}


export { generateUniqueShortCode };

//base62 encoding is basically a popular encoding strategy using the 26 lowercase alphabets + 26 uppercase alphabets + 10 digits
import { ApiKey } from "../../models/apiKey.models.js";
import { hashApiKey } from "../../utils/apiKey.js";


const verifyApiKey = async (req , res , next) => {

    try{

        //custom header for sending an API key
        const key = req.header("x-api-key")
        if(!key){
            return res.status(401).json({
                message: "API key missing"
            })
        }

        const hashedInputKey = hashApiKey(key)

        const existingKey = await ApiKey.findOne({
            hashedKey: hashedInputKey
        })

        if(!existingKey){
            return res.status(401).json({
                message: "invalid json key"
            })
        }

        if(existingKey.isActive === false){
            return res.status(401).json({
                message: "API key has beem revoked"
            })
        }

        existingKey.lastUsedAt = new Date();
        await existingKey.save();

        //as req is passed on , we attach info to it
        req.apiKeyOwner = existingKey.owner
        req.apiKeyDoc = existingKey;

        next()
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }

}



export { verifyApiKey };
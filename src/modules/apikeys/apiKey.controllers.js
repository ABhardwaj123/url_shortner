import { createApiKey , getUserApiKeys } from './apiKey.service.js'

const createKey = async (req , res) => {

    try{
        const { name } = req.body
        if(!name){
            return res.status(400).json({message: "name is missing"})
        }

        const userId = req.user._id
        
        //apiKey is the raw random apiKey generated
        //keyInfo is the whole object created for database
        const { apiKey, keyInfo } = await createApiKey(userId , name)

        return res
        .status(201)
        .json({
            message: "API key is created",
            apiKey,
            keyInfo: {
                id: keyInfo._id,
                name: keyInfo.nameOfKey,
                createdAt: keyInfo.createdAt
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }

}



const getMyKeys = async (req , res) => {
    try {
        const userId = req.user._id;
        const keys = await getUserApiKeys(userId);
        return res.status(200).json({ keys });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}


export { createKey , getMyKeys}
import { ApiKey } from '../../models/apiKey.models.js'
import { generateRawApiKey , hashApiKey } from '../../utils/apiKey.js'

const createApiKey = async (userId , name) => {

    const rawApiKey = generateRawApiKey()
    const hashedKey = hashApiKey(rawApiKey)

    const newApiKey = await ApiKey.create({
        owner: userId,
        hashedKey,
        nameOfKey: name,
        isActive: true,
    })

    return {
        apiKey: rawApiKey,
        keyInfo: newApiKey
    }
}



const getUserApiKeys = async (userId) => {

    const keys = await ApiKey.find({
        owner: userId
    }).select("hashedKey")

    return keys
}


export { createApiKey , getUserApiKeys}
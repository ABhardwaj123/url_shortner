import { Url } from "../../models/url.models.js";
import { generateUniqueShortCode } from "../../utils/base62.js";

const createShortUrl = async (originalUrl, userId) => {
    
    const shortCode = await generateUniqueShortCode()

    const newUrl = await Url.create({
        user: userId,
        shortCode: shortCode,
        originalUrl: originalUrl,
        isActive: true
    })

    return newUrl
};

const getUserUrls = async (userId) => {
    
    const allUrls = await Url.find({
        user: userId
    })

    return allUrls
};

export { createShortUrl, getUserUrls };
import { Url } from "../../models/url.models.js";
import redis from "../../config/redis.js"

const redirectToOriginalUrl = async (req , res) => {

    try{
        const { shortCode } = req.params;
        // 1. check Redis cache
        const cachedUrl = await redis.get(shortCode)
        // 2. if found -> redirect
        if (cachedUrl) {
            return res.redirect(cachedUrl);
        }
        // 3. if not found -> query Mongo
        const actualUrl = await Url.findOne({
            shortCode: shortCode
        })
        // 4. if not found in Mongo -> 404
        if(!actualUrl){
            return res.status(404).json({
                message: "URL not found"
            })
        }
        // 5. if inactive or expired -> 410
        if(actualUrl.isActive === false){
            return res.status(410).json({
                message: "URL is not active"
            })
        }
        // 6. cache it in Redis
        //'EX' is expiry in 3600 seconds(1hr)
        await redis.set(shortCode , actualUrl.originalUrl , 'EX' , 3600)
        // 7. redirect
        return res.redirect(actualUrl.originalUrl)


    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export { redirectToOriginalUrl }
import redis from '../../config/redis.js';

const checkRateLimit = async (key, limit, windowInSeconds) => {
    // 1. increment the counter, get the new count
    const currentCount = await redis.incr(key)
    // 2. if count === 1, set expiry on this key
    if(currentCount === 1){
        await redis.expire(key , windowInSeconds)
    }
    // 3. return whether count exceeds limit (true = allowed, false = blocked)
    if(currentCount > limit){
        return false;
    }

    return true;

};



const RATE_LIMIT_WINDOW_SECONDS = 60



const rateLimiter = async (req , res , next) => {

    try{

        const redisKey = `rateLimit:${req.apiKeyDoc._id}`
        const limit = req.apiKeyDoc.rateLimit

        const allowed = await checkRateLimit(redisKey , limit , RATE_LIMIT_WINDOW_SECONDS)

        if(!allowed){
            return res.status(429).json({
                message: "rate limit exceeded , try again later"
            })
        }

        next()

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export { checkRateLimit , rateLimiter };
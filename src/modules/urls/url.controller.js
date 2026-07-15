import { createShortUrl, getUserUrls } from "./url.service.js"


const createUrl = async (req , res) => {
    
    try{

        const { originalUrl } = req.body
        const userId = req.user?._id || req.apiKeyOwner

        if(!originalUrl){
            return res.status(400).json({message: "originalUrl is required"})
        }

        const newUrl = await createShortUrl(originalUrl , userId)

        return res
        .status(201).
        json({ message: "Short URL created successfully", 
            shortUrl: `http://localhost:5000/${newUrl.shortCode}`, 
            originalUrl: newUrl.originalUrl 
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
    
}


const getMyUrls = async (req , res) => {

    try{

        const userId = req.user._id
        const urls = await getUserUrls(userId)

        return res.status(200).json({ urls });

    }catch(err){

        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }

}

export { createUrl , getMyUrls }
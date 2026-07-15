import { Url } from "../../models/url.models.js";
import { getClickStats } from "./analytics.service.js"; 

const getUrlAnalytics = async (req , res) => {
    try{

        const { urlId } = req.params
        const userId = req.user._id

        const url = await Url.findOne({
            _id: urlId,
            user: userId
        })

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        const stats = await getClickStats(urlId);

        return res.status(200).json(stats);

    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export { getUrlAnalytics }
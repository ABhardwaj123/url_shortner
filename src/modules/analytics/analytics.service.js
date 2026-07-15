import { Click } from "../../models/click.models.js";

const logClick = async (urlId) => {
    await Click.create({
        url: urlId
    })
}




const getClickStats = async (urlId) => {

    const totalClicksResult = await Click.aggregate([

        {
            $match:{
                url: urlId
            }
        },

        {
            $group: {
                _id: null,
                totalClicks: {
                    $sum: 1
                }
            }
        }
    ])

    const clicksByDay = await Click.aggregate([
        {
            $match: {
                url: urlId
            }
        },

        {
            $group: {
                _id: { $dateToString : { format: "%Y-%m-%d", date: "$clickedAt" }},
                totalClicks: {
                    $sum: 1
                }
            }
        }
    ])

    const totalClicks = totalClicksResult[0]?.totalClicks || 0

    return {
        totalClicks,
        clicksByDay
    }
}



export { logClick , getClickStats }
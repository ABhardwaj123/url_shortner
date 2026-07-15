import mongoose , { Schema } from "mongoose";

const clickSchema = new Schema({

    url: {
        type: mongoose.Types.ObjectId,
        ref: 'Url',
        required: true
    },


    clickedAt: {
        type: Date,
        default: Date.now
    }

})

export const Click = mongoose.model('Click' , clickSchema)
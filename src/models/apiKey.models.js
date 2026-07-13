import mongoose , { Schema } from "mongoose";

//this serves the purpose of someone using our app's api key
const apiKeySchema = new Schema({

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    hashedKey: {
        type: String,
        required: true
    },

    nameOfKey: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastUsedAt: {
        type: Date,
        default: null
    },

    rateLimit: {
        type: Number,
        default: 100  
    }

} , {timestamps: true})

export const ApiKey = mongoose.model('ApiKey' , apiKeySchema)
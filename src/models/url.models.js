import mongoose , { Schema } from "mongoose";

const urlSchema = new Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    shortCode: {
        type: String, 
        required: true,
        unique: true
    },

    originalUrl: { 
        type: String,
        required: true 
    },

    isActive: {
        type: Boolean, 
        default: true
    }

}, {timestamps: true})

export const Url = mongoose.model('Url' , urlSchema)
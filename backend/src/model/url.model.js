import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    longUrl: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
    },
    password: {
        type: String,
    },
    clicks: {
        type: Number,
        default: 0
    },
}, { timestamps: true }
);

const Url=mongoose.model("Url",urlSchema);

export default Url;

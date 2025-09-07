import mongoose from "mongoose";

const urlAnalyticsSchema= new mongoose.Schema({
    shortCode:{
        type:String,
        required:true,

    },
    ip:{
        type:String,
    },
    agent:{
        type:String,
    },
    location:{
        country:{
            type:String,
        },
        region:{
            type:String,
        },
        city:{
            type:String,
        }
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
});


const UrlAnalytics= mongoose.model("UrlAnalytics",urlAnalyticsSchema);

export default UrlAnalytics;
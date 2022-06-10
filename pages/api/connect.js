import mongoose from "mongoose";
import User from "../../models/User";
import Survey from "../../models/Survey";

const url = "mongodb+srv://admin:wqzOGQN55aTWDzmH@survey-app-cluster.42puv.mongodb.net/survey-app-db?retryWrites=true&w=majority"


export default async function handler(req, res) {
    if ( mongoose.connections[0].readyState) {
        console.log('already connected');
    } else {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true} ).then( () => {
            console.log("connected");
        })
    }
    res.status(200).json({ message: 'connected' })
}

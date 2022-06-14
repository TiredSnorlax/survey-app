import mongoose from "mongoose";

const url = process.env.NEXT_PUBLIC_MONGODB_URL.toString();


export default async function handler(req, res) {
    console.log(mongoose.connection.readyState)
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true} ).then( () => {
            console.log("new connection");
    })
 }

    res.status(200).json({ message: 'connected' })
}

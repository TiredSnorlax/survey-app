import mongoose from "mongoose";


export default async function handler(req, res) {
    if ( req.method === "POST") {
        await mongoose.disconnect();
        console.log("disconnect")
        res.status(200).json({ message: 'disconnected'})
    }
}

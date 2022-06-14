import mongoose from "mongoose";
import Survey from '../../models/Survey'
import User from "../../models/User";

export default async function handler(req, res) {
    let { u }  = req.body;

    const user = await User.findOne({ email: u.email}).populate("surveys").exec();
    if (user) {
        console.log(user);
        res.status(200).json({ message: 'got user', user })
    } else {
        console.log("create new user");
        console.log(u.email)
        const newUser = new User({ username: u.name, email: u.email, picture: u.picture, survey: [] })
        const saved = await newUser.save();
        res.status(200).json({ message: 'created new user', user: saved })
    }

}

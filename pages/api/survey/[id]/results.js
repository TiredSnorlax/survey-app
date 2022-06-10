import mongoose from "mongoose";
import Survey from '../../../../models/Survey';

export default async function getSurvey(req, res) {
    const { id, userID } = req.query;
    console.log(req.query);
    const survey = await Survey.findById(id).populate('questions responses').exec();
    if ( survey.creator._id.toString() !== userID) {
        res.status(401).json({message: "Unauthorized. Please login with the right account"})
        return
    }
    res.status(200).json({ message: "Got results successfully", survey});

}

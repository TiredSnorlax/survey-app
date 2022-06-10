import mongoose from "mongoose";
import Survey from '../../../models/Survey';
import User from "../../../models/User";

export default async function createNew(req, res) {
    console.log(req.body.email)
    const creator = await User.findOne({ email: req.body.email }).exec();


    if (req.method === 'POST') {
    // Process a POST request
        console.log(req.body);
        const survey = new Survey({
            title: "Untitled Survey",
            description: "Please enter a description...",
            questions: [],
            responses: [],
            creator: creator._id.toString(),
        })

        survey.save().then( (result) => {
            creator.surveys.push(survey);
            creator.save();
            res.status(200).json({ message: "new survey created", survey: result });
        }).catch( (err) => console.log(err.message));

    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: "only post methods are allowed"})
    }
}
import mongoose from "mongoose";
import Survey from '../../../../models/Survey';

export default async function getSurvey(req, res) {
    if (req.method === "POST") {
        const { userID, purpose } = req.body;
        const { id } = req.query;
        const survey = await Survey.findById(id).populate('questions').exec();
        console.log(survey)
        if ( purpose === "edit" && survey.creator.toString() !== userID) {
            res.status(401).json({message: "Unauthorized. Please login with the right account"})
            return
        }
        const surveyWithoutCreator = {
            title: survey.title,
            description: survey.description,
            questions: survey.questions,
            responses: survey.responses
        }
        res.status(200).json({ message: "Got survey successfully", survey: surveyWithoutCreator });
    }

}

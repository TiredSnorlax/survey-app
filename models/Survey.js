import mongoose from "mongoose";
import Question from './Question';

const Schema = mongoose.Schema;

const surveySchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question",
    }],
    responses: [{
        type: Object,
        required: false,
    }]
}, { timestamps: true } );

const Survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);
export default Survey;

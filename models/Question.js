import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    isMCQ: {
        type: Boolean,
        required: true,
    },
    options: [{
        type: String,
        required: false,
    }],
    responses: [{
        type: Number,
        required: false,
    }]
    // survey: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Survey',
    // }
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);
export default Question;
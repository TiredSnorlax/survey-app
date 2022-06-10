import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    picture: {
        type: String,
        required: false,
    },
    surveys: [{
        type: Schema.Types.ObjectId,
        ref: "Survey",
        required: false,
    }]

}, { timestamps: true } );

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

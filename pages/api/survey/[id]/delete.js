import User from '../../../../models/User';
import Survey from '../../../../models/Survey';
import Question from '../../../../models/Question';

const del = async (id, userID) => {
        // Remove survey from user
        const _user = await User.findOneAndUpdate({ _id: userID }, {
            $pullAll: {
                surveys: [id],
            }
        }, {new: true}).populate("surveys");
        console.log(_user);

        // Deleting Questions
        const _survey = await Survey.findById(id).populate("questions").exec();
        console.log(_survey);
        const _questions = _survey.questions;

        let _questionIDs = [];
        _questions.forEach( q => {
            _questionIDs.push(q._id.toString());
        });

        console.log(_questionIDs);
        if (_questionIDs) {
            await Question.deleteMany({ _id: _questionIDs});
        }

        await Survey.deleteOne({ _id: id })
        return _user;
}

export default async function deleteSurvey(req, res) {
    if (req.method === "POST") {
        const { id, userID } = req.body;

        try {
            const _user = await del(id, userID);
            console.log(_user);
            res.status(200).json({message: "Deleted Survey", user: _user})
        } catch (error) {
            res.status(400).json({message: "Error, please try again", error})
        }
    }
}

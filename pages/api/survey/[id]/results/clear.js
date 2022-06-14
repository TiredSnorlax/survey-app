import Survey from '../../../../../models/Survey';

export default async function clearResults(req, res) {
    if (req.method === "POST") {
        const { userID, purpose } = req.body;
        const { id } = req.query;
        const survey = await Survey.findById(id).populate("responses questions").exec();
        if ( purpose === "edit" && survey.creator.toString() !== userID) {
            res.status(401).json({message: "Unauthorized. Please login with the right account"})
            return
        } else {
            try {
                survey.responses = [];
                await survey.save();

                res.status(200).send({ message: "Responses cleared", survey });
            } catch (error) {
                res.status(500).send({ message: error.message })
            }
        }
    }
}
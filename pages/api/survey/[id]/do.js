import Survey from "../../../../models/Survey";

export default async function getResponse(req, res) {
    if (req.method === "POST") {
        const { data, id } = req.body;
        const survey = await Survey.findById(id).populate("responses").exec();
        try {
            const _responses = survey.responses;
            _responses.push(data);
            survey.responses = _responses;
            console.log(_responses)
            await survey.save();
            res.status(200).json({message: "Response received"});
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error});
        }
    }
}
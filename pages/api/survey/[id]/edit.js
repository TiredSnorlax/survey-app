import Question from '../../../../models/Question';
import Survey from '../../../../models/Survey';

export default async function editSurvey(req, res) {
if (req.method === 'POST') {
    const _id = req.query.id;
    const {content, questions} = req.body;
    const _survey = await Survey.findById(_id).populate("questions").exec();
    let _newQuestions = [];
    for (let i = 0; i < questions.length; i++ ) {
      const q = questions[i];
      if (q._id) {
        // update question
        console.log(questions[i])
        let res = await Question.findByIdAndUpdate(q._id, {...q}, {new:true});
        _newQuestions.push(res);
      } else {
        // create new question
        console.log({...q});
        let _new = new Question({ ...q });
        let res = await _new.save();
        _newQuestions.push(res);
      }
    };
    const _newQuestionsId = questions.map( q => (q._id));
    _survey.questions.forEach( async question => {
      if (!_newQuestionsId.includes(question._id.toString())) {
        await Question.deleteOne({_id: question._id.toString()});
        console.log("delete " + question._id.toString());
      }
    });
    _survey.questions = _newQuestions;
    _survey.title = content.newTitle;
    _survey.description = content.newDescription;
    await _survey.save().then( saved => {
      res.status(200).json({message: "Saved", survey: saved})
    })
    // await Survey.findByIdAndUpdate(_id, {...content, questions: [..._newQuestions]}).populate("questions").exec().then( res => {
    //   console.log("new updateeeeee")
    //   console.log(res);
    // });

  } else {
    // Handle any other HTTP method
  }
}
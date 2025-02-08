import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { answer, dispatch, index, numQuestions } = useQuiz()
  if (answer === null) return;

  if (index < numQuestions - 1) {
    return (
      <div>
        <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
      </div>
    )
  }
  if (index === numQuestions - 1) {
    return (
      <div>
        <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>Finish</button>
      </div>
    )
  }

}

import { useQuiz } from "../contexts/QuizContext"




export default function Options() {
  const { questions, index, dispatch, answer } = useQuiz()
  const question = questions[index]
  const hasAnswered = answer !== null

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? 'answer' : ''}  ${hasAnswered
            ? index === question.correctOption
              ? 'correct'
              : 'wrong'
            : ''}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

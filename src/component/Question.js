import { useQuiz } from "../contexts/QuizContext"
import Options from "./Options"
export default function Question() {
  const { questions, index } = useQuiz()
  const question = questions[index]
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  )
}

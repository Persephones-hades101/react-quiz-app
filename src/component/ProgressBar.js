
export default function ProgressBar({ index, numQuestions, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={15} value={index + Number(answer !== null)} />
      <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
      <p>Points <strong>{points}</strong>/{maxPoints}</p>
    </header>
  )
}

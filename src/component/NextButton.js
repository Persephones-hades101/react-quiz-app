
export default function NextButton({ answer, dispatch }) {
  if (answer === null) return;
  return (
    <div>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    </div>
  )
}

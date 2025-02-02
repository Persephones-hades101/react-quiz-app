
export default function Options({ options }) {
  return (
    <div className="options">
      {options.map((option) => (
        <button className="btn btn-option">{option}</button>
      ))}
    </div>
  )
}


export default function FinishScreen({ points, maxPoints, highestScore }) {
  const percentage = points / maxPoints * 100
  const highestPercentage = highestScore / maxPoints * 100
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <div className="result">
        <p>
          <span>{emoji}</span>
          You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
        </p>
      </div>
      <div className="highscore">
        <strong>Your highest score is {highestScore} out of {maxPoints} ({Math.ceil(highestPercentage)}%)</strong>
      </div>
    </>
  )
}

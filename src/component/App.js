import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import ProgressBar from './ProgressBar'
const initialState = {
  questions: [],
  // "loading","error","ready","active","finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0
}

function reducer(state, action) {
  switch (action.type) {

    case "dataReceived":
      return {
        ...state, questions: action.payload, status: "ready"
      }

    case "dataFailed":
      return {
        ...state, status: "error"
      }

    case "start":
      return { ...state, status: "active" }

    case "newAnswer":
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ? state.points + question.points : state.points
      }

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    default:
      throw new Error("Invalid action!")
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }))
  }, [])

  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <ProgressBar index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  )
}

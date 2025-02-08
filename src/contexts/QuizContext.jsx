import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext()


const SECS_PER_QUES = 30


const initialState = {
  questions: [],
  // "loading","error","ready","active","finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  secondsRemaining: null
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
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUES }

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

    case "finish":
      return {
        ...state,
        status: "finish",
        highestScore: state.highestScore < state.points ? state.points : state.highestScore
      }

    case "restart":
      return {
        ...initialState,
        status: 'active',
        questions: state.questions,
        highestScore: state.highestScore,
        secondsRemaining: state.questions.length * SECS_PER_QUES
      }

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finish' : state.status
      }
    default:
      throw new Error("Invalid action!")
  }
}

function QuizProvider({ children }) {

  const [{ questions, status, index, answer, points, highestScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  return (
    <QuizContext.Provider value={{ questions, status, index, answer, points, highestScore, secondsRemaining, dispatch, numQuestions, maxPoints }}>
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("QuizContext was used outside the QuizProvider")
  return context
}

export { QuizProvider, useQuiz };
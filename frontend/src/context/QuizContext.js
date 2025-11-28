import React, { createContext, useContext, useReducer } from 'react';
import { saveQuizScore } from '../utils/storage';

const QuizContext = createContext();

// Action types
const ACTIONS = {
  START_QUIZ: 'START_QUIZ',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  FINISH_QUIZ: 'FINISH_QUIZ',
  RESET_QUIZ: 'RESET_QUIZ',
};

// Initial state
const initialState = {
  currentTopic: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [], // Array of selected answer indices
  score: 0,
  isFinished: false,
  showResults: false,
};

// Reducer
const quizReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_QUIZ:
      return {
        ...initialState,
        currentTopic: action.payload.topic,
        questions: action.payload.questions,
      };
    
    case ACTIONS.ANSWER_QUESTION:
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = action.payload;
      return {
        ...state,
        answers: newAnswers,
      };
    
    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    
    case ACTIONS.FINISH_QUIZ:
      const score = calculateScore(state.questions, state.answers);
      return {
        ...state,
        score,
        isFinished: true,
        showResults: true,
      };
    
    case ACTIONS.RESET_QUIZ:
      return initialState;
    
    default:
      return state;
  }
};

// Helper function to calculate score
const calculateScore = (questions, answers) => {
  let correct = 0;
  questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correct++;
    }
  });
  return correct;
};

// Provider component
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Start quiz
  const startQuiz = (topic) => {
    dispatch({
      type: ACTIONS.START_QUIZ,
      payload: {
        topic,
        questions: topic.quiz,
      },
    });
  };

  // Answer current question
  const answerQuestion = (answerIndex) => {
    dispatch({
      type: ACTIONS.ANSWER_QUESTION,
      payload: answerIndex,
    });
  };

  // Move to next question
  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: ACTIONS.NEXT_QUESTION });
    } else {
      finishQuiz();
    }
  };

  // Finish quiz
  const finishQuiz = async () => {
    dispatch({ type: ACTIONS.FINISH_QUIZ });
    
    // Save quiz score
    try {
      const score = calculateScore(state.questions, state.answers);
      await saveQuizScore(state.currentTopic.id, score, state.questions.length);
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    dispatch({ type: ACTIONS.RESET_QUIZ });
  };

  // Get current question
  const getCurrentQuestion = () => {
    return state.questions[state.currentQuestionIndex];
  };

  // Get quiz progress
  const getProgress = () => {
    return {
      current: state.currentQuestionIndex + 1,
      total: state.questions.length,
      percentage: ((state.currentQuestionIndex + 1) / state.questions.length) * 100,
    };
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    return state.answers[state.currentQuestionIndex] !== undefined;
  };

  // Get quiz results
  const getResults = () => {
    return {
      score: state.score,
      total: state.questions.length,
      percentage: Math.round((state.score / state.questions.length) * 100),
      answers: state.answers.map((answer, index) => ({
        question: state.questions[index],
        selectedAnswer: answer,
        isCorrect: answer === state.questions[index].correctAnswer,
      })),
    };
  };

  const value = {
    ...state,
    startQuiz,
    answerQuestion,
    nextQuestion,
    finishQuiz,
    resetQuiz,
    getCurrentQuestion,
    getProgress,
    isCurrentQuestionAnswered,
    getResults,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
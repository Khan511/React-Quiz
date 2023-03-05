import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [waitting, setWaitting] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 2,
    category: "history",
    difficulty: "easy",
  });

  const fetchData = async (url) => {
    setLoading(true);
    setWaitting(false);

    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;

      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaitting(false);
        setError(false);
      } else {
        setError(true);
        setWaitting(true);
      }
    } else {
      setWaitting(true);
    }
  };

  const modalOpen = () => {
    setIsModalOpen(true);
    setLoading(false);
    setWaitting(false);
    setShowQuiz(false);
  };

  const handleNextQuestion = () => {
    setIndex((oldIndex) => {
      const newIndex = oldIndex + 1;
      if (newIndex > questions.length - 1) {
        modalOpen();
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  const playAgain = () => {
    setWaitting(true);
    setIsModalOpen(false);
    setCorrectAns(0);
  };

  const handleCorrectAns = (value) => {
    if (value) {
      setCorrectAns((oldValue) => oldValue + 1);
    }
    handleNextQuestion();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, difficulty, category } = quiz;

    setShowQuiz(true);
    setWaitting(false);

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;

    fetchData(url);
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        error,
        index,
        loading,
        waitting,
        showQuiz,
        questions,
        correctAns,
        isModalOpen,
        setError,
        setIndex,
        playAgain,
        setWaitting,
        handleSubmit,
        handleChange,
        setCorrectAns,
        handleCorrectAns,
        handleNextQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

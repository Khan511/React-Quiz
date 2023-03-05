import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    index,
    loading,
    waitting,
    showQuiz,
    questions,
    correctAns,
    isModalOpen,
    handleCorrectAns,
    handleNextQuestion,
  } = useGlobalContext();

  if (waitting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading className="loading"></Loading>;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];

  let totalAns = [...incorrect_answers];

  const randomNumber = Math.floor(Math.random() * 4);

  if (randomNumber === 3) {
    totalAns.push(correct_answer);
  } else {
    totalAns.push(totalAns[randomNumber]);
    totalAns[randomNumber] = correct_answer;
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      {showQuiz && (
        <section className="quiz">
          <p className="correct-answers">
            Correct Anwers: {correctAns}/{index}
          </p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {totalAns.map((ans, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleCorrectAns(ans === correct_answer)}
                    dangerouslySetInnerHTML={{ __html: ans }}
                    className="answer-btn"
                  />
                );
              })}
            </div>
          </article>
          <button className="next-question" onClick={handleNextQuestion}>
            Next Question
          </button>
        </section>
      )}
    </main>
  );
}

export default App;

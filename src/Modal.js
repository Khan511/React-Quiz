import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { correctAns, questions, playAgain } = useGlobalContext();

  const correctAnsers = correctAns ? (correctAns / questions.length) * 100 : 0;
  return (
    <div className="modal-content">
      <h2>Congrats!</h2>
      <p>You answered {correctAnsers.toFixed(0)}% of questions correctly</p>
      <button className="close-btn" onClick={playAgain}>
        Play Again
      </button>
    </div>
  );
};

export default Modal;

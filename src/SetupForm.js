import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { error, handleChange, handleSubmit, quiz } = useGlobalContext();

  return (
    <section className="quiz quiz-small">
      <form className="setup-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Setup Quiz</h2>
        <div className="form-control">
          <label htmlFor="ques">Number Of Question</label>
          <input
            type="number"
            id="ques"
            min={1}
            max={50}
            name="amount"
            value={quiz.amount}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-control">
          <label htmlFor="cate">Category</label>
          <select
            name="category"
            id="cate"
            value={quiz.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="history">History</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="diffi">Select Difficulty</label>
          <select
            id="diffi"
            name="difficulty"
            value={quiz.difficulty}
            onChange={handleChange}
            className="form-input"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {error && (
          <p className="error">
            Can't generate questions, please try different options.
          </p>
        )}
        <div>
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            Start
          </button>
        </div>
      </form>
    </section>
  );
};

export default SetupForm;

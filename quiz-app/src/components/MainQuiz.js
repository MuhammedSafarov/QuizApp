import React from "react";
import { quizData } from "./quizData";

class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options,
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer,
        };
      });
    }
  }

  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true,
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <div className="show-result">
            Your have <b className="score">{this.state.score}</b> correct
            answers{" "}
          </div>
          <div className="result-box">
            <p>The correct answer's for the questions was :</p>
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating-message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="quiz-box">
          <h2>{this.state.questions} </h2>
          {options.map((option) => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <div className="btn-div">
              <span>{`${currentQuestion + 1} of ${
                quizData.length
              } questions `}</span>
              <button
                className="ui inverted-button"
                disabled={this.state.disabled}
                onClick={this.nextQuestionHandler}
              >
                Next
              </button>
            </div>
          )}
          {currentQuestion === quizData.length - 1 && (
            <div className="btn-div">
              <span>{`${currentQuestion + 1} of ${
                quizData.length
              } questions `}</span>
              <button
                className="ui inverted-button"
                onClick={this.finishHandler}
              >
                Finish
              </button>
            </div>
          )}
        </div>
      );
    }
  }
}

export default MainQuiz;

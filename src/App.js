import React, { useState, useEffect } from 'react';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
import questionService from './quizService/index';

const App = () => {

    const [questionBank, setQuestionBank] = useState([]);
    const [score, setScore] = useState(0);
    const [response, setResponse] = useState(0);

    useEffect(() => {
        getQuestionBank();
    }, [])

    const getQuestionBank = () => {
        questionService().then(questions => setQuestionBank(questions));
    }

    const computeAnswer = (answer, correct) => {
        if (answer === correct)
            setScore(prevState => prevState + 1);
        setResponse(prevState => prevState + 1);
    }

    const playAgain = () => {
        getQuestionBank();
        setScore(0);
        setResponse(0);
    }

    return (
        <div className="container">
            <div className="title">QuizBee</div>
            {response < 5 &&
                questionBank.length > 0 && questionBank.map(({ questionId, question, answers, correct }) => (
                    <QuestionBox
                        question={question}
                        options={answers}
                        key={questionId}
                        selected={answer => computeAnswer(answer, correct)}
                    />
                ))
            }
            {response === 5 && <Result score={score} playAgain={playAgain} />}
        </div>
    )
}

export default App;
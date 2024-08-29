// src/components/QuizMode.js
import React, { useState, useEffect } from 'react';

const QuizMode = ({ flashcards, endQuiz }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(false);
      setTimeLeft(30);
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = (correct) => {
    setAttempted(attempted + 1);
    if (correct) setScore(score + 1);
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setTimeLeft(30);
  };

  return (
    <div className="quiz-mode">
      <div>Time left: {timeLeft}s</div>
      {attempted < flashcards.length ? (
        <>
          <div
            className="flashcard"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer
              ? flashcards[currentIndex].answer
              : flashcards[currentIndex].question}
          </div>
          <button onClick={() => handleNext(true)}>Correct</button>
          <button onClick={() => handleNext(false)}>Wrong</button>
        </>
      ) : (
        <button onClick={() => endQuiz(score)}>End Quiz</button>
      )}
    </div>
  );
};

export default QuizMode;

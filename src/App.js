// src/App.js
import React, { useState, useEffect } from 'react';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import QuizMode from './components/QuizMode';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedFlashcards = JSON.parse(localStorage.getItem('flashcards'));
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (storedFlashcards) setFlashcards(storedFlashcards);
    if (storedDarkMode !== null) setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addFlashcard = (flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  const updateFlashcard = (index, updatedFlashcard) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index] = updatedFlashcard;
    setFlashcards(updatedFlashcards);
  };

  const deleteFlashcard = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizEnded(false);
  };

  const endQuiz = (finalScore) => {
    setQuizStarted(false);
    setQuizEnded(true);
    setScore(finalScore);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Flashcard Quiz App</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      {!quizStarted && !quizEnded && (
        <>
          <FlashcardForm addFlashcard={addFlashcard} />
          <FlashcardList
            flashcards={flashcards}
            updateFlashcard={updateFlashcard}
            deleteFlashcard={deleteFlashcard}
          />
          {flashcards.length > 0 && <button onClick={startQuiz}>Start Quiz</button>}
        </>
      )}
      {quizStarted && <QuizMode flashcards={flashcards} endQuiz={endQuiz} />}
      {quizEnded && <ProgressTracker score={score} total={flashcards.length} />}
    </div>
  );
};

export default App;

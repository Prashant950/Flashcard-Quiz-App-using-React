// src/components/FlashcardForm.js
import React, { useState } from 'react';

const FlashcardForm = ({ addFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      addFlashcard({ question, answer, category });
      setQuestion('');
      setAnswer('');
      setCategory('General');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        {/* Add more categories as needed */}
      </select>
      <button type="submit">Add Flashcard</button>
    </form>
  );
};

export default FlashcardForm;

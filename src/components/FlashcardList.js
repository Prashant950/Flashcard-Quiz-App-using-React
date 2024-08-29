// src/components/FlashcardList.js
import React, { useState } from 'react';

const FlashcardList = ({ flashcards, updateFlashcard, deleteFlashcard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFlashcards =
    selectedCategory === 'All'
      ? flashcards
      : flashcards.filter((card) => card.category === selectedCategory);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredFlashcards.length);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditQuestion(filteredFlashcards[currentIndex].question);
    setEditAnswer(filteredFlashcards[currentIndex].answer);
  };

  const handleEdit = () => {
    const cardIndex = flashcards.findIndex(
      (card) => card.question === filteredFlashcards[currentIndex].question
    );
    updateFlashcard(cardIndex, {
      question: editQuestion,
      answer: editAnswer,
      category: filteredFlashcards[currentIndex].category,
    });
    setIsEditing(false);
  };

  return (
    <div className="flashcard-list">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="General">General</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        {/* Add more categories as needed */}
      </select>
      {filteredFlashcards.length > 0 ? (
        <>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
              />
              <input
                type="text"
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
              />
              <button onClick={handleEdit}>Save</button>
            </div>
          ) : (
            <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer
                ? filteredFlashcards[currentIndex].answer
                : filteredFlashcards[currentIndex].question}
            </div>
          )}
          {!isEditing && (
            <>
              <button onClick={handleNext}>Next</button>
              <button onClick={startEditing}>Edit</button>
              <button onClick={() => deleteFlashcard(currentIndex)}>Delete</button>
            </>
          )}
        </>
      ) : (
        <p>No flashcards available for this category. Please add some.</p>
      )}
    </div>
  );
};

export default FlashcardList;

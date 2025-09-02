import React, { useState, useEffect } from 'react';
import { getAll as getAllEntries, remove as removeEntry } from '../store/entriesStore';

const JournalEntryModal = ({ entry, onClose, onEdit }) => {
  const [currentEntry, setCurrentEntry] = useState(entry);
  const [allEntries, setAllEntries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const entries = getAllEntries();
    setAllEntries(entries);
    const index = entries.findIndex(e => e.id === entry.id);
    setCurrentIndex(index);
    setCurrentEntry(entry);
  }, [entry]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    if (Math.abs(currentX) > threshold) {
      if (currentX > 0 && currentIndex > 0) {
        goToPrevious();
      } else if (currentX < 0 && currentIndex < allEntries.length - 1) {
        goToNext();
      }
    }
    
    setCurrentX(0);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentEntry(allEntries[newIndex]);
    }
  };

  const goToNext = () => {
    if (currentIndex < allEntries.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentEntry(allEntries[newIndex]);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return (
          <span key={i} className="text-2xl text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        return (
          <span key={i} className="text-2xl text-yellow-400">
            ★
          </span>
        );
      } else {
        return (
          <span key={i} className="text-2xl text-gray-300">
            ★
          </span>
        );
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!currentEntry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        {currentIndex > 0 && (
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-16 h-20 bg-white rounded-lg shadow-lg opacity-60 overflow-hidden">
            <img
              src={allEntries[currentIndex - 1].imageUrl}
              alt="Previous entry"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {currentIndex < allEntries.length - 1 && (
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-16 h-20 bg-white rounded-lg shadow-lg opacity-60 overflow-hidden">
            <img
              src={allEntries[currentIndex + 1].imageUrl}
              alt="Next entry"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div 
          className="bg-white rounded-2xl w-full max-h-[80vh] overflow-hidden relative shadow-2xl"
          style={{
            transform: `translateX(${currentX * 0.1}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <div className="text-lg font-medium text-blue-400">
            my hair diary
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onEdit && onEdit(currentEntry)}
              className="text-white hover:text-gray-300 transition-colors text-sm underline"
            >
              Edit
            </button>
            <button
              onClick={() => { removeEntry(currentEntry.id); onClose && onClose(); }}
              className="text-white hover:text-red-300 transition-colors text-sm underline"
            >
              Delete
            </button>
            <div className="text-sm text-white">
              {currentIndex + 1} of {allEntries.length}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src={currentEntry.imageUrl}
            alt="Journal entry"
            className="w-full h-64 object-cover"
          />
          
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {currentIndex < allEntries.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Date and Categories */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">
              {formatDate(currentEntry.date)}
            </div>
            <div className="flex space-x-2">
              {currentEntry.categories.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {category.length > 3 ? category.substring(0, 3) : category}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex">
              {renderStars(currentEntry.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {currentEntry.rating}/5
            </span>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentEntry.description}
            </p>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            View full Post
          </button>
        </div>

        </div>
      </div>
    </div>
  );
};

export default JournalEntryModal;

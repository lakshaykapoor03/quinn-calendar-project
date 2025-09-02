import React from 'react';

const Header = ({ selectedDate }) => {
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className="bg-black px-4 py-4">
      <div className="flex items-center justify-between">
        <button className="p-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-lg font-medium text-blue-400">
          my hair diary
        </h1>
        
        <div className="text-white text-sm font-medium">
          {formatMonthYear(selectedDate)}
        </div>
      </div>
    </header>
  );
};

export default Header;

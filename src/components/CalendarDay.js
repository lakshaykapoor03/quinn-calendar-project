import React from 'react';

const CalendarDay = ({ day, onDateSelect, onEntryClick, onCreate }) => {
  const handleDateClick = () => {
    if (onDateSelect) {
      onDateSelect(day.date);
    }
    if (onCreate) {
      onCreate({ date: day.date });
    }
  };

  const handleEntryClick = (e, entry) => {
    e.stopPropagation();
    if (onEntryClick) {
      onEntryClick(entry);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return (
          <span key={i} className="text-xs text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        return (
          <span key={i} className="text-xs text-yellow-400">
            ★
          </span>
        );
      } else {
        return (
          <span key={i} className="text-xs text-gray-300">
            ★
          </span>
        );
      }
    });
  };

  const getDayClasses = () => {
    let classes = 'relative min-h-[80px] p-2 border-r border-b border-gray-100 last:border-r-0';
    
    if (!day.isCurrentMonth) {
      classes += ' bg-gray-50';
    }
    
    return classes;
  };

  const getDateClasses = () => {
    let classes = 'text-sm font-medium mb-2';
    
    if (!day.isCurrentMonth) {
      classes += ' text-gray-400';
    } else if (day.isToday) {
      classes += ' text-blue-600 font-bold';
    } else {
      classes += ' text-gray-800';
    }
    
    return classes;
  };

  return (
    <div
      className={getDayClasses()}
      onClick={handleDateClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleDateClick();
        }
      }}
    >
      <div className={getDateClasses()}>
        {day.date.getDate()}
      </div>
      
      {day.entries && day.entries.length > 0 && (
        <div className="space-y-2">
          {day.entries.slice(0, 1).map((entry) => (
            <div
              key={entry.id}
              className="cursor-pointer"
              onClick={(e) => handleEntryClick(e, entry)}
            >
              <div className="relative">
                <img
                  src={entry.imageUrl}
                  alt="Journal entry"
                  className="w-full h-12 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {renderStars(entry.rating)}
                    </div>
                    <div className="flex space-x-1">
                      {entry.categories.slice(0, 2).map((category, index) => (
                        <span key={index} className="text-xs bg-pink-500 bg-opacity-80 px-1 rounded">
                          {category.length > 3 ? category.substring(0, 3) : category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {day.entries.length > 1 && (
            <div className="text-xs text-gray-500 text-center">
              +{day.entries.length - 1} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;

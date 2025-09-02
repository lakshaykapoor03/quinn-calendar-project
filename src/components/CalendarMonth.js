import React from 'react';
import CalendarDay from './CalendarDay';
import { getByDate as getEntriesForDate } from '../store/entriesStore';

const CalendarMonth = ({ monthDate, selectedDate, onDateSelect, onEntryClick, isCurrentMonth, onCreate }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 0);
    const dayDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - startingDayOfWeek + i + 1);
    days.push({
      date: dayDate,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    });
  }

  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const today = new Date();
    const entries = getEntriesForDate(dayDate);
    
    days.push({
      date: dayDate,
      isCurrentMonth: true,
      isToday: dayDate.getDate() === today.getDate() &&
               dayDate.getMonth() === today.getMonth() &&
               dayDate.getFullYear() === today.getFullYear(),
      isSelected: selectedDate &&
                  dayDate.getDate() === selectedDate.getDate() &&
                  dayDate.getMonth() === selectedDate.getMonth() &&
                  dayDate.getFullYear() === selectedDate.getFullYear(),
      entries: entries
    });
  }

  // Add empty cells for days after the last day of the month
  const remainingCells = 42 - days.length; // 6 weeks * 7 days
  for (let i = 1; i <= remainingCells; i++) {
    const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, i);
    days.push({
      date: dayDate,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    });
  }

  return (
    <div className={`transition-all duration-500 ease-in-out ${isCurrentMonth ? 'scale-105' : 'scale-100'}`}>
      <div className="mb-3">
        <h3 className="month-title text-base font-semibold text-blue-600">
          {monthNames[monthDate.getMonth()]} {monthDate.getFullYear()}
        </h3>
      </div>
      
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="text-center text-xs font-medium text-gray-500 py-3 border-r border-gray-100 last:border-r-0"
          >
            {dayName}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <CalendarDay
            key={`${day.date.getTime()}-${index}`}
            day={day}
            onDateSelect={onDateSelect}
            onEntryClick={onEntryClick}
            onCreate={onCreate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;

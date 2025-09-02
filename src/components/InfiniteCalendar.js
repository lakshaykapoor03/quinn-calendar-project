import React, { useState, useEffect, useRef, useCallback } from 'react';
import CalendarMonth from './CalendarMonth';
import NavigationControls from './NavigationControls';

const InfiniteCalendar = ({ selectedDate, onDateSelect, onEntryClick, onMonthChange, onCreate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); 
  const [visibleMonth, setVisibleMonth] = useState(new Date(2025, 7, 1)); 
  const [months, setMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  const monthRefs = useRef({});

  // Generate months around current date
  const generateMonths = useCallback((centerDate, count = 12) => {
    const months = [];
    const startMonth = new Date(centerDate.getFullYear(), centerDate.getMonth() - Math.floor(count / 2), 1);
    
    for (let i = 0; i < count; i++) {
      const monthDate = new Date(startMonth.getFullYear(), startMonth.getMonth() + i, 1);
      months.push({
        id: `${monthDate.getFullYear()}-${monthDate.getMonth()}`,
        date: monthDate,
        key: monthDate.getTime()
      });
    }
    return months;
  }, []);

  const loadPreviousMonths = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    const firstMonth = months[0];
    const newMonths = generateMonths(
      new Date(firstMonth.date.getFullYear(), firstMonth.date.getMonth() - 1, 1),
      6
    );
    
    setTimeout(() => {
      setMonths(prev => [...newMonths, ...prev]);
      setIsLoading(false);
    }, 300);
  }, [months, isLoading, generateMonths]);

  const loadNextMonths = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    const lastMonth = months[months.length - 1];
    const newMonths = generateMonths(
      new Date(lastMonth.date.getFullYear(), lastMonth.date.getMonth() + 1, 1),
      6
    );
    
    setTimeout(() => {
      setMonths(prev => [...prev, ...newMonths]);
      setIsLoading(false);
    }, 300);
  }, [months, isLoading, generateMonths]);

  const handleMonthChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateSelect(today);
  };


  useEffect(() => {
    const initialMonths = generateMonths(currentDate, 24);
    setMonths(initialMonths);
  }, [currentDate, generateMonths]);

  useEffect(() => {
    if (months.length > 0 && scrollContainerRef.current) {
      const currentMonthId = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
      const currentMonthElement = monthRefs.current[currentMonthId];
      
      if (currentMonthElement) {
        setTimeout(() => {
          currentMonthElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [months, currentDate]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            const monthId = entry.target.dataset.monthId;
            const monthIndex = months.findIndex(m => m.id === monthId);
            
            if (monthIndex === 0) {
              loadPreviousMonths();
            } else if (monthIndex === months.length - 1) {
              loadNextMonths();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (months.length > 0) {
      const firstMonth = monthRefs.current[months[0].id];
      const lastMonth = monthRefs.current[months[months.length - 1].id];
      
      if (firstMonth) observerRef.current.observe(firstMonth);
      if (lastMonth) observerRef.current.observe(lastMonth);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [months, isLoading, loadPreviousMonths, loadNextMonths]);

  useEffect(() => {
    if (!scrollContainerRef.current || months.length === 0) return;

    const monthObserver = new IntersectionObserver(
      (entries) => {
        // Find the month with the highest intersection ratio
        let mostVisibleMonth = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleMonth = entry.target.dataset.monthId;
          }
        });

        if (mostVisibleMonth) {
          const monthData = months.find(m => m.id === mostVisibleMonth);
          if (monthData) {
            const newMonth = monthData.date;
            const currentMonth = visibleMonth;
            if (newMonth.getMonth() !== currentMonth.getMonth() || 
                newMonth.getFullYear() !== currentMonth.getFullYear()) {
              setVisibleMonth(newMonth);
              if (onMonthChange) {
                onMonthChange(newMonth);
              }
            }
          }
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    months.forEach(month => {
      const monthElement = monthRefs.current[month.id];
      if (monthElement) {
        monthObserver.observe(monthElement);
      }
    });

    return () => {
      monthObserver.disconnect();
    };
  }, [months, onMonthChange, visibleMonth]);




  return (
    <div className="w-full">
      <NavigationControls
        currentDate={visibleMonth}
        onMonthChange={handleMonthChange}
        onTodayClick={handleTodayClick}
        selectedDate={selectedDate}
      />
      
      <div 
        ref={scrollContainerRef}
        className="scroll-container h-[calc(100vh-200px)] overflow-y-auto px-4 py-4"
        style={{ 
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory'
        }}
      >
        {months.map((month, index) => (
          <div
            key={month.key}
            ref={(el) => {
              if (el) {
                monthRefs.current[month.id] = el;
                el.dataset.monthId = month.id;
              }
            }}
            className="mb-8 last:mb-4 scroll-snap-align-start"
          >
            <CalendarMonth
              monthDate={month.date}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              onEntryClick={onEntryClick}
              onCreate={onCreate}
              isCurrentMonth={month.date.getMonth() === currentDate.getMonth() && 
                             month.date.getFullYear() === currentDate.getFullYear()}
            />
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteCalendar;

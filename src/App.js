import React, { useState } from 'react';
import InfiniteCalendar from './components/InfiniteCalendar';
import Header from './components/Header';
import JournalEntryModal from './components/JournalEntryModal';
import AddEditEntryModal from './components/AddEditEntryModal';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 7, 5)); // August 5, 2025
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 1)); // August 2025
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const openCreate = () => {
    setEditEntry(null);
    setIsEditOpen(true);
  };

  const openEdit = (entry) => {
    setIsModalOpen(false);
    setEditEntry(entry);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setEditEntry(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header selectedDate={currentMonth} />
      <main className="px-4 py-2">
        <div className="bg-white rounded-t-3xl min-h-screen relative">
          <InfiniteCalendar 
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEntryClick={handleEntryClick}
            onMonthChange={handleMonthChange}
            onCreate={(seed) => { setEditEntry(seed || null); setIsEditOpen(true); }}
          />
          
          {/* Floating Action Button */}
          <button onClick={openCreate} className="fixed bottom-20 right-6 bg-blue-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-600 transition-colors z-40">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </main>
      
      {isModalOpen && selectedEntry && (
        <JournalEntryModal
          entry={selectedEntry}
          onClose={handleCloseModal}
          onEdit={openEdit}
        />
      )}

      {isEditOpen && (
        <AddEditEntryModal open={isEditOpen} initial={editEntry} onClose={closeEdit} />
      )}
    </div>
  );
}

export default App;

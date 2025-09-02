// Journal entries data
export const journalEntries = [
  {
    id: 1,
    date: '2025-08-05',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4.8,
    categories: ['Deep Conditioning', 'Moisture', 'Hair Growth', 'Natural Products'],
    description: 'Finally tried the coconut oil deep conditioning treatment. My hair feels incredibly soft and manageable. Noticed significantly less breakage during combing.'
  },
  {
    id: 2,
    date: '2025-08-12',
    imageUrl: 'https://images.pexels.com/photos/33669506/pexels-photo-33669506.jpeg',
    rating: 3.5,
    categories: ['Protein Treatment', 'Hair Repair', 'Salon Visit'],
    description: 'Protein treatment at the salon. Hair feels a bit stiff - might have been too much protein. Need to balance with more moisture next time.'
  },
  {
    id: 3,
    date: '2025-08-20',
    imageUrl: 'https://images.pexels.com/photos/33653029/pexels-photo-33653029.jpeg',
    rating: 4.5,
    categories: ['Protective Style', 'Braids', 'Scalp Care'],
    description: 'Got box braids installed. Used tea tree oil on scalp before installation. Feeling confident about this protective style for the next few weeks.'
  },
  {
    id: 4,
    date: '2025-08-28',
    imageUrl: 'https://images.pexels.com/photos/33659051/pexels-photo-33659051.png',
    rating: 4.2,
    categories: ['Hair Mask', 'DIY Treatment', 'Hydration'],
    description: 'Made a DIY avocado and honey hair mask. Hair feels incredibly nourished. Will definitely repeat this treatment next month.'
  },
  {
    id: 5,
    date: '2025-09-03',
    imageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
    rating: 5.0,
    categories: ['New Product', 'Leave-in Conditioner', 'Curl Definition'],
    description: 'Tried the new curl-defining leave-in conditioner. Amazing results! Perfect curl definition without any crunch. Found my holy grail product!'
  },
  {
    id: 6,
    date: '2025-09-10',
    imageUrl: 'https://images.pexels.com/photos/33699867/pexels-photo-33699867.jpeg',
    rating: 3.8,
    categories: ['Trim', 'Hair Health', 'Split Ends'],
    description: 'Got a much-needed trim today. Removed about an inch of damaged ends. Hair looks healthier but shorter than expected.'
  },
  {
    id: 7,
    date: '2025-09-15',
    imageUrl: 'https://images.pexels.com/photos/33703919/pexels-photo-33703919.jpeg',
    rating: 4.6,
    categories: ['Oil Treatment', 'Scalp Massage', 'Growth'],
    description: 'Weekly scalp massage with rosemary oil blend. Starting to notice new growth at temples. Consistent routine is paying off!'
  },
  {
    id: 8,
    date: '2025-09-20',
    imageUrl: 'https://images.pexels.com/photos/33681810/pexels-photo-33681810.jpeg',
    rating: 4.0,
    categories: ['Wash Day', 'Detangling', 'Deep Clean'],
    description: 'Thorough wash day with clarifying shampoo. Took time to properly section and detangle. Hair feels clean and refreshed.'
  },
  {
    id: 9,
    date: '2025-09-25',
    imageUrl: 'https://images.pexels.com/photos/33711580/pexels-photo-33711580.jpeg',
    rating: 4.7,
    categories: ['Heatless Styling', 'Overnight Routine', 'Waves'],
    description: 'Tried silk rope braid overnight for heatless waves. Woke up to beautiful, bouncy waves. Love this damage-free styling method!'
  },
  {
    id: 10,
    date: '2025-09-30',
    imageUrl: 'https://images.pexels.com/photos/33714711/pexels-photo-33714711.jpeg',
    rating: 4.3,
    categories: ['Color Care', 'Purple Shampoo', 'Toning'],
    description: 'Used purple shampoo to tone highlights. Color looks refreshed and brassy tones are gone. Need to remember not to leave it on too long next time.'
  }
];

// Helper function to get entries for a specific date
export const getEntriesForDate = (date) => {
  const dateString = date.toISOString().split('T')[0];
  return journalEntries.filter(entry => entry.date === dateString);
};

// Helper function to get all entries sorted by date
export const getAllEntries = () => {
  return journalEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
};

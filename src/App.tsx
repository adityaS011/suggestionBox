import React from 'react';
import SuggestionBox from './components/SuggestionBox';

const suggestions = [
  { name: 'Toyota', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/Toyota-Symbol.png' },
  { name: 'Honda', logoUrl: 'https://logos-world.net/wp-content/uploads/2021/03/Honda-Emblem.png' },
  { name: 'BMW', logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png' },
];

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SuggestionBox suggestions={suggestions} />
    </div>
  );
};

export default App;

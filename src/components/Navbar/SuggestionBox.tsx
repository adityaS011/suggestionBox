import React, { useState, useEffect, useRef } from 'react';

interface Suggestion {
  name: string;
  logoUrl: string;
}

interface SuggestionBoxProps {
  suggestions: Suggestion[];
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ suggestions }) => {
  const [filtered, setFiltered] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      setFiltered(suggestions);
    }
  }, [active, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputText(inputValue);
    const filtered = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFiltered(filtered);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setInputText(suggestion.name);
    setFiltered([]);
    setActive(true);
  };

  const handleInputClick = () => {
    setInputText(selectedSuggestion?.name || '');
    setActive(false);
  };

  const handleClearButtonClick = () => {
    setInputText('');
    setFiltered([]);
    setActive(false);
    setSelectedSuggestion(null);
  };

  const renderInputText = () => {
    if (active && selectedSuggestion) {
      return (
        <div
          onClick={handleInputClick}
          className="flex items-center text-slate-800 pl-6 bg-white mx-12 md:mx-6 p-1 rounded-md md:w-96 w-56 cursor-pointer"
        >
          <img src={selectedSuggestion.logoUrl} alt={selectedSuggestion.name} className="w-12 h-6 mr-2" />
          <span className="text-xl font-semibold">{selectedSuggestion.name.toUpperCase()}</span>
          
        </div>
      );
    } else {
      return (
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onClick={handleInputClick}
            placeholder="Type here..."
            className="border-2 w-56 text-slate-800 pl-6 text-lg md:w-96 mt-0 border-slate-400 p-1 rounded-md focus:outline-none"
          />
          {inputText && (
            <button onClick={handleClearButtonClick} className="absolute top-0 right-0 mt-2 mr-2 p-2 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 pb-2 w-10 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div ref={suggestionBoxRef}>
      {renderInputText()}
      {filtered.length > 0 && (
        <div className="mt-3 bg-slate-300">
          {filtered.map(suggestion => (
            <div
              key={suggestion.name}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex text-black items-center cursor-pointer p-2 hover:bg-red-100 ${
                active && selectedSuggestion?.name === suggestion.name ? 'active' : ''
              }`}
            >
              <img src={suggestion.logoUrl} alt={suggestion.name} className="w-12  h-6 mr-2" />
              <span>{suggestion.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionBox;

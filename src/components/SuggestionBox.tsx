import React, { useState, useEffect } from 'react';

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
  const [active, setActive] = useState<boolean>(false); 

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

  const renderInputText = () => {
    if (active && selectedSuggestion) {
      return (
        <div onClick={handleInputClick} className="flex items-center border-2 border-slate-400 px-6 py-2 mx-6 w-72 cursor-pointer">
          <img src={selectedSuggestion.logoUrl} alt={selectedSuggestion.name} className="w-12 h-6 mr-2" />
          <span>{selectedSuggestion.name}</span>
        </div>
      );
    } else {
      return (
        <input
          type="text"
          value={inputText} // Display the selected suggestion's name initially
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Type here..."
          className="border-2 w-72 border-slate-400 p-2 rounded-md focus:outline-none"
        />
      );
    }
  };

  return (
    <div>
      {renderInputText()}
      {filtered.length > 0 && (
        <div className="mt-2">
          {filtered.map(suggestion => (
            <div
              key={suggestion.name}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex items-center cursor-pointer p-2 hover:bg-gray-100 ${active && selectedSuggestion?.name === suggestion.name ? 'active' : ''}`}
            >
              <img src={suggestion.logoUrl} alt={suggestion.name} className="w-12 h-6 mr-2" />
              <span>{suggestion.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionBox;

import React from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        className="p-2 border rounded-lg w-full"
        placeholder="Search articles..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

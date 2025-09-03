import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Pesquisar..."}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FaSearch />
        <span>Buscar</span>
      </button>
    </form>
  );
};

export default SearchBar;
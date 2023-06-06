"use client"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
 
// import SearchIcon from '@mui/icons-material/Search';

import React, { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
 

const SearchBar = ({
  className,
  width,
  height,
  onSearch,
  placeholder = 'Search',
  clearOnSearch = true,
  sendOnEnter = true,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
    console.log(sendOnEnter)
    if ( sendOnEnter) {
      //onSearch(e.target.value);
      onSearch(searchText)
    }
  };

  const handleClick = () => {
    setSearchText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (sendOnEnter) {
        onSearch(searchText);
        if (clearOnSearch) {
          setSearchText('');
        }
      }
    }
  };

  const handleSearch = () => {
    if (searchText !== '' && !sendOnEnter) {
      onSearch(searchText);
      if (clearOnSearch) {
        setSearchText('');
      }
    }
  };

  const inputStyle = {
    width: width || '100%',
    height: height || 'auto',
  };

  return (
    <div className={`searchBar ${className}`}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleChange}
        onKeyDown={handleKeyDown}
        className="borderless"
        style={inputStyle}
        placeholder={placeholder}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
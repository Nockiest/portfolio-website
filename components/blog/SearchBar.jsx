"use client"
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
 
// import SearchIcon from '@mui/icons-material/Search';

import React, { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
export default function SearchBar({ className, width,  height }) {
  const [searchText, setSearchText] = useState('Search');
  library.add(faSearch);
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = () => {
    if (searchText === 'Search') {
      setSearchText(''); // Clear the input field if it is already empty
    }
  };

  const handleBlur = () => {
     
    if (searchText == '') {
      setSearchText('Search'); // Set the input field value back to "Search" if it is empty on blur
    }
  };

  const inputStyle = {
    width: width || '100%', // Use the prop value if defined, otherwise default to '100%'
    height: height || 'auto', // Use the prop value if defined, otherwise default to 'auto'
  };

  return (
    <div className="searchBar">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        className="borderless"
        style={inputStyle}
      />
    </div>
  );

}
   
import React from 'react'
import SearchBar from './SearchBar'
// import "@styles/globals.css" 
import { useState } from 'react';

export default function TagBar({ selectedTags, handleTagSelection, className }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      handleTagSelection(inputValue.trim());
      setInputValue('');
    }
  };

  const handleTagClick = (tag) => {
    handleTagSelection(tag);
  };

  
  const handleSearch = (searchText) => {
    // Implement the logic to handle the search in the parent component
    // For example, you can update the state or trigger an API request
        if ( searchText.trim() !== '') {
         handleTagSelection(searchText.trim());
     
        }
  };

  return (
    <div className={`tagBar ${className}`}>
      <div className="tagBar-upper">

        <h3>Tags</h3>
        <SearchBar className="custom-search-bar" 
        onSearch={handleSearch} placeholder="Add tags"
        sendOnEnter={false} />
        
      </div>
      <div className="tag-list">
        {selectedTags.map((tag, index) => (
          <p key={index} className="tag" onClick={() => handleTagClick(tag)}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}  
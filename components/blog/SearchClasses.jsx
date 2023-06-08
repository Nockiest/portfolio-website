import React from 'react'
// import styles from './searchClasses.module.scss';

const SearchClasses = ({ handleCategorySelection, selectedCategory }) => {
  return (
    <div className="searchclassescontainer">
      <button
        className={`btn searchbt ${selectedCategory === 'ChatGPT' ? 'selectedButton' : ''}`}
        onClick={() => handleCategorySelection('ChatGPT')}
      >
        ChatGPT
      </button>
      <button
        className={`btn searchbt ${selectedCategory === 'Coding' ? 'selectedButton' : ''}`}
        onClick={() => handleCategorySelection('Coding')}
      >
        Coding
      </button>
      <button
        className={`btn searchbt ${selectedCategory === 'News' ? 'selectedButton' : ''}`}
        onClick={() => handleCategorySelection('News')}
      >
        News
      </button>
    </div>
  );
};
 
 

export default SearchClasses 
import React from 'react'
// import styles from './searchClasses.module.scss';

const SearchClasses = ({ className }) => {
  return (
    <div className="searchclassescontainer">
      <button className="searchbt">ChatGPT</button>
      <button className="searchbt">Coding</button>
      <button className="searchbt">News</button>
    </div>
  );
};
 
// function SearchClasses({ className }) {
//     const searchClassesContainer = className.searchClassesContainer;
//     const button = className.button;
//     console.log(styles)
//     return (
//       <div className={searchClassesContainer}>
//         <button className={button}>ChatGPT</button>
//         <button className={button}>Coding</button>
//         <button className={button}>News</button>
//       </div>
//     );
//   }

export default SearchClasses 
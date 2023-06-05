import React from 'react';
 

const NextArticlesRow = () => {
  const rectangles = [
    { id: 1, color: 'red', text: 'Rectangle 1' },
    { id: 2, color: 'green', text: 'Rectangle 2' },
    { id: 3, color: 'blue', text: 'Rectangle 3' },
    { id: 4, color: 'yellow', text: 'Rectangle 4' },
  ];

  return (
    <div className="next-articles-gridContainer">
      {rectangles.map((rectangle) => (
        <div key={rectangle.id} className="next-articles-rectangle" style={{ backgroundColor: rectangle.color }}>
          <span className="next-articles-text">{rectangle.text}</span>
        </div>
      ))}
    </div>
  );
};
export default NextArticlesRow;

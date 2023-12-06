// CategoryButtons.js
import React from 'react';

const CategoryButtons = ({ onSelectCategory }) => {
  const categories = ['Artist', 'Dancer', 'Musician', 'My Applications'];

  return (
    <div className="category-buttons">
      {categories.map(category => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;

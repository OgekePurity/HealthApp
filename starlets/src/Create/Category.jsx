import React, { useState } from 'react';
import "./Create.css"

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  /* const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected category: ${selectedCategory}`);
  };
 */
  return (
      <fieldset className='category'>
        <legend>Select a category</legend>

        <label>
          <input
            type="radio"
            value="healthy-eating"
            checked={selectedCategory === 'healthy-eating'}
            onChange={handleChange}
          />
          Healthy Eating
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="Physical-health"
            checked={selectedCategory === 'Physical-health'}
            onChange={handleChange}
          />
          Physical Health
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="Mental-health"
            checked={selectedCategory === 'Mental-health'}
            onChange={handleChange}
          />
          Mental Health
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="Healthy-habits"
            checked={selectedCategory === 'Healthy-habits'}
            onChange={handleChange}
          />
          Healthy Habits
        </label>
        <br />
      </fieldset>
    
  );
};



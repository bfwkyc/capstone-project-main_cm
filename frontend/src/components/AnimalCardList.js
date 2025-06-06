import React from 'react';
import { useNavigate } from 'react-router-dom';

function AnimalCardList({ animals }) {
  const navigate = useNavigate();

  if (!Array.isArray(animals)) return null;

  return (
    <div className="animal-list">
      {animals.map((animal) => (
        <div
          className="animal-card"
          key={animal.id}
          onClick={() => navigate(`/animal/${animal.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={animal.image} alt="animal" className="animal-image" />
          <div className="animal-info">
            <h4 className="animal-breed">{animal.breed}</h4>
            <p className="animal-details">{animal.details}</p>
            <p className="animal-date">📅 {animal.date}</p>
            <p className="animal-location">📍 {animal.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnimalCardList;

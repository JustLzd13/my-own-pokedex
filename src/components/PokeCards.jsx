import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const PokeCards = ({ id, name, image, types }) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const paddedId = `#${String(id).padStart(3, '0')}`;

  return (
    <Link to={`/pokedetails/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        className="mb-4 shadow-sm"
        style={{ width: '18rem', backgroundColor: '#fff5f5', borderColor: '#f5c2c2', cursor: 'pointer' }}  // Reverted width
      >
        <Card.Img variant="top" src={image} alt={name} style={{ backgroundColor: '#fff0f0' }} />
        <Card.Body className="text-center">
          <Card.Title style={{ color: '#c1121f', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {formattedName} <span style={{ fontSize: '0.9rem', color: '#999' }}>{paddedId}</span>
          </Card.Title>
          <div>
            {types.map((type, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: '#f9dede',
                  color: '#a30000',
                  padding: '0.25rem 0.5rem',
                  margin: '0 0.25rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PokeCards;

import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PokeCards from '../components/PokeCards';

const DreamTeam = () => {
  const [dreamTeam, setDreamTeam] = useState([]);

  useEffect(() => {
    const storedDreamTeam = JSON.parse(localStorage.getItem('dreamTeam')) || [];
    setDreamTeam(storedDreamTeam);
  }, []);

  const handleRemoveFromDreamTeam = (id) => {
    const updatedDreamTeam = dreamTeam.filter(pokemon => pokemon.id !== id);
    localStorage.setItem('dreamTeam', JSON.stringify(updatedDreamTeam));
    setDreamTeam(updatedDreamTeam);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center text-danger">My Dream Team</h2>
      <Row>
        {dreamTeam.length > 0 ? (
          dreamTeam.map(pokemon => (
            <Col key={pokemon.id} md={4} className="d-flex justify-content-center mb-4">
              <div style={{ position: 'relative' }}>
                <PokeCards 
                  id={pokemon.id}
                  name={pokemon.name}
                  image={
                    pokemon.sprites?.other?.['official-artwork']?.front_default ||
                    pokemon.sprites?.front_default
                  }
                  types={pokemon.types.map(t => t.type.name)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: '1'
                  }}
                  onClick={() => handleRemoveFromDreamTeam(pokemon.id)}
                >
                  Remove
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center">Your Dream Team is empty. Add some Pokémon!</div>
        )}
      </Row>

      {dreamTeam.length >= 6 && (
        <div className="text-center text-danger">
          Your Dream Team is full (maximum of 6 Pokémon).
        </div>
      )}
    </Container>
  );
};

export default DreamTeam;

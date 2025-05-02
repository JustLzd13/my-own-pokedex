import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import PokeCard from '../components/PokeCards';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isValid = storedFavorites.every(p => p.id && p.name && p.sprites);
    if (isValid) {
      setFavorites(storedFavorites);
    } else {
      localStorage.removeItem('favorites');
      setFavorites([]);
      console.warn('Invalid data found in localStorage. Favorites cleared.');
    }
  }, []);

  const handleRemoveFromFavorites = (pokemonId) => {
    const updatedFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    Swal.fire({
      title: 'Removed from Favorites',
      text: 'The Pokémon has been removed from your favorites.',
      icon: 'success',
      confirmButtonColor: '#c1121f',
    });
  };

  return (
    <Container className="py-4">
      <h2 className="text-center text-danger fw-bold mb-4">Your Favorite Pokémon</h2>
      <Row>
        {favorites.length > 0 ? (
          favorites.map(pokemon => (
            <Col key={pokemon.id} md={4} className="d-flex justify-content-center mb-4">
              <div style={{ position: 'relative' }}>
                <PokeCard
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
                  onClick={() => handleRemoveFromFavorites(pokemon.id)}
                >
                  Remove
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center text-muted fs-5 w-100">
            You have no favorite Pokémon yet!
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../services/pokeapi';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';

const PokeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(data);
    };
    fetchData();
  }, [id]);

  const handleAddToDreamTeam = () => {
    const storedDreamTeam = JSON.parse(localStorage.getItem('dreamTeam')) || [];
    
    if (storedDreamTeam.length >= 6) {
      Swal.fire({
        title: 'Dream Team Full!',
        text: 'Your Dream Team is already full (maximum of 6 Pokémon).',
        icon: 'warning',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#c1121f',
      });
      return;
    }

    const isAlreadyInDreamTeam = storedDreamTeam.some(p => p.id === pokemon.id);

    if (!isAlreadyInDreamTeam) {
      storedDreamTeam.push(pokemon);
      localStorage.setItem('dreamTeam', JSON.stringify(storedDreamTeam));
      Swal.fire({
        title: 'Added to Dream Team!',
        text: `${pokemon.name} has been added to your Dream Team!`,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Already in Dream Team!',
        text: `${pokemon.name} is already in your Dream Team.`,
        icon: 'info',
      });
    }
  };

  const handleAddToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyInFavorites = storedFavorites.some(p => p.id === pokemon.id);

    if (!isAlreadyInFavorites) {
      storedFavorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      Swal.fire({
        title: 'Added to Favorites!',
        text: `${pokemon.name} has been added to your favorites!`,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Already in Favorites!',
        text: `${pokemon.name} is already in your favorites.`,
        icon: 'info',
      });
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <Container className="py-4 d-flex justify-content-center mt-5 mb-5">
      <Card style={{ width: '100%', maxWidth: '960px', backgroundColor: '#fff3f3', borderColor: '#c1121f' }}>
        <Card.Body>
          <Row>
            <Col md={5} className="d-flex align-items-center justify-content-center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="img-fluid"
                style={{ maxHeight: '300px' }}
              />
            </Col>

            <Col md={7}>
              <Card.Title className="fs-2 fw-bold text-danger">
                {pokemon.name.toUpperCase()} <span className="text-muted">#{pokemon.id}</span>
              </Card.Title>

              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item><strong>Types:</strong> {pokemon.types.map(t => (
                  <Badge key={t.type.name} bg="danger" className="me-1">{t.type.name}</Badge>
                ))}</ListGroup.Item>
                <ListGroup.Item><strong>Height:</strong> {pokemon.height}</ListGroup.Item>
                <ListGroup.Item><strong>Weight:</strong> {pokemon.weight}</ListGroup.Item>
                <ListGroup.Item><strong>Base Experience:</strong> {pokemon.base_experience}</ListGroup.Item>
                <ListGroup.Item>
                  <strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Stats:</strong>
                  <ul className="mb-0">
                    {pokemon.stats.map(s => (
                      <li key={s.stat.name}>
                        {s.stat.name}: {s.base_stat}
                      </li>
                    ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Moves (sample):</strong> {pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}
                </ListGroup.Item>
              </ListGroup>

              <div className="d-flex flex-wrap justify-content-between">
                <Button variant="secondary" onClick={() => navigate('/')}>← Go Back</Button>
                <Button variant="primary" onClick={handleAddToDreamTeam}>⭐ Add to Dream Team</Button>
                <Button variant="warning" onClick={handleAddToFavorites}>❤️ Add to Favorites</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PokeDetails;

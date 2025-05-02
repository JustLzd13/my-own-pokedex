import React, { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCards';
import { getAllPokemon, getPokemonDetails } from '../services/pokeAPI';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = ({ searchQuery }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(25);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const all = await getAllPokemon(1025);
      const detailed = await Promise.all(all.map(p => getPokemonDetails(p.url)));

      const formatted = detailed.map(p => ({
        id: p.id,
        name: p.name,
        image:
          p.sprites?.other?.['official-artwork']?.front_default ||
          p.sprites?.front_default,
        types: p.types.map(t => t.type.name),
      }));

      setPokemons(formatted);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: '#ffeaea', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container>
        <h2 className="text-center mb-4" style={{ color: '#c1121f', fontWeight: 'bold' }}>Pokédex</h2>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Loading..."
              style={{
                width: '80px',
                height: '80px',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        ) : (
          <>
            {filteredPokemons.length === 0 ? (
              <p className="text-center text-muted">No Pokémon found for "{searchQuery}"</p>
            ) : (
              <>
                <Row className="justify-content-center">
                  {currentPokemons.map((pokemon, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                      <PokeCard {...pokemon} />
                    </Col>
                  ))}
                </Row>

                <div className="d-flex justify-content-center mt-4 pb-5">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline-danger btn-sm me-2"
                  >
                    Prev
                  </button>

                  {currentPage > 2 && (
                    <button onClick={() => paginate(1)} className="btn btn-outline-danger btn-sm me-2">
                      1
                    </button>
                  )}
                  {currentPage > 3 && <span className="btn btn-sm disabled me-2">...</span>}

                  {currentPage - 1 > 0 && (
                    <button onClick={() => paginate(currentPage - 1)} className="btn btn-outline-danger btn-sm me-2">
                      {currentPage - 1}
                    </button>
                  )}

                  <button className="btn btn-danger btn-sm me-2" disabled>
                    {currentPage}
                  </button>

                  {currentPage + 1 <= totalPages && (
                    <button onClick={() => paginate(currentPage + 1)} className="btn btn-outline-danger btn-sm me-2">
                      {currentPage + 1}
                    </button>
                  )}

                  {currentPage < totalPages - 2 && <span className="btn btn-sm disabled me-2">...</span>}

                  {currentPage < totalPages - 1 && (
                    <button onClick={() => paginate(totalPages)} className="btn btn-outline-danger btn-sm me-2">
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-danger btn-sm ms-2 pb-2"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </Container>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;

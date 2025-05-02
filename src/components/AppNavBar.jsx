import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom'; // Import useLocation

function AppNavBar({ setSearchQuery }) {
  const [input, setInput] = useState('');
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchQuery(input.toLowerCase());
    }, 300); // Debounce input by 300ms

    return () => clearTimeout(delayDebounce);
  }, [input, setSearchQuery]);

  return (
    <Navbar expand="lg" className="bg-danger">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48265441-add4-48b6-99ce-fb71117c63bb/dj2t3xx-a8a93b48-a33a-4882-8fc7-632ab911bcba.png/v1/fill/w_856,h_934/pikachu_png_by_zelrom_dj2t3xx-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU3MiIsInBhdGgiOiJcL2ZcLzQ4MjY1NDQxLWFkZDQtNDhiNi05OWNlLWZiNzExMTdjNjNiYlwvZGoydDN4eC1hOGE5M2I0OC1hMzNhLTQ4ODItOGZjNy02MzJhYjkxMWJjYmEucG5nIiwid2lkdGgiOiI8PTE0NDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._BoRdHa_wBWN3-gdMwyYFXPxFpWVb8Y4O8B26ovaxF8"
            alt="Pikachu"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="text-white fw-bold">My Own Pokedex</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dream-team" className="text-white">My Dream Team</Nav.Link>
            <Nav.Link href="/favorites" className="text-white">Favorites</Nav.Link>
          </Nav>

          {/* Conditionally render the search form only on the Home page ("/") */}
          {location.pathname === '/' && (
            <Form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                    alt="Pokeball"
                    width="20"
                    height="20"
                  />
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search Pokémon"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button variant="dark" onClick={() => setInput('')}>Clear</Button>
              </InputGroup>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;

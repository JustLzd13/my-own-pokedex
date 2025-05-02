import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import DreamTeam from './pages/DreamTeam';
import PokeDetails from './pages/PokeDetails';
import Footer from './components/Footer';
import './App.css'; // make sure this file exists

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app-container">
        <AppNavBar setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/dream-team" element={<DreamTeam />} />
            <Route path="/pokedetails/:id" element={<PokeDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

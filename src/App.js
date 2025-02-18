import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BadgeForm from './components/BadgeForm';
import Badge from './components/Badge';
import BadgeEditForm from './components/BadgeEditForm';
import axios from 'axios';

function App() {
  const [badgeData, setBadgeData] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Estado para alternar entre tema claro e escuro

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/badges');
        setBadgeData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar crachás:', err);
        setError('Erro ao carregar os crachás');
        setLoading(false);
      }
    };
    fetchBadges();
  }, []);

  const handleDeleteBadge = (id) => {
    setBadgeData(badgeData.filter(badge => badge.id !== id));
  };

  const handleCreateBadge = (newBadge) => {
    setBadgeData([...badgeData, newBadge]);  
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Alterna entre os modos
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/badges" className="navbar-link">Crachás</Link>
            </li>
          </ul>
        </nav>

        <button onClick={toggleDarkMode} className="theme-toggle-btn">
        <i className="fas fa-sun sun-icon"></i>
        <i className="fas fa-moon moon-icon"></i>
        </button>



        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1 className="home-title">Gerador de Crachás</h1>
                <BadgeForm onCreateBadge={handleCreateBadge} />
              </div>
            } 
          />
          <Route 
            path="/badges" 
            element={
              <div className="badge-list-container">
                <h2 className="badge-list-title">Lista de Crachás</h2>
                {loading ? <p className="loading">Carregando...</p> : error ? <p className="error">{error}</p> : (
                  <div className="badge-list">
                    {badgeData.map(badge => (
                      <Badge key={badge.id} badgeData={badge} onDeleteBadge={handleDeleteBadge} />
                    ))}
                  </div>
                )}
              </div>
            } 
          />
          <Route 
            path="/badges/edit/:id" 
            element={<BadgeEditForm onEditBadge={setBadgeData} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BadgeForm from './components/BadgeForm';
import Badge from './components/Badge';
import BadgeEditForm from './components/BadgeEditForm';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [badgeData, setBadgeData] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);

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

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Gerador de Crachás</Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/badges" className="nav-link">Crachás</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              <div className="container mt-4">
                <h1 className="text-center">Gerador de Crachás</h1>
                <BadgeForm onCreateBadge={handleCreateBadge} />
              </div>
            } 
          />
          {/* Badges List Route */}
          <Route 
            path="/badges" 
            element={
              <div className="container mt-4">
                <h2 className="text-center">Lista de Crachás</h2>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                  </div>
                ) : error ? (
                  <p className="text-danger text-center">{error}</p>
                ) : (
                  <div className="list-group">
                    {badgeData.map(badge => (
                      <Badge key={badge.id} badgeData={badge} onDeleteBadge={handleDeleteBadge} />
                    ))}
                  </div>
                )}
              </div>
            } 
          />
          {/* Edit Badge Route */}
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

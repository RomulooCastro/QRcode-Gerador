import React, { useState } from 'react';
import axios from 'axios';

function BadgeForm({ onCreateBadge }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/badges', formData);
      onCreateBadge(response.data);
      setSuccessMessage('Crachá criado com sucesso!');
      setFormData({ firstName: '', lastName: '', email: '', position: '', department: '' });
    } catch (error) {
      console.error('Erro ao criar crachá', error);
    }
  };

  return (
    <div className="badge-form-container container my-4">
      {successMessage && <p className="alert alert-success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="badge-form">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Nome:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Sobrenome:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Cargo:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Setor:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Criar Crachá</button>
      </form>
    </div>
  );
}

export default BadgeForm;

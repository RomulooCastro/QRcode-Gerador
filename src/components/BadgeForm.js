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
    <div className="badge-form-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="badge-form">
        <label>Nome:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        
        <label>Sobrenome:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        
        <label>Cargo:</label>
        <input type="text" name="position" value={formData.position} onChange={handleChange} required />
        
        <label>Setor:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        
        <button type="submit" className="submit-btn">Criar Crachá</button>
      </form>
    </div>
  );
}


export default BadgeForm;

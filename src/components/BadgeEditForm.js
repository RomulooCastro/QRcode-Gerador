import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BadgeEditForm({ onEditBadge }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: ''
    });
  
    useEffect(() => {
      const fetchBadge = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/badges/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Erro ao buscar crachá para edição', error);
        }
      };
  
      fetchBadge();
    }, [id]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/api/badges/${id}`, formData);
        onEditBadge();
        navigate('/badges');
      } catch (error) {
        console.error('Erro ao editar crachá', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="badge-edit-form">
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
        
        <button type="submit" className="submit-btn">Salvar Alterações</button>
      </form>
    );
  }
  

export default BadgeEditForm;

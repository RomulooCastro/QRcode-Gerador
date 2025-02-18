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
      <div className="container mt-5">
        <h2 className="text-center mb-4">Editar Crachá</h2>
        <form onSubmit={handleSubmit} className="badge-edit-form">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Nome</label>
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
            <label htmlFor="lastName" className="form-label">Sobrenome</label>
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
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="position" className="form-label">Cargo</label>
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
            <label htmlFor="department" className="form-label">Setor</label>
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
          
          <button type="submit" className="btn btn-primary w-100">Salvar Alterações</button>
        </form>
      </div>
    );
}

export default BadgeEditForm;

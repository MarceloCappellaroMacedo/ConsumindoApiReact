import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    perfilInstagram: '',
    senha: '',
    confirmSenha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.name || !formData.email || !formData.perfilInstagram || !formData.senha) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.senha !== formData.confirmSenha) {
      setError('As senhas não coincidem');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Dados para API
      const userData = {
        name: formData.name,
        email: formData.email,
        perfilInstagram: formData.perfilInstagram,
        senha: formData.senha
      };
      
      // Registrar usuário
      await register(userData);
      
      // Login automático após registro
      await login(userData.email, userData.senha);
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Cadastro de Influenciador</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Seu email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="perfilInstagram">Perfil do Instagram</label>
            <input
              type="text"
              id="perfilInstagram"
              name="perfilInstagram"
              value={formData.perfilInstagram}
              onChange={handleChange}
              placeholder="@seuperfil"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Crie uma senha"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmSenha">Confirme a Senha</label>
            <input
              type="password"
              id="confirmSenha"
              name="confirmSenha"
              value={formData.confirmSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
        <div className="auth-footer">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
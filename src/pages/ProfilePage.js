import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiWithErrorHandling } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

const ProfilePage = () => {
  const { id } = useParams();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    perfilInstagram: '',
    senha: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const data = await apiWithErrorHandling.influencer.getById(id);
        setInfluencer(data);
        setFormData({
          name: data.name,
          email: data.email,
          perfilInstagram: data.perfilInstagram,
          senha: '' // Não exibimos a senha por segurança
        });
        setLoading(false);
      } catch (err) {
        // Se for erro 401 (não autorizado), fazer logout
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/login?redirect=' + encodeURIComponent(`/influencer/${id}`));
        } else {
          setError('Erro ao carregar dados do perfil');
          setLoading(false);
        }
      }
    };

    fetchInfluencer();
  }, [id, logout, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);

    // Só enviar campos não vazios
    const updateData = {};
    if (formData.name) updateData.name = formData.name;
    if (formData.email) updateData.email = formData.email;
    if (formData.perfilInstagram) updateData.perfilInstagram = formData.perfilInstagram;
    if (formData.senha) updateData.senha = formData.senha;

    try {
      await apiWithErrorHandling.influencer.update(id, updateData);
      
      // Atualiza dados do influenciador
      const updatedInfluencer = await apiWithErrorHandling.influencer.getById(id);
      setInfluencer(updatedInfluencer);
      
      setUpdateSuccess(true);
      setIsEditing(false);
      
      // Esconde a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  // Voltar para a edição de perfil
  const handleBackToEdit = () => {
    setError('');
    setIsEditing(true);
  };

  // Verificar se o perfil pertence ao usuário logado
  const isOwnProfile = currentUser && currentUser.id.toString() === id;

  if (loading) return <div className="loading-container">Carregando perfil...</div>;

  return (
    <div className="profile-page">
      <header className="header">
        <div className="container header-content">
          <h1 className="logo" onClick={() => navigate('/')}>AgencyInflu</h1>
          <div className="nav-actions">
            <button className="btn btn-back" onClick={() => navigate('/')}>
              Voltar
            </button>
            {currentUser && (
              <button className="btn btn-logout" onClick={logout}>
                Sair
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          {error && <div className="error-message">{error}</div>}
          {updateSuccess && <div className="success-message">Perfil atualizado com sucesso!</div>}

          {!isEditing ? (
            <div className="profile-view">
              <div className="profile-header">
                <div className="profile-avatar">{influencer?.name?.charAt(0)}</div>
                <h2>{influencer?.name}</h2>
                <p className="instagram-handle">{influencer?.perfilInstagram}</p>
              </div>
              
              <div className="profile-details">
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{influencer?.email}</span>
                </div>
                <div className="detail-item">
                  <label>Data de cadastro:</label>
                  <span>{new Date(influencer?.dataCadastro).toLocaleDateString()}</span>
                </div>
              </div>
              
              {isOwnProfile && (
                <div className="profile-actions">
                  <button 
                    className="btn btn-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar Perfil
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="profile-edit">
              <h2>Editar Perfil</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="perfilInstagram">Perfil Instagram</label>
                  <input
                    type="text"
                    id="perfilInstagram"
                    name="perfilInstagram"
                    value={formData.perfilInstagram}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="senha">Nova Senha (deixe em branco para manter a atual)</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-cancel" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-save">
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
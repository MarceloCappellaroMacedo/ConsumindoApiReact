import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll } from '../services/api';
import InfluencerCard from '../components/search/InfluencerCard';
import { useAuth } from '../context/AuthContext';
import '../styles/influencers.css';

const InfluencersPage = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const data = await getAll();
        console.log("Dados da API:", data);
        
        // Adaptar os dados da API para o formato esperado pelo InfluencerCard
        const adaptedData = data.map(influencer => ({
          id: influencer.id,
          name: influencer.nome,
          niche: "Criador de conteúdo", // Valor padrão
          profileImg: `https://ui-avatars.com/api/?name=${encodeURIComponent(influencer.nome)}&background=random`,
          followers: 1000, // Valor padrão
          platforms: {
            instagram: influencer.perfilInstagram,
            tiktok: null,
            youtube: null,
            twitter: null
          },
          avgRate: 100, // Valor padrão
          rating: 4.5, // Valor padrão
          reliability: 95 // Valor padrão
        }));
        
        setInfluencers(adaptedData);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar influenciadores:", err);
        setError("Falha ao carregar influenciadores");
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  return (
    <div className="home-page">
      {/* Header - igual ao da HomePage */}
      <header className="header">
        <div className="container header-content">
          <h1 className="logo" onClick={() => navigate('/')}>AgencyInflu</h1>
          <div className="nav-menu">
            <a onClick={() => navigate('/#about')} className="nav-link">Sobre</a>
            <a onClick={() => navigate('/#how-it-works')} className="nav-link">Como Funciona</a>
            <a className="nav-link" onClick={() => navigate('/influencers')}>Influenciadores</a>
          </div>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <span className="welcome-message">Olá, {currentUser.name}</span>
                <button 
                  className="btn btn-profile" 
                  onClick={() => navigate(`/influencer/${currentUser.id}`)}
                >
                  Meu Perfil
                </button>
                <button className="btn btn-logout" onClick={logout}>Sair</button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-login" 
                  onClick={() => navigate('/login')}
                >
                  Entrar
                </button>
                <button 
                  className="btn btn-register" 
                  onClick={() => navigate('/register')}
                >
                  Cadastre-se
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo da página de influencers */}
      <div className="influencers-page">
        <div className="container influencers-container">
          <div className="influencers-header">
            <h1>Influenciadores</h1>
            <p>Encontre os melhores influenciadores para sua campanha</p>
          </div>

          <div className="search-filter-container">
            <div className="search-box">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar influenciador..." 
              />
            </div>
            <div className="filter-options">
              <select className="sort-select">
                <option value="">Ordenar por</option>
                <option value="followers">Seguidores</option>
                <option value="rating">Avaliação</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">Carregando influenciadores...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="influencers-grid">
              {influencers.length === 0 ? (
                <p className="no-results">Nenhum influenciador encontrado</p>
              ) : (
                influencers.map(influencer => (
                  <InfluencerCard key={influencer.id} influencer={influencer} />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer - igual ao da HomePage */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2 className="logo">AgencyInflu</h2>
              <p>Conectando marcas e criadores de conteúdo</p>
            </div>
            <div className="footer-links">
              <h3>Links Rápidos</h3>
              <ul>
                <li><a onClick={() => navigate('/#about')}>Sobre</a></li>
                <li><a onClick={() => navigate('/#how-it-works')}>Como Funciona</a></li>
                <li><a onClick={() => navigate('/influencers')}>Influenciadores</a></li>
                <li><a onClick={() => navigate('/register')}>Cadastre-se</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contato</h3>
              <p>contato@agencyinflu.com</p>
              <p>+55 (11) 99999-9999</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} AgencyInflu. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InfluencersPage;
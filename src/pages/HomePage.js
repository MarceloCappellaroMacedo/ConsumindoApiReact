import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/home.css';
import { FaSearch, FaUsers, FaChartLine } from 'react-icons/fa';

const HomePage = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="container header-content">
          <h1 className="logo" onClick={() => navigate('/')}>AgencyInflu</h1>
          <div className="nav-menu">
            <a href="#about" className="nav-link">Sobre</a>
            <a href="#how-it-works" className="nav-link">Como Funciona</a>
            <a 
              className="nav-link" 
              onClick={() => navigate('/influencers')}
            >
              Influenciadores
            </a>
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

      <section className="hero">
        <div className="container">
          <h1>Encontre o influenciador ideal para sua marca</h1>
          <p>Conecte-se com criadores de conteúdo que se alinham com os valores da sua empresa</p>
          
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              name="search"
              className="search-input"
              placeholder="Buscar por nome ou perfil do Instagram"
            />
            <button type="submit" className="search-button">Buscar</button>
          </form>
        </div>
      </section>

      {/* Nova seção "Sobre" */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>Sobre o AgencyInflu</h2>
          <div className="about-content">
            <div className="about-image">
              <img src="src\assets\instagram.webp" alt="Marketing de Influência" />
            </div>
            <div className="about-text">
              <p>O <strong>AgencyInflu</strong> é uma plataforma que conecta marcas a influenciadores digitais de forma simples e eficiente, eliminando intermediários e reduzindo custos para ambos os lados.</p>
              <p>Nossa plataforma foi criada pensando em criar um ecossistema onde marcas possam encontrar influenciadores alinhados com seus valores e público-alvo, enquanto influenciadores possam destacar seu trabalho e receber oportunidades de parcerias genuínas.</p>
              <p>Diferentemente de agências tradicionais, aqui as conexões são diretas, transparentes e baseadas em dados reais de desempenho.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção "Como Funciona" atualizada */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>Como Funciona</h2>
          <p className="section-description">
            Um processo simples para conectar marcas e influenciadores
          </p>
          
          <div className="steps">
            <div className="step">
              <div className="step-icon"><FaSearch size={32} /></div>
              <h3>Pesquise</h3>
              <p>
                Encontre influenciadores com base em nichos, plataformas e métricas
                que importam para sua campanha.
              </p>
            </div>

            <div className="step">
              <div className="step-icon"><FaUsers size={32} /></div>
              <h3>Conecte-se</h3>
              <p>
                Entre em contato diretamente com os influenciadores e negocie
                parcerias que façam sentido para ambos.
              </p>
            </div>

            <div className="step">
              <div className="step-icon"><FaChartLine size={32} /></div>
              <h3>Resulte</h3>
              <p>
                Acompanhe o desempenho das campanhas e obtenha resultados
                mensuráveis para sua marca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nova seção de benefícios */}
      <section className="benefits-section">
        <div className="container">
          <h2>Por que escolher o AgencyInflu?</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Para Marcas</h3>
              <ul>
                <li>Acesso a uma ampla rede de influenciadores verificados</li>
                <li>Filtros avançados para encontrar o perfil ideal</li>
                <li>Dados de desempenho transparentes</li>
                <li>Contato direto sem taxas de intermediário</li>
              </ul>
            </div>
            
            <div className="benefit-card">
              <h3>Para Influenciadores</h3>
              <ul>
                <li>Aumente sua visibilidade para marcas</li>
                <li>Receba propostas compatíveis com seu nicho</li>
                <li>Gerencie suas parcerias em um só lugar</li>
                <li>Valorize seu trabalho com base em dados reais</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="cta-section">
        <div className="container">
          <h2>Pronto para começar?</h2>
          <p>Junte-se a milhares de marcas e influenciadores em nossa plataforma.</p>
          <div className="cta-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/influencers')}
            >
              Ver Influenciadores
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/register')}
            >
              Criar Conta
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
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
                <li><a href="#about">Sobre</a></li>
                <li><a href="#how-it-works">Como Funciona</a></li>
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

export default HomePage;
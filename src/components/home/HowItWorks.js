import React from 'react';
import { FaSearch, FaHandshake, FaChartLine } from 'react-icons/fa';
import '../../styles/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2>Como funciona</h2>
        <p className="section-description">
          Um processo simples para conectar marcas e influenciadores
        </p>

        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <FaSearch />
            </div>
            <h3>Pesquise</h3>
            <p>
              Encontre influenciadores com base em nichos, plataformas e métricas
              que importam para sua campanha.
            </p>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaHandshake />
            </div>
            <h3>Conecte-se</h3>
            <p>
              Entre em contato diretamente com os influenciadores e negocie
              parcerias que façam sentido para ambos.
            </p>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaChartLine />
            </div>
            <h3>Resulte</h3>
            <p>
              Acompanhe o desempenho das campanhas e obtenha resultados
              mensuráveis para sua marca.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
import React from 'react';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa';
import '../../styles/InfluencerStats.css';

const InfluencerStats = ({ influencer }) => {
  const { platforms, engagement, audienceDemo } = influencer;

  // Helper para formatar números grandes
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="influencer-stats">
      <h3>Estatísticas</h3>
      
      <div className="stats-section">
        <h4>Plataformas e Seguidores</h4>
        <ul className="platform-stats">
          {platforms.instagram && (
            <li>
              <FaInstagram />
              <span className="platform-name">Instagram</span>
              <span className="follower-count">{formatNumber(platforms.instagram)}</span>
            </li>
          )}
          {platforms.tiktok && (
            <li>
              <FaTiktok />
              <span className="platform-name">TikTok</span>
              <span className="follower-count">{formatNumber(platforms.tiktok)}</span>
            </li>
          )}
          {platforms.youtube && (
            <li>
              <FaYoutube />
              <span className="platform-name">YouTube</span>
              <span className="follower-count">{formatNumber(platforms.youtube)}</span>
            </li>
          )}
          {platforms.twitter && (
            <li>
              <FaTwitter />
              <span className="platform-name">Twitter/X</span>
              <span className="follower-count">{formatNumber(platforms.twitter)}</span>
            </li>
          )}
        </ul>
      </div>
      
      <div className="stats-section">
        <h4>Taxa de Engajamento</h4>
        <div className="engagement-meter">
          <div 
            className="engagement-fill" 
            style={{ width: `${Math.min(engagement * 10, 100)}%` }}
            title={`${engagement}% de engajamento`}
          ></div>
        </div>
        <p className="engagement-value">{engagement}%</p>
      </div>
      
      <div className="stats-section">
        <h4>Demografia da Audiência</h4>
        
        <div className="demographic">
          <h5>Gênero</h5>
          <div className="demographic-bar">
            <div 
              className="demographic-segment female" 
              style={{ width: `${audienceDemo.gender.female}%` }}
              title={`Feminino: ${audienceDemo.gender.female}%`}
            ></div>
            <div 
              className="demographic-segment male" 
              style={{ width: `${audienceDemo.gender.male}%` }}
              title={`Masculino: ${audienceDemo.gender.male}%`}
            ></div>
          </div>
          <div className="demographic-labels">
            <span>Feminino: {audienceDemo.gender.female}%</span>
            <span>Masculino: {audienceDemo.gender.male}%</span>
          </div>
        </div>
        
        <div className="demographic">
          <h5>Faixa Etária</h5>
          <div className="age-distribution">
            {Object.entries(audienceDemo.age).map(([range, percentage]) => (
              <div className="age-group" key={range}>
                <div className="age-bar-container">
                  <div 
                    className="age-bar" 
                    style={{ height: `${percentage * 2}px` }}
                  ></div>
                </div>
                <span className="age-label">{range}</span>
                <span className="age-percentage">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerStats;
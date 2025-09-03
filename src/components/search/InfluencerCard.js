import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaInstagram, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa';
import '../../styles/global.css';

const InfluencerCard = ({ influencer }) => {
  const { id, name, niche, profileImg, followers, platforms, avgRate, rating, reliability } = influencer;
  
  // Helper para formatar números grandes
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };
  
  // Determina quais plataformas exibir
  const getPlatformIcons = () => {
    return (
      <div className="platform-icons">
        {platforms.instagram && (
          <span className="platform instagram" title={`Instagram: ${formatNumber(platforms.instagram)} seguidores`}>
            <FaInstagram />
          </span>
        )}
        {platforms.tiktok && (
          <span className="platform tiktok" title={`TikTok: ${formatNumber(platforms.tiktok)} seguidores`}>
            <FaTiktok />
          </span>
        )}
        {platforms.youtube && (
          <span className="platform youtube" title={`YouTube: ${formatNumber(platforms.youtube)} inscritos`}>
            <FaYoutube />
          </span>
        )}
        {platforms.twitter && (
          <span className="platform twitter" title={`Twitter: ${formatNumber(platforms.twitter)} seguidores`}>
            <FaTwitter />
          </span>
        )}
      </div>
    );
  };
  
  return (
    <Link to={`/influencer/${id}`} className="influencer-card">
      <div className="card-header">
        <img src={profileImg} alt={name} className="profile-image" />
        <div className="reliability-badge" title="Índice de confiabilidade">
          {reliability}%
        </div>
      </div>
      
      <div className="card-body">
        <h3>{name}</h3>
        <p className="niche">{niche}</p>
        
        <div className="stats">
          <div className="stat">
            <span className="label">Seguidores:</span>
            <span className="value">{formatNumber(followers)}</span>
          </div>
          <div className="stat">
            <span className="label">Conversão média:</span>
            <span className="value">R${avgRate}</span>
          </div>
          <div className="stat">
            <span className="label">Avaliação</span>
            <span className="value rating">
              <FaStar className="star-icon" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        {getPlatformIcons()}
      </div>
    </Link>
  );
};

export default InfluencerCard;
import React from 'react';
import InfluencerCard from './InfluencerCard';
import '../../styles/SearchResults.css';

const SearchResults = ({ influencers, loading }) => {
  if (loading) {
    return (
      <div className="search-results loading">
        <div className="loading-spinner"></div>
        <p>Buscando influenciadores...</p>
      </div>
    );
  }

  if (influencers.length === 0) {
    return (
      <div className="search-results empty">
        <h3>Nenhum influenciador encontrado</h3>
        <p>Tente ajustar seus filtros ou buscar com outros termos.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <h3>{influencers.length} influenciadores encontrados</h3>
        <div className="sort-options">
          <label htmlFor="sort">Ordenar por: </label>
          <select id="sort" defaultValue="relevance">
            <option value="relevance">Relevância</option>
            <option value="followers-desc">Mais seguidores</option>
            <option value="rating-desc">Melhor avaliação</option>
            <option value="price-asc">Menor preço</option>
          </select>
        </div>
      </div>

      <div className="influencers-grid">
        {influencers.map(influencer => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import '../../styles/FiltersSidebar.css';

const FiltersSidebar = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      let platforms = [...localFilters.platforms];
      
      if (checked) {
        platforms.push(name);
      } else {
        platforms = platforms.filter(platform => platform !== name);
      }
      
      setLocalFilters({ ...localFilters, platforms });
    } else {
      setLocalFilters({ ...localFilters, [name]: value });
    }
  };
  
  const applyFilters = () => {
    onFilterChange(localFilters);
  };
  
  return (
    <aside className="filters-sidebar">
      <h3><FaFilter /> Filtros</h3>
      
      <div className="filter-group">
        <h4>Seguidores totais</h4>
        <div className="range-filter">
          <input 
            type="range" 
            name="minFollowers"
            min="0" 
            max="1000000" 
            step="10000" 
            value={localFilters.minFollowers}
            onChange={handleInputChange}
          />
          <div className="range-values">
            <span>{localFilters.minFollowers.toLocaleString()}</span>
            <span>1M+</span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h4>Valor médio (R$)</h4>
        <div className="range-filter">
          <input 
            type="range" 
            name="maxRate"
            min="100" 
            max="10000" 
            step="100" 
            value={localFilters.maxRate}
            onChange={handleInputChange}
          />
          <div className="range-values">
            <span>R$100</span>
            <span>R${localFilters.maxRate.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="filter-group">
        <h4>Plataformas</h4>
        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="instagram" 
              checked={localFilters.platforms.includes('instagram')}
              onChange={handleInputChange}
            />
            Instagram
          </label>
          <label>
            <input 
              type="checkbox" 
              name="tiktok" 
              checked={localFilters.platforms.includes('tiktok')}
              onChange={handleInputChange}
            />
            TikTok
          </label>
          <label>
            <input 
              type="checkbox" 
              name="youtube" 
              checked={localFilters.platforms.includes('youtube')}
              onChange={handleInputChange}
            />
            YouTube
          </label>
          <label>
            <input 
              type="checkbox" 
              name="twitter" 
              checked={localFilters.platforms.includes('twitter')}
              onChange={handleInputChange}
            />
            Twitter/X
          </label>
        </div>
      </div>
      
      <div className="filter-group">
        <h4>Avaliação mínima</h4>
        <div className="rating-filter">
          {[1, 2, 3, 4, 5].map(star => (
            <span 
              key={star}
              className={`star ${star <= localFilters.minRating ? 'active' : ''}`}
              onClick={() => setLocalFilters({...localFilters, minRating: star})}
            >★</span>
          ))}
        </div>
      </div>
      
      <button className="apply-filters-btn" onClick={applyFilters}>
        Aplicar Filtros
      </button>
    </aside>
  );
};

export default FiltersSidebar;
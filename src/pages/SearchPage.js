import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  return (
    <div className="container" style={{ padding: '50px 0' }}>
      <h1>Resultados da busca: "{query}"</h1>
      <p>Esta página está em desenvolvimento.</p>
      <p>Aqui serão mostrados os resultados dos influenciadores com filtros de valor médio, seguidores, etc.</p>
    </div>
  );
};

export default SearchPage;
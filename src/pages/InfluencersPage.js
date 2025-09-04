import React, { useState, useEffect } from 'react';
// Importando apiWithErrorHandling em vez de getAll diretamente
import { apiWithErrorHandling } from '../services/api';
import InfluencerCard from '../components/search/InfluencerCard';
import '../styles/influencers.css';

const InfluencersPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        // Usando apiWithErrorHandling.influencer.getAll() em vez de getAll()
        const data = await apiWithErrorHandling.influencer.getAll();
        console.log("Dados da API:", data);
        
        // Adaptar os dados da API para o formato esperado pelo InfluencerCard
        const adaptedData = data.map(influencer => ({
          id: influencer.id,
          name: influencer.nome, // Agora usando 'nome' como discutido anteriormente
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

  // Resto do seu componente permanece igual...
  return (
    <div className="influencers-page">
      <h1>Influenciadores</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="influencers-list">
        {influencers.map(influencer => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
};

export default InfluencersPage;
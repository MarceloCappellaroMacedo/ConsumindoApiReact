import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/ContactButton.css';

const ContactButton = ({ influencerId }) => {
  const { isAuthenticated, user } = useContext(AuthContext) || { isAuthenticated: false };
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (!isAuthenticated) {
      // Redireciona para login
      navigate(`/login?redirect=/influencer/${influencerId}`);
      return;
    }

    if (user?.type !== 'brand') {
      // Mostrar alerta que precisa ser uma marca/contratante
      alert('Para entrar em contato com influenciadores, você precisa ter uma conta como contratante.');
      return;
    }

    // Aqui iniciaria o contato - poderia abrir modal ou ir para página de contato
    navigate(`/contact/${influencerId}`);
  };

  return (
    <button className="contact-button" onClick={handleContactClick}>
      Entrar em contato
    </button>
  );
};

export default ContactButton;
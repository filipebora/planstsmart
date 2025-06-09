import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanTalks: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/plantalks/feed');
  }, [navigate]);

  return null;
};

export default PlanTalks;
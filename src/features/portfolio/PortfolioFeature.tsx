// src -> features -> portfolio -> PortfolioFeature.tsx

import React from 'react';
import PortfolioSummary from '../../components/PortfolioSummary';

const PortfolioFeature: React.FC = () => {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Portfolio Summary</h2>
      <PortfolioSummary />
    </>
  );
};

export default PortfolioFeature;
// Typing state

// src -> components -> PortfolioSummary.tsx

import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '../stores/usePortfolioStore';

const PortfolioSummary: React.FC = () => {
  const {
    holdings,
    totalValue,
    gainLoss,
    isLoading,
    error,
    loadPortfolio,
  } = usePortfolioStore();

  const [selectedSector, setSelectedSector] = useState<string>('All');

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const filtered =
    selectedSector === 'All'
      ? holdings
      : holdings.filter((s) => s.sector === selectedSector);

  if (isLoading) return <p>Loading portfolio...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        border: '1px solid #D1D5DB',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <h2>Portfolio Summary</h2>

      <p>Total Value: ${totalValue.toLocaleString()}</p>

      <p style={{ color: gainLoss >= 0 ? 'green' : 'red' }}>
        Gain/Loss: ${gainLoss.toFixed(2)}
      </p>

      <select
        value={selectedSector}
        onChange={(e) => setSelectedSector(e.target.value)}
      >
        <option>All</option>
        <option>Technology</option>
        <option>Finance</option>
        <option>Automotive</option>
      </select>

      <ul>
        {filtered.map((s) => (
          <li key={s.id}>
            {s.symbol}: ${s.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSummary;
// FILE: src/features/portfolio/HoldingsFeature.tsx

import React from 'react';
import type { Holdings } from '../../types/stock.types';

import { PieChart, Pie, Tooltip } from 'recharts';

interface HoldingsFeatureProps {
  holdings: Holdings[];
}

const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {

  // Convert holdings into simple chart data
  const chartData = holdings.map((holding) => {
    return {
      name: holding.symbol,
      value: holding.currentValue,
    };
  });

  return (
    <>
      {/* -------- PIE CHART -------- */}

      <h2>Portfolio Allocation</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
        />
        <Tooltip />
      </PieChart>

      {/* -------- TABLE -------- */}

      <h2>Holdings</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Invested</th>
            <th>Current</th>
            <th>Return</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.id}>
              <td>{holding.symbol}</td>
              <td>{holding.qty}</td>
              <td>{holding.investedValue}</td>
              <td>{holding.currentValue}</td>
              <td>{holding.totalReturn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HoldingsFeature;
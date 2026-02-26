// FILE: src/features/positions/PositionsFeature.tsx

import React from 'react';
import type { Position } from '../../types/stock.types';
import DataTable from '../../components/DataTable';
import { usePositionStore } from '../../stores/usePositionStore';

interface PositionsFeatureProps {
  positions: Position[];
}

// Helper: render a number as a coloured cell
function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  var numberValue = Number(value);

  var isPositive = numberValue >= 0;
  var textColour = isPositive ? '#166534' : '#991B1B';

  var prefix = isPositive ? '+' : '';
  var currencySign = suffix === '%' ? '' : '$';

  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}

const PositionsFeature: React.FC<PositionsFeatureProps> = ({ positions }) => {

  const toggleCompare = usePositionStore(s => s.toggleComparePosition);
  const isInCompare   = usePositionStore(s => s.isInCompare);

  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>

      <DataTable<Position>
        data={positions}
        rowKey="id"
        filterKey="symbol"
        columns={[

          { key: 'symbol', header: 'Symbol', sortable: true },

          { key: 'qty', header: 'Qty', sortable: true },

          {
            key: 'avgPrice',
            header: 'Avg Price',
            sortable: true,
            render: function(value) {
              return '$' + Number(value).toFixed(2);
            }
          },

          {
            key: 'ltp',
            header: 'LTP',
            sortable: true,
            render: function(value) {
              return '$' + Number(value).toFixed(2);
            }
          },

          {
            key: 'pnl',
            header: 'P&L',
            sortable: true,
            render: function(value) {
              return pnlCell(value);
            }
          },

          {
            key: 'pnlPct',
            header: 'P&L %',
            sortable: true,
            render: function(value) {
              return pnlCell(value, '%');
            }
          },

          // ✅ NEW COLUMN — Compare Button
          {
            key: 'id',
            header: 'Compare',
            render: function(_, row) {

              const selected = isInCompare(row.id);

              return (
                <button
                  onClick={() => toggleCompare(row)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: selected ? '#DC2626' : '#2563EB',
                    color: 'white',
                    fontWeight: 500
                  }}
                >
                  {selected ? 'Remove' : 'Compare'}
                </button>
              );
            }
          }

        ]}
      />
    </>
  );
};

export default PositionsFeature;
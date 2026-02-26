import React from 'react';
import { usePositionStore } from '../stores/usePositionStore';
import type { Position } from '../types/stock.types';

const POSITION_ROWS: {
  label: string;
  key: keyof Position;
  format?: (v: any) => string;
}[] = [
  { label: 'Quantity', key: 'qty' },
  { 
    label: 'Avg Price', 
    key: 'avgPrice', 
    format: (v) => `$${Number(v).toFixed(2)}` 
  },
  { 
    label: 'LTP', 
    key: 'ltp', 
    format: (v) => `$${Number(v).toFixed(2)}` 
  },
  { 
    label: 'P&L', 
    key: 'pnl', 
    format: (v) => `$${Number(v).toFixed(2)}` 
  },
  { 
    label: 'P&L %', 
    key: 'pnlPct', 
    format: (v) => `${Number(v).toFixed(2)}%` 
  },
];

const PositionComparePanel: React.FC = () => {
  const compareList = usePositionStore((s) => s.comparePositions);
  const clearCompare = usePositionStore((s) => s.clearComparePositions);
  const toggleCompare = usePositionStore((s) => s.toggleComparePosition);

  if (compareList.length < 2) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '2px solid #1E40AF',
        padding: '16px 24px',
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.12)',
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      {/* ── Header Section ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: 16 }}>
          Comparing {compareList.length} Position{compareList.length > 1 ? 's' : ''}
        </h3>
        <button
          onClick={clearCompare}
          style={{
            background: '#FEE2E2',
            color: '#991B1B',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          Clear All
        </button>
      </div>

      {/* ── Comparison Table ── */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#1E3A8A', color: '#fff' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', width: 130 }}>Metric</th>
            {compareList.map((pos) => (
              <th key={pos.id} style={{ padding: '8px 12px', textAlign: 'center', minWidth: 110 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>{pos.symbol}</span>
                  <button
                    onClick={() => toggleCompare(pos)}
                    style={{
                      marginLeft: 8,
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: '#fff',
                      borderRadius: 3,
                      cursor: 'pointer',
                      fontSize: 10,
                    }}
                  >
                    ✕
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {POSITION_ROWS.map((row, rowIndex) => {
            const rowValues = compareList.map((p) => Number(p[row.key]));
            const maxVal = Math.max(...rowValues);

            return (
              <tr 
                key={row.key} 
                style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F8FAFC' }}
              >
                <td style={{ padding: '7px 12px', fontWeight: 'bold', borderRight: '1px solid #E5E7EB' }}>
                  {row.label}
                </td>

                {compareList.map((pos) => {
                  const rawValue = pos[row.key];
                  const isBest = typeof rawValue === 'number' && rawValue === maxVal;
                  const display = row.format ? row.format(rawValue) : String(rawValue);

                  return (
                    <td
                      key={pos.id}
                      style={{
                        padding: '7px 12px',
                        textAlign: 'center',
                        fontWeight: isBest ? 'bold' : 'normal',
                        color: isBest ? '#166534' : '#111827',
                        backgroundColor: isBest ? '#D1FAE5' : 'transparent',
                        borderRight: '1px solid #F3F4F6',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      {isBest && <span style={{ marginRight: 4 }}>▲</span>}
                      {display}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionComparePanel;
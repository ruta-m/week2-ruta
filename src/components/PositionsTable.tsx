// src/components/PositionsTable.tsx

import DataTable from './DataTable'
import type { Position } from '../types/stock.types'

interface Props {
  positions: Position[]
}

function PositionsTable({ positions }: Props) {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Positions Table</h2>

      <DataTable<Position>
        data={positions}
        rowKey="id"
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Quantity', sortable: true },
          { key: 'avgPrice', header: 'Average Price', sortable: true },
          {
            key: 'ltp',
            header: 'Last Traded Price',
            sortable: true,
            render: v => `$${Number(v).toFixed(2)}`
          },
          {
            key: 'pnl',
            header: 'P&L',
            sortable: true,
            render: v => {
              const n = Number(v)
              return (
                <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                  {n}
                </span>
              )
            }
          },
          {
            key: 'pnlPct',
            header: 'P&L%',
            sortable: true,
            render: v => {
              const n = Number(v)
              return (
                <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              )
            }
          }
        ]}
      />
    </>
  )
}

export default PositionsTable;
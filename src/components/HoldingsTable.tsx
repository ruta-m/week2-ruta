// src/components/HoldingsTable.tsx

import DataTable from './DataTable'
import type { Holdings } from '../types/stock.types'

interface Props {
  holdings: Holdings[]
}

function HoldingsTable({ holdings }: Props) {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Holdings Table</h2>

      <DataTable<Holdings>
        data={holdings}
        rowKey="id"
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'symbol', header: 'Symbol' },
          { key: 'qty', header: 'Quantity' },
          { key: 'investedValue', header: 'Invested Value' },
          { key: 'currentValue', header: 'Current Value' },
          {
            key: 'totalReturn',
            header: 'Total Return',
            render: v => {
              const n = Number(v)
              return (
                <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(0)}
                </span>
              )
            }
          }
        ]}
      />
    </>
  )
}

export default HoldingsTable;
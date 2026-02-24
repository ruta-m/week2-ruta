// src/components/TradeTable.tsx

import DataTable from './DataTable'
import type { Trade } from '../types/stock.types'

interface Props {
  trades: Trade[]
}

function TradeTable({ trades }: Props) {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Trade History</h2>

      <DataTable<Trade>
        data={trades}
        rowKey="id"
        columns={[
          { key: 'symbol', header: 'Symbol' },
          {
            key: 'type',
            header: 'Type',
            render: v => (
              <strong style={{ color: v === 'BUY' ? 'green' : 'red' }}>
                {String(v)}
              </strong>
            )
          },
          { key: 'quantity', header: 'Qty' },
          {
            key: 'price',
            header: 'Price',
            render: v => `$${Number(v).toFixed(2)}`
          },
          { key: 'date', header: 'Date' }
        ]}
      />
    </>
  )
}

export default TradeTable;
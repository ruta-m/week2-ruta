// src/components/StockTable.tsx

import DataTable from './DataTable';
import type { Stock } from '../types/stock.types';
// import TableSkeleton from '../skeletons/TableSkeleton';

interface Props {
  stocks: Stock[]
  isLoading?: boolean
  onRowClick?: (stock: Stock) => void
}

function StockTable({ stocks, onRowClick }: Props) {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>

      <DataTable<Stock>
        data={stocks}
        rowKey="id"
        onRowClick={onRowClick}
        emptyMessage="No stocks match your search."
        columns={[
          { key: 'symbol', header: 'Symbol' },
          { key: 'name', header: 'Company' },
          {
            key: 'price',
            header: 'Price',
            render: v => `$${Number(v).toFixed(2)}`
          },
          {
            key: 'changePct',
            header: 'Change %',
            render: v => {
              const n = Number(v)
              return (
                <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              )
            }
          },
          {
            key: 'volume',
            header: 'Volume',
            render: v => Number(v).toLocaleString()
          }
        ]}
      />
    </>
  )
}

export default StockTable;
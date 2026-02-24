// 1. To implement TableSkeleton.jsx -- code for StockTable.jsx

// import DataTable from './DataTable'
// import TableSkeleton from '../skeletons/TableSkeleton'
// import type { Stock } from '../types/stock.types'

// interface Props {
//   stocks: Stock[]
//   isLoading?: boolean
//   onRowClick?: (stock: Stock) => void
// }

// export default function StockTable({
//   stocks,
//   isLoading = false,
//   onRowClick,
// }: Props) {

//   // Show shimmer while loading
//   if (isLoading) {
//     return (
//       <TableSkeleton
//         rows={6}
//         cols={5}
//         title="Live Quotes"
//       />
//     )
//   }

//   return (
//     <>
//       <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>

//       <DataTable<Stock>
//         data={stocks}
//         rowKey="id"
//         onRowClick={onRowClick}
//         emptyMessage="No stocks match your search."
//         columns={[
//           { key: 'symbol', header: 'Symbol' },
//           { key: 'name', header: 'Company' },
//           {
//             key: 'price',
//             header: 'Price',
//             render: v => `$${Number(v).toFixed(2)}`
//           },
//           {
//             key: 'changePct',
//             header: 'Change %',
//             render: v => {
//               const n = Number(v)
//               return (
//                 <span style={{ color: n >= 0 ? 'green' : 'red' }}>
//                   {n >= 0 ? '+' : ''}{n.toFixed(2)}%
//                 </span>
//               )
//             }
//           },
//           {
//             key: 'volume',
//             header: 'Volume',
//             render: v => Number(v).toLocaleString()
//           }
//         ]}
//       />
//     </>
//   )
// }





// 2. To implement it in main -- code for App.jsx

// import { useState, useMemo, useEffect } from 'react'
// import "./App.css"

// // Data
// import { stocks, trades, positions, holdings } from './data/stockData'

// // Types
// import type { Stock, Trade } from './types/stock.types'

// // Components
// import StockCard from './components/StockCard'
// import PortfolioSummary from './components/PortfolioSummary'
// import SearchBar from './components/SearchBar'
// import TradeForm from './components/TradeForm'

// import StockTable from './components/StockTable'
// import TradeTable from './components/TradeTable'
// import PositionsTable from './components/PositionsTable'
// import HoldingsTable from './components/HoldingsTable'

// function App() {
//   const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sectorFilter, setSectorFilter] = useState('')
//   const [tradeHistory, setTradeHistory] = useState<Trade[]>(trades)

//   // Simulated loading state
//   const [isStocksLoading, setIsStocksLoading] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsStocksLoading(false)
//     }, 2000) // 2 seconds shimmer

//     return () => clearTimeout(timer)
//   }, [])

//   const normalizedSearch = searchQuery.toLowerCase()

//   const filteredStocks = useMemo(() => {
//     return stocks.filter(s => {
//       const matchesSearch =
//         s.symbol.toLowerCase().includes(normalizedSearch) ||
//         s.name.toLowerCase().includes(normalizedSearch)

//       const matchesSector =
//         !sectorFilter || s.sector === sectorFilter

//       return matchesSearch && matchesSector
//     })
//   }, [normalizedSearch, sectorFilter])

//   const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
//     const newTrade: Trade = {
//       ...input,
//       id: `t${Date.now()}`,
//       date: new Date().toISOString().split('T')[0],
//     }

//     setTradeHistory(prev => [newTrade, ...prev])
//   }

//   return (
//     <div
//       style={{
//         maxWidth: 1100,
//         margin: '0 auto',
//         padding: 24,
//         fontFamily: 'Arial, sans-serif',
//       }}
//     >
//       <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

//       <SearchBar
//         onSearch={setSearchQuery}
//         onFilterChange={setSectorFilter}
//         placeholder="Search by symbol or name..."
//       />

//       {/* Cards */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: 16,
//         }}
//       >
//         {filteredStocks.map(stock => (
//           <StockCard
//             key={stock.id}
//             stock={stock}
//             isSelected={selectedStock?.id === stock.id}
//             onSelect={setSelectedStock}
//           />
//         ))}
//       </div>

//       <PortfolioSummary availableStocks={stocks} />

//       {/* Stock Table with Loading */}
//       <StockTable
//         stocks={filteredStocks}
//         isLoading={isStocksLoading}
//         onRowClick={setSelectedStock}
//       />

//       {/* Other tables remain unchanged */}
//       <TradeTable trades={tradeHistory} />
//       <PositionsTable positions={positions} />
//       <HoldingsTable holdings={holdings} />

//       <h2 style={{ color: '#1E40AF' }}>New Trade</h2>
//       <TradeForm
//         stocks={stocks}
//         onSubmitTrade={handleNewTrade}
//         initialValues={selectedStock ?? {}}
//       />
//     </div>
//   )
// }

// export default App
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import StockCard from './components/StockCard';
// import { stocks } from "./data/stockData";
// import PortfolioSummary from './components/PortfolioSummary';
// import DataTable from "./components/DataTable";
// import TradeForm from "./components/TradeForm";

// Data
import { stocks, trades, positions, holdings } from './data/stockData';

// Types
import type { Stock, Trade, Position, Holdings }   from './types/stock.types';

// Components
import StockCard from './components/StockCard';
import PortfolioSummary from './components/PortfolioSummary';
import SearchBar from './components/SearchBar';
import DataTable from './components/DataTable';
import TradeForm from './components/TradeForm';


// function App() {
//   return (
//     <>
//       <DataTable
//         data={stocks}
//         rowKey="id"
//         columns={[
//           { key: "symbol", header: "Symbol" },
//           {
//             key: "price",
//             header: "Price",
//             render: (val) => `$${Number(val).toFixed(2)}`,
//           },
//           {
//             key: "changePct",
//             header: "Change %",
//             render: (val) => {
//               const n = Number(val);
//               return (
//                 <span style={{ color: n >= 0 ? "green" : "red" }}>
//                   {n >= 0 ? "+" : ""} {n.toFixed(2)}%
//                 </span>
//               );
//             },
//           },
//         ]}
//       ></DataTable>
//     </>
//   );
// }

// Representational layer

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [sectorFilter,  setSectorFilter]  = useState('');
  const [tradeHistory,  setTradeHistory]  = useState<Trade[]>(trades);
 
  // Filter stocks based on search and sector
  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !sectorFilter || s.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });
 
  // Add a new trade (receives NewTradeInput — no id/date)
  const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
    const newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(prev => [newTrade, ...prev]);
  };
 
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>
 
      {/* Event Typing */}
      <SearchBar
        onSearch={setSearchQuery}
        onFilterChange={setSectorFilter}
        placeholder='Search by symbol or name...'
      />
 
      {/* Typing Props */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filteredStocks.map(stock => (
          <StockCard
            key={stock.id}
            stock={stock}
            isSelected={selectedStock?.id === stock.id}
            onSelect={setSelectedStock}
          />
        ))}
      </div>
 
      {/* Typing State */}
      <PortfolioSummary availableStocks={stocks} />
 
      {/* Generic Components — Stock table */}
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>
      <DataTable<Stock>
        data={filteredStocks}
        rowKey='id'
        onRowClick={setSelectedStock}
        emptyMessage='No stocks match your search.'
        columns={[
          { key: 'symbol', header: 'Symbol' },
          { key: 'name',   header: 'Company' },
          { key: 'price',  header: 'Price',
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'changePct', header: 'Change %',
            render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n >= 0 ? '+' : ''}{n.toFixed(2)}%
              </span>;
            }},
          { key: 'volume', header: 'Volume',
            render: v => Number(v).toLocaleString() },
        ]}
      />
 
      {/* Generic Components — Trade table */}
      <h2 style={{ color: '#1E40AF' }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey='id'
        columns={[
          { key: 'symbol',   header: 'Symbol' },
          { key: 'type',     header: 'Type',
            render: v => <strong style={{ color: v === 'BUY' ? 'green' : 'red' }}>
              {String(v)}</strong> },
          { key: 'quantity', header: 'Qty' },
          { key: 'price',    header: 'Price',
            render: v => `$${Number(v).toFixed(2)}` },
          { key: 'date',     header: 'Date' },
        ]}
      />

      {/* Positions Table */}
      <h2 style={{color: '#1E40AF'}}>Positions Table</h2>
      <DataTable<Position>
        data={positions}
        rowKey='id'
        columns={[
          {key: 'symbol', header:'Symbol', sortable: true},
          {key: 'qty', header:'Quantity', sortable: true},
          {key: 'avgPrice', header: 'Average Price', sortable: true},
          {key: 'ltp', header: 'Last Traded Price', sortable: true, render: v => `$${Number(v).toFixed(2)}`},
          {key: 'pnl', header:'P&L', sortable: true, render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n}
              </span>;}},
          {key: 'pnlPct', header:'P&L%', sortable: true, render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n >= 0 ? '+' : ''}{n.toFixed(2)}%
              </span>;}}
        ]}
      />

      {/* Holdings Table */}
      <h2 style={{color: '#1E40AF'}}>Holdings Table</h2>
      <DataTable<Holdings>
        data={holdings}
        rowKey='id'
        columns = {[
          {key: 'id', header: 'ID'},
          {key: 'symbol', header: 'Symbol'},
          {key: 'qty', header: 'Quantity'},
          {key: 'investedValue', header: 'Invested Value'},
          {key: 'currentValue', header: 'Current Value'},
          {key: 'totalReturn', header: 'Total Return', render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n >= 0 ? '+' : ''}{n.toFixed(0)}
              </span>;}},
        ]}
      />
 
      {/* Utility Types */}
      <h2 style={{ color: '#1E40AF' }}>New Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={handleNewTrade}
        initialValues={selectedStock ?? {}}
      />
    </div>
  );
}
 
export default App;
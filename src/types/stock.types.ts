// All shared TypeScript interfaces

export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number; // dollar change
    changePct: number; // percentage change
    volume: number;
    marketCap: number;
    sector: string;
}

export interface Trade {
    id: string;
    stockId: string;
    type: 'BUY' | 'SELL';
    symbol: string;
    quantity: number;
    price: number;
    date: string;
}

export interface Portfolio {
    totalValue: number;
    totalCost: number;
    gainLoss: number;
    holdings: Stock[];
}

export interface Position {
    id: string,
    symbol: string,
    qty: number,
    avgPrice: number,
    ltp: number,
    pnl: number,
    pnlPct: number
}

export interface Holdings {
    id: string,
    symbol: string,
    qty: number,
    investedValue: number,
    currentValue: number,
    totalReturn: number
}


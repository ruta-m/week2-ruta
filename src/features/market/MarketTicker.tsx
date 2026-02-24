import React from "react";

interface IndexData {
  name: string;
  price: number;
  changePercent: number;
}

const marketData: IndexData[] = [
  { name: "NIFTY 50", price: 22145.30, changePercent: 0.45 },
  { name: "BANKNIFTY", price: 48220.10, changePercent: -0.32 },
  { name: "SENSEX", price: 73550.44, changePercent: 0.61 },
  { name: "NIFTY IT", price: 30550.12, changePercent: -1.24 },
];

const MarketTicker: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
      }}
    >
      {marketData.map((item) => {
        const isPositive = item.changePercent >= 0;

        return (
          <div key={item.name} style={{ display: "flex", gap: "8px" }}>
            <strong>{item.name}</strong>

            <span>{item.price.toFixed(2)}</span>

            <span
              style={{
                color: isPositive ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(item.changePercent)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MarketTicker;
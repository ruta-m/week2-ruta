import React from "react";

const portfolioData = [
  { id: 'h1', symbol: 'AAPL', qty: 10, investedValue: 1750.00, currentValue: 1893.00, totalReturn: 143.00 },
  { id: 'h2', symbol: 'MSFT', qty: 5, investedValue: 1800.00, currentValue: 1894.50, totalReturn: 94.50 },
  { id: 'h3', symbol: 'TSLA', qty: 8, investedValue: 2120.00, currentValue: 1988.00, totalReturn: -132.00 },
  { id: 'h4', symbol: 'GOOGOO', qty: 15, investedValue: 2175.00, currentValue: 2127.00, totalReturn: -48.00 },
  { id: 'h5', symbol: 'JPM', qty: 20, investedValue: 3840.00, currentValue: 3928.00, totalReturn: 88.00 },
  { id: 'h6', symbol: 'AMZN', qty: 12, investedValue: 1920.00, currentValue: 2112.00, totalReturn: 192.00 },
  { id: 'h7', symbol: 'NVDA', qty: 4, investedValue: 2400.00, currentValue: 3240.00, totalReturn: 840.00 },
  { id: 'h8', symbol: 'META', qty: 10, investedValue: 4500.00, currentValue: 4820.00, totalReturn: 320.00 },
];

const HoldingsDistribution: React.FC = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden", background: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
      {/* Inline CSS for the scrolling animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-container:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div 
        className="ticker-container"
        style={{
          display: "flex",
          width: "max-content", // Vital for the animation to work
          animation: "scroll 55s linear infinite",
          padding: "15px 0",
        }}
      >
        {/* Double the data to create a seamless infinite loop */}
        {[...portfolioData, ...portfolioData].map((item, index) => {
          const isPositive = item.totalReturn >= 0;

          return (
            <div 
              key={`${item.id}-${index}`} 
              style={{ 
                display: "flex", 
                alignItems: "center",
                gap: "10px",
                padding: "0 40px",
                borderRight: "1px solid #ddd"
              }}
            >
              <span style={{ fontWeight: "bold" }}>{item.symbol}</span>
              <span>${item.currentValue.toFixed(2)}</span>
              <span
                style={{
                  color: isPositive ? "#2e7d32" : "#d32f2f",
                  fontWeight: "bold",
                }}
              >
                {isPositive ? "▲" : "▼"} ${Math.abs(item.totalReturn).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoldingsDistribution;
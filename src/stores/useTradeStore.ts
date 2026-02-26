import { create } from "zustand";
import type { Trade } from "../types/stock.types";
import { trades } from "../data/stockData";

type NewTradeInput = Omit<Trade, "id" | "date">;

interface TradeStore {
  tradeHistory: Trade[];
  addTrade: (input: NewTradeInput) => void;
}

export const useTradeStore = create<TradeStore>(function (set) {
  return {
    tradeHistory: trades, // seeded with mock data on startup
    addTrade: function (input) {
      const newTrade: Trade = {
        ...input, // symbol, type, quantity, price, stockID
        id: `t-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
      };

      // Function form os set() - new list depends on old list (prev)
      // newTrade goes FIRST so newest trades appear at the top
      set(function (prev) {
        return { tradeHistory: [newTrade, ...prev.tradeHistory] };
      });
    },
  };
});

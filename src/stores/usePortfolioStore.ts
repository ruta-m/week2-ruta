// src -> stores -> usePositionStore.ts

import { create } from 'zustand';
import type { Stock } from '../types/stock.types';
import { useStockStore } from './useStockStore';

interface PortfolioStore {
  holdings: Stock[];
  totalValue: number;
  gainLoss: number;
  isLoading: boolean;
  error: string | null;

  loadPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  holdings: [],
  totalValue: 0,
  gainLoss: 0,
  isLoading: true,
  error: null,

  loadPortfolio: () => {
    set({ isLoading: true, error: null });

    setTimeout(() => {
      try {
        // Read stocks directly from stock store
        const { allStocks } = useStockStore.getState();

        const topThree = allStocks.slice(0, 3);

        const totalValue = topThree.reduce(
          (sum, s) => sum + s.price * 10,
          0
        );

        const totalCost = topThree.reduce(
          (sum, s) => sum + (s.price - s.change) * 10,
          0
        );

        set({
          holdings: topThree,
          totalValue,
          gainLoss: totalValue - totalCost,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        set({
          error: 'Failed to load portfolio',
          isLoading: false,
        });
      }
    }, 800);
  },
}));
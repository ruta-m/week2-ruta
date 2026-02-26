// src -> stores -> usePositionStore.ts

import { create } from 'zustand';
import type { Position } from '../types/stock.types';

interface PositionStore {
  comparePositions: Position[];
  toggleComparePosition: (position: Position) => void;
  clearComparePositions: () => void;
  isInCompare: (id: string) => boolean;
}

export const usePositionStore = create<PositionStore>((set, get) => ({
  comparePositions: [],

  toggleComparePosition: (position) => {
    set((prev) => {
      const alreadyIn = prev.comparePositions.some(
        (p) => p.id === position.id
      );

      if (alreadyIn) {
        return {
          comparePositions: prev.comparePositions.filter(
            (p) => p.id !== position.id
          ),
        };
      }

      if (prev.comparePositions.length >= 4) {
        alert('You can compare up to 4 positions.');
        return prev;
      }

      return {
        comparePositions: [...prev.comparePositions, position],
      };
    });
  },

  clearComparePositions: () => set({ comparePositions: [] }),

  isInCompare: (id) =>
    get().comparePositions.some((p) => p.id === id),
}));
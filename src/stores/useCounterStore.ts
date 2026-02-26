// // src/stores/useCounterStore.ts  — UPDATED with devtools
 
// import { create } from 'zustand';
 
// // Import 'devtools' from zustand/middleware
// // middleware lives in a separate import path: 'zustand/middleware'
// import { devtools } from 'zustand/middleware';
 
// interface CounterState {
//   count: number
//   increment: () => void
//   decrement: () => void
//   reset: () => void
//   incrementBy: (amount: number) => void
// }
 
// // ── Wrapping with devtools ──
// // Before:  create<T>()((set) => ({...}))
// // After:   create<T>()(devtools((set) => ({...}), options))
// // devtools() wraps the store config — the store itself is unchanged inside
// const useCounterStore = create<CounterState>()(devtools(
 
//   // The store config goes INSIDE devtools() as first argument
//   (set) => ({
//     count: 0,
 
//     // ── set() with 3 arguments ──
//     // Argument 1: the state updater (same as before)
//     // Argument 2: false — means 'merge' (not replace entire store)
//     // Argument 3: action name — shows in DevTools panel for easy debugging
//     increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
//     decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
//     reset: () => set({ count: 0 }, false, 'reset'),
//     incrementBy: (amount) =>
//       set((state) => ({ count: state.count + amount }), false, `incrementBy(${amount})`),
//       // ↑ Template literal: if amount=5, this shows 'incrementBy(5)' in DevTools
//   }),
 
//   // devtools options — 'name' is the label shown in Redux DevTools
//   { name: 'CounterStore' }
 
// ))
 
// export default useCounterStore;
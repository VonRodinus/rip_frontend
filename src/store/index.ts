// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
  devTools: true, // Для Redux DevTools
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
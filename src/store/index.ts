import { configureStore } from '@reduxjs/toolkit';
import treeReducer, { loadState, saveState } from './treeViewSlice';

const preloadedState = {
  tree: loadState(),
};

const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState().tree);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreeState {
  expandedNodes: string[];
}

export const loadState = (): TreeState => {
  try {
    const serializedState = localStorage.getItem("treeState");
    if (serializedState === null) {
      return { expandedNodes: [] };
    }
    return { expandedNodes: JSON.parse(serializedState) };
  } catch (err) {
    return { expandedNodes: [] };
  }
};

export const saveState = (state: TreeState) => {
  try {
    const serializedState = JSON.stringify(state.expandedNodes);
    localStorage.setItem("treeState", serializedState);
  } catch (err) {}
};

const initialState: TreeState = {
  expandedNodes: [],
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    toggleNode: (state, action: PayloadAction<string>) => {
      const nodeName = action.payload;
      if (state.expandedNodes.includes(nodeName)) {
        state.expandedNodes = state.expandedNodes.filter(
          (name) => name !== nodeName
        );
      } else {
        state.expandedNodes.push(nodeName);
      }
    },
  },
});

export const { toggleNode } = treeSlice.actions;
export default treeSlice.reducer;

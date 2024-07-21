import React from "react";
import TreeView from "./components/TreeView";
import { data } from "./data/treeData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TreeView nodes={data} />
    </div>
  );
}

export default App;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleNode } from '../store/treeViewSlice';
import { TreeNode } from '../types';
import './TreeView.css'; // Не забудьте импортировать CSS

interface TreeViewProps {
  nodes: TreeNode[];
}

const TreeView: React.FC<TreeViewProps> = ({ nodes }) => {
  const dispatch = useDispatch();
  const expandedNodes = useSelector((state: RootState) => state.tree.expandedNodes);

  const handleToggle = (nodeName: string) => {
    dispatch(toggleNode(nodeName));
  };

  const renderNodes = (nodes: TreeNode[]) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes.includes(node.name);

      return (
        <li key={node.name}>
          <div className="tree-node" onClick={() => handleToggle(node.name)}>
            {node.children && (
              <span className={`tree-node-icon ${isExpanded ? 'expand' : ''}`}>
                &gt;
              </span>
            )}
            <span className="tree-node-label">{node.name}</span>
          </div>
          <ul className={isExpanded ? 'expand' : 'collapse'}>
            {node.children && renderNodes(node.children)}
          </ul>
        </li>
      );
    });
  };

  return <ul>{renderNodes(nodes)}</ul>;
};

export default TreeView;
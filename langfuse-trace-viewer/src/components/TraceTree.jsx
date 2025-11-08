import React from 'react';
import ObservationNode from './ObservationNode';
import './TraceTree.css';

const TraceTree = ({ observations, onSelectNode, selectedNodeId }) => {
  const renderObservation = (observation, level = 0) => {
    return (
      <div key={observation.id} className="observation-wrapper">
        <ObservationNode
          observation={observation}
          level={level}
          onSelect={onSelectNode}
          isSelected={selectedNodeId === observation.id}
        />
        {observation.children && observation.children.length > 0 && (
          <div className="children-container">
            {observation.children.map((child) => renderObservation(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="trace-tree">
      {observations.map((observation) => renderObservation(observation))}
    </div>
  );
};

export default TraceTree;

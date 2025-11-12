import React, { useState } from 'react';
import TraceHeader from './TraceHeader';
import TraceTree from './TraceTree';
import DetailPanel from './DetailPanel';
import './TraceDetailView.css';

const TraceDetailView = ({ traceData }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="trace-detail-view">
      <TraceHeader trace={traceData} />

      <div className="trace-content">
        <div className="trace-tree-section">
          <h2 className="section-title">Trace Timeline</h2>
          <TraceTree
            observations={traceData.observations}
            onSelectNode={setSelectedNode}
            selectedNodeId={selectedNode?.id}
          />
        </div>

        <div className="detail-panel-section">
          <DetailPanel node={selectedNode} />
        </div>
      </div>
    </div>
  );
};

export default TraceDetailView;

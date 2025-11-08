import React, { useState } from 'react';
import { Info, Database, Settings, Code, BarChart3 } from 'lucide-react';
import './DetailPanel.css';

const DetailPanel = ({ node }) => {
  const [activeTab, setActiveTab] = useState('input');

  if (!node) {
    return (
      <div className="detail-panel-empty">
        <Info size={48} />
        <h3>No Selection</h3>
        <p>Select a node from the trace timeline to view details</p>
      </div>
    );
  }

  const tabs = [
    { id: 'input', label: 'Input', icon: <Database size={14} /> },
    { id: 'output', label: 'Output', icon: <Code size={14} /> },
    { id: 'metadata', label: 'Metadata', icon: <Settings size={14} /> },
  ];

  if (node.usage || node.cost) {
    tabs.push({ id: 'usage', label: 'Usage', icon: <BarChart3 size={14} /> });
  }

  const renderJSON = (data) => {
    if (!data) return <div className="empty-data">No data available</div>;

    return (
      <pre className="json-display">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  const renderUsage = () => {
    if (!node.usage && !node.cost && !node.latency) {
      return <div className="empty-data">No usage data available</div>;
    }

    return (
      <div className="usage-panel">
        {node.usage && (
          <div className="usage-section">
            <h4>Token Usage</h4>
            <div className="usage-grid">
              <div className="usage-item">
                <span className="usage-label">Prompt Tokens</span>
                <span className="usage-value">{node.usage.promptTokens.toLocaleString()}</span>
              </div>
              <div className="usage-item">
                <span className="usage-label">Completion Tokens</span>
                <span className="usage-value">{node.usage.completionTokens.toLocaleString()}</span>
              </div>
              <div className="usage-item">
                <span className="usage-label">Total Tokens</span>
                <span className="usage-value total">{node.usage.totalTokens.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {node.cost && (
          <div className="usage-section">
            <h4>Cost</h4>
            <div className="cost-display">${node.cost.toFixed(6)}</div>
          </div>
        )}

        {node.latency && (
          <div className="usage-section">
            <h4>Latency</h4>
            <div className="latency-display">
              {node.latency < 1000 ? `${node.latency}ms` : `${(node.latency / 1000).toFixed(2)}s`}
            </div>
          </div>
        )}

        {node.modelParameters && (
          <div className="usage-section">
            <h4>Model Parameters</h4>
            {renderJSON(node.modelParameters)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="detail-panel">
      <div className="panel-header">
        <h3 className="panel-title">{node.name}</h3>
        <span className="panel-type">{node.type}</span>
      </div>

      <div className="panel-info">
        <div className="info-row">
          <span className="info-label">ID:</span>
          <span className="info-value">{node.id}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Start Time:</span>
          <span className="info-value">
            {new Date(node.startTime).toLocaleString()}
          </span>
        </div>
        {node.endTime && (
          <div className="info-row">
            <span className="info-label">End Time:</span>
            <span className="info-value">
              {new Date(node.endTime).toLocaleString()}
            </span>
          </div>
        )}
        {node.model && (
          <div className="info-row">
            <span className="info-label">Model:</span>
            <span className="info-value model-badge">{node.model}</span>
          </div>
        )}
      </div>

      <div className="panel-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="panel-content">
        {activeTab === 'input' && renderJSON(node.input)}
        {activeTab === 'output' && renderJSON(node.output)}
        {activeTab === 'metadata' && renderJSON(node.metadata)}
        {activeTab === 'usage' && renderUsage()}
      </div>
    </div>
  );
};

export default DetailPanel;

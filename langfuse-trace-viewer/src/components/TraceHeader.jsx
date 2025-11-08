import React from 'react';
import { Clock, DollarSign, Zap, Hash, Tag, User } from 'lucide-react';
import './TraceHeader.css';

const TraceHeader = ({ trace }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCost = (cost) => {
    return `$${cost.toFixed(4)}`;
  };

  const formatLatency = (latency) => {
    if (latency < 1000) return `${latency}ms`;
    return `${(latency / 1000).toFixed(2)}s`;
  };

  return (
    <div className="trace-header">
      <div className="trace-header-main">
        <div className="trace-title-section">
          <h1 className="trace-name">{trace.name}</h1>
          <div className="trace-id">
            <Hash size={14} />
            <span>{trace.id}</span>
          </div>
        </div>

        <div className="trace-tags">
          {trace.tags.map((tag, index) => (
            <span key={index} className="tag">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="trace-metadata">
        <div className="metadata-grid">
          <div className="metadata-item">
            <Clock size={16} />
            <div className="metadata-content">
              <span className="metadata-label">Timestamp</span>
              <span className="metadata-value">{formatTimestamp(trace.timestamp)}</span>
            </div>
          </div>

          <div className="metadata-item">
            <User size={16} />
            <div className="metadata-content">
              <span className="metadata-label">User ID</span>
              <span className="metadata-value">{trace.userId}</span>
            </div>
          </div>

          <div className="metadata-item">
            <Zap size={16} />
            <div className="metadata-content">
              <span className="metadata-label">Latency</span>
              <span className="metadata-value">{formatLatency(trace.latency)}</span>
            </div>
          </div>

          <div className="metadata-item">
            <DollarSign size={16} />
            <div className="metadata-content">
              <span className="metadata-label">Total Cost</span>
              <span className="metadata-value">{formatCost(trace.totalCost)}</span>
            </div>
          </div>

          <div className="metadata-item">
            <Hash size={16} />
            <div className="metadata-content">
              <span className="metadata-label">Total Tokens</span>
              <span className="metadata-value">{trace.totalTokens.toLocaleString()}</span>
            </div>
          </div>

          <div className="metadata-item">
            <div className="metadata-content">
              <span className="metadata-label">Version</span>
              <span className="metadata-value version-badge">{trace.version}</span>
            </div>
          </div>
        </div>
      </div>

      {trace.scores && trace.scores.length > 0 && (
        <div className="trace-scores">
          <h3 className="scores-title">Scores</h3>
          <div className="scores-grid">
            {trace.scores.map((score) => (
              <div key={score.id} className="score-item">
                <span className="score-name">{score.name}</span>
                <span className="score-value">{(score.value * 100).toFixed(0)}%</span>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${score.value * 100}%` }}
                  ></div>
                </div>
                {score.source && (
                  <span className="score-source">{score.source}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TraceHeader;

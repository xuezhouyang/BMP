import React from 'react';
import { ChevronRight, Cpu, Sparkles, Calendar, Clock } from 'lucide-react';
import './ObservationNode.css';

const ObservationNode = ({ observation, level, onSelect, isSelected }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'generation':
        return <Sparkles size={16} />;
      case 'span':
        return <Cpu size={16} />;
      case 'event':
        return <Calendar size={16} />;
      default:
        return <ChevronRight size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'generation':
        return '#7950f2';
      case 'span':
        return '#1971c2';
      case 'event':
        return '#f59f00';
      default:
        return '#868e96';
    }
  };

  const formatDuration = (startTime, endTime) => {
    if (!endTime) return 'In progress...';
    const duration = new Date(endTime) - new Date(startTime);
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  return (
    <div
      className={`observation-node ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(observation)}
      style={{ '--level': level }}
    >
      <div className="node-header">
        <div className="node-icon" style={{ backgroundColor: getTypeColor(observation.type) }}>
          {getTypeIcon(observation.type)}
        </div>

        <div className="node-content">
          <div className="node-title">
            <span className="node-name">{observation.name}</span>
            <span className="node-type" style={{ color: getTypeColor(observation.type) }}>
              {observation.type}
            </span>
          </div>

          <div className="node-metadata">
            <span className="node-time">
              <Clock size={12} />
              {formatTime(observation.startTime)}
            </span>
            {observation.endTime && (
              <span className="node-duration">
                {formatDuration(observation.startTime, observation.endTime)}
              </span>
            )}
            {observation.model && (
              <span className="node-model">{observation.model}</span>
            )}
            {observation.usage && (
              <span className="node-tokens">
                {observation.usage.totalTokens.toLocaleString()} tokens
              </span>
            )}
            {observation.cost && (
              <span className="node-cost">${observation.cost.toFixed(4)}</span>
            )}
          </div>
        </div>

        {observation.statusMessage && (
          <span className={`status-badge status-${observation.statusMessage.toLowerCase()}`}>
            {observation.statusMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default ObservationNode;

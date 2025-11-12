import React from 'react';
import TraceDetailView from './components/TraceDetailView';
import mockTraceData from './data/mockTraceData.json';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Langfuse Trace Viewer</h1>
          <p className="app-subtitle">A React recreation of Langfuse trace detail page</p>
        </div>
      </header>

      <main className="app-main">
        <TraceDetailView traceData={mockTraceData} />
      </main>
    </div>
  );
}

export default App;

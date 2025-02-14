import React from 'react';
import Home from './pages/Home';

const App: React.FC = () => (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold my-4">News Aggregator</h1>
    <Home />
  </div>
);

export default App;

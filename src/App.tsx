import React from 'react';
import './App.css';
import DatingAppDebug from './datingappdebug';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <DatingAppDebug />
      </header>
    </div>
  );
}

export default App;

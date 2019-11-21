import React, { useState } from 'react';
import './App.css';
import Layout from './components/layouts/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Home from './features/home/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Layout signOut={signOut}>
          <Dashboard />
        </Layout>
      ) : (
        <Home authenticateUser={authenticateUser} />
      )}
    </div>
  );
}

export default App;

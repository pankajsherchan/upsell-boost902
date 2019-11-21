import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import Performance from './performance/Performance';
import Posts from './post/pages/Posts';
import Revenue from './revenue/Revenue';
import MainNavigation from './shared/components/navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>

        <Route path="/revenue" exact>
          <Revenue />
        </Route>

        <Route path="/performance" exact>
          <Performance />
        </Route>

        <Route path="/posts" exact>
          <Posts />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

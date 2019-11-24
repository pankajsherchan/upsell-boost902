import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Comparison from './comparison/Comparison';
import Dashboard from './dashboard/Dashboard';
import SignUp from './features/authentication/signup/SignUp';
import Performance from './performance/Performance';
import Posts from './post/pages/Posts';
import RevenueSummary from './revenue-summary/RevenueSummary';
import MainNavigation from './shared/components/navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>

        <Route path="/revenue-summary" exact>
          <RevenueSummary />
        </Route>

        <Route path="/comparison" exact>
          <Comparison />
        </Route>

        <Route path="/performance" exact>
          <Performance />
        </Route>

        <Route path="/posts" exact>
          <Posts />
        </Route>

        <Route path="/signup" exact>
          <SignUp />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

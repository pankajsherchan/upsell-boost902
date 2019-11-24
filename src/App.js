import { blue, indigo } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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

const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[700] },
    secondary: {
      main: blue[900]
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    fontFamily: ['"Lato"', 'sans-serif'].join(',')
  }
});

console.log(theme);

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
};

export default App;

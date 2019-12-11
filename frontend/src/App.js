import { blue, indigo, orange } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Comparison from './comparison/Comparison';
import AuthContext from './context/auth-context';
import Dashboard from './dashboard/Dashboard';
import SignIn from './features/authentication/signin/SignIn';
import SignUp from './features/authentication/signup/SignUp';
import Performance from './performance/Performance';
import Posts from './post/pages/Posts';
import RevenueSummary from './revenue-summary/RevenueSummary';
import MainNavigation from './shared/components/navigation/MainNavigation';
import ColorPalette from './shared/utils/ColorPalette';

console.log('AuthContext: ', AuthContext);
const theme = createMuiTheme({
  palette: {
    primary: { main: blue[900] },
    secondary: {
      main: indigo[700]
    },
    orange: {
      main: orange
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
    h6: {
      fontWeight: 'bold'
    }
  }
});

export { theme };

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          user: user,
          setUser: setUser
        }}
      >
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

              <Route path="/signin" exact>
                <SignIn />
              </Route>

              <Route path="/color" exact>
                <ColorPalette />
              </Route>

              <Redirect to="/" />
            </Switch>
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;

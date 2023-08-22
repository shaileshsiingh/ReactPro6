import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext, { AuthContextProvider } from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <Router>
        <Layout>
          <Switch>
            <Route path='/' exact component={HomePage} />
            {!authCtx.isLoggedIn && <Route path='/auth' component={AuthPage} />}
            <Route path='/profile'>
              {authCtx.isLoggedIn ? <UserProfile /> : <Redirect to='/auth' />}
            </Route>
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

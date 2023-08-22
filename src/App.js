import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext, { AuthContextProvider } from './store/auth-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
let authCtx = useContext(AuthContext)

  return (
    <AuthContextProvider>
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={HomePage} />
          {!authCtx.isLoggedIn && <Route path='/auth' component={AuthPage} />}
          <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to = '/auth' />}
          </Route>
          <Route path ='*'/>
          <Redirect to='/'/>
        </Switch>
      </Layout>
    </Router>
    </AuthContextProvider>
  );
}

export default App;

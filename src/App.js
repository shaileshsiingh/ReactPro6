import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/auth' component={AuthPage} />
          <Route path='/profile' component={UserProfile} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
}from "@apollo/client";
import {setContext} from '@apollo/client/link/context';
import Auth from './utils/auth';

const HttpLink = createHttpLink ({
  uri: '/graphql',
}),

const authLink = setContext((_, {Headers}) => {
  const token= Auth.getToken();

  return {
    headers: {
      ...headers,
      authorizations: token? `Bearer ${token}` : "",

    }
  }
}),

const client = new ApolloClient ({
  // 'http://localhost3001/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;

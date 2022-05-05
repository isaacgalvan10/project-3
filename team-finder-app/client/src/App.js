import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/Header';
import Homepage from './pages/results/Homepage'
import SearchResults from './pages/results/SearchResults';
import Project from './pages/projects/Project';
import MyProject from './pages/projects/MyProject';
import Profile from './pages/profiles/Profile';
import MyProfile from './pages/profiles/MyProfile';
import Footer from './components/Footer';
// import Signup from './components/Signup';
// import Login from './components/Login';
import { NotifProvider } from './utils/GlobalState';


const httpLink = createHttpLink({
  uri: 'graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <NotifProvider>
          <Header />
          <Routes>
            <Route
              path='/'
              element={<Homepage />}
            />
            <Route
              path='/searchResults'
              element={<SearchResults />}
            />
            <Route
              path='/project'
              element={<Project />}
            />
            <Route
              path='/myProject'
              element={<MyProject />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/myProfile'
              element={<MyProfile />}
            />
          </Routes>
          {/* <Signup />
          <Login /> */}
          <Footer />
          </NotifProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import BookList from './components/BookList';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="heading">
            <Link style={{textDecoration:"none"}} to="/">Library Management System</Link>
          </div>
          <Container>
            <Route exact path="/" component={ BookList }/>
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

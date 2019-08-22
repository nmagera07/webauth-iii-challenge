import React from '../node_modules/react';
import SignUp from './components/signUp'
import Employees from './components/employees'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <div className="main-body">
      <Router>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={SignUp} />
        <PrivateRoute path="/employees" component={Employees} />
      </Router>
      </div>
    </div>
  );
}

export default App;

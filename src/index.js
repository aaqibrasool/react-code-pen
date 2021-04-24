import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataProvider from './context/DataContext';
import {BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <AuthProvider>
  <DataProvider>
    <Router>
      <App />
    </Router>
  </DataProvider>
  </AuthProvider>,
  document.getElementById('root')
);
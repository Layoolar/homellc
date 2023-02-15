import React, {FC} from 'react';
import { BrowserRouter, Route, RouteProps, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';

function App(): JSX.Element {
  return (
    <div>
       <BrowserRouter>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Directory from './pages/Directory';
import Profile from './pages/Profile';
import Database from './pages/Database';
import Reviews from './pages/Reviews';
import './index.css';

function App(){
  return (<BrowserRouter>
    <nav style={{padding:10, background:'#eef'}}>
      <Link to="/">Login</Link> | <Link to="/directory">Directory</Link> | 
      <Link to="/profile">Profile</Link> | <Link to="/database">Database</Link> | 
      <Link to="/reviews">Reviews</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/directory" element={<Directory/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/database" element={<Database/>}/>
      <Route path="/reviews" element={<Reviews/>}/>
    </Routes>
  </BrowserRouter>)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

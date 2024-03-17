import React from 'react';
import logo from '../logo.png';
import '../css/Header.css';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className="header">
      <Link className="logo link" to="/" >Home</Link>
      <Link to="/create" className='link'>Create Employee</Link>
    </div>
  );
}

export default Header;


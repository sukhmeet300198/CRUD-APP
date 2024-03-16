import React from 'react';
import logo from '../logo.png';
import '../css/Header.css';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className="header">
      <img src={logo} alt="Company Logo" className="logo" />
      <Link to="/" className='link'>Home</Link>
      <Link to="/create" className='link'>Create Employee</Link>
    </div>
  );
}

export default Header;


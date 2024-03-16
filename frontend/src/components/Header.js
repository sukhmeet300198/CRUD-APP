import React, { useState } from 'react';
import logo from '../logo.png';
import '../css/Header.css';
import EmployeeCreate from './EmployeeCreate';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="header">
      <img src={logo} alt="Company Logo" className="logo" />
      <div className="header-buttons">
        <button onClick={toggleModal}>Create Employee</button>
        {/* <button>Search Employee</button> */}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
            <EmployeeCreate onCreateSuccess={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;


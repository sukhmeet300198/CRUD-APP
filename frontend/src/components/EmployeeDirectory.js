import React, { useEffect } from 'react';
import '../css/EmployeeDirectory.css';
import EmployeeTable from './EmployeeTable';
import Header from './Header';


function EmployeeDirectory() {
  
  return (
    <div className="employee-directory-container">
      <Header />
      <EmployeeTable />
    </div>
  );
}

export default EmployeeDirectory;

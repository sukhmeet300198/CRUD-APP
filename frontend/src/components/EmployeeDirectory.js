import React, { useEffect } from 'react';
import '../css/EmployeeDirectory.css';
import EmployeeTable from './EmployeeTable';


function EmployeeDirectory() {
  
  return (
    <div className="employee-directory-container">
      <EmployeeTable />
    </div>
  );
}

export default EmployeeDirectory;

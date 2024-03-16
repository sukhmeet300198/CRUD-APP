import React from 'react';
import { useParams } from 'react-router-dom'; 
import EmployeeUpdateForm from './EmployeeUpdateForm';

function EmployeeUpdate() {
    const { employeeId } = useParams();

  return (
    <div>
      <h2>Update Employee</h2>
      <EmployeeUpdateForm employeeId={employeeId} />
    </div>
  );
}

export default EmployeeUpdate

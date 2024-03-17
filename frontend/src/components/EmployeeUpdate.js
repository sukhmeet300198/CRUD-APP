import React from 'react';
import { useParams } from 'react-router-dom'; 
import EmployeeUpdateForm from './EmployeeUpdateForm';
import "../css/EmployeeUpdate.css"

function EmployeeUpdate() {
    const { employeeId } = useParams();

  return (
    <div>
      <h2 className='update'>Update Employee</h2>
      <EmployeeUpdateForm employeeId={employeeId} />
    </div>
  );
}

export default EmployeeUpdate

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import EmployeeTable from './EmployeeTable';


function EmployeeDirectory() {
  
  return (
    <Container className="p-3">
      <EmployeeTable />
    </Container>
  );
}

export default EmployeeDirectory;

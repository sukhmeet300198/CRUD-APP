import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_EMPLOYEE_BY_ID } from '../queries';
import "../css/EmployeeDetail.css";
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap'
const { parseISO, format } = require('date-fns');

function EmployeeDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data?.employee;
  console.log("Emp Detail--------->",employee);

  const { years, months, days } = employee.retirementDetails || { years: 0, months: 0, days: 0 };  // Fallback to zeros

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className='center-text'>Employee Detail</h2>
          {employee ? (
            <>
              <Table striped bordered hover style={{ width: '60%', margin: '0 auto' }}>
                <tbody>
                  <tr><th>First Name</th><td>{employee.firstName}</td></tr>
                  <tr><th>Last Name</th><td>{employee?.lastName}</td></tr>
                  <tr><th>Title</th><td>{employee.title}</td></tr>
                  <tr><th>Department</th><td>{employee.department}</td></tr>
                  <tr><th>Type</th><td>{employee.employeeType}</td></tr>
                  <tr><th>Status</th><td>{employee.currentStatus ? 'Active' : 'Inactive'}</td></tr>
                  <tr><th>Age</th><td>{employee.age}</td></tr>
                  <tr><th>Date of Birth</th><td>{format(parseISO(employee?.dateOfBirth), 'dd-MMM-yyyy')}</td></tr>
                  <tr><th>Date of Joining</th><td>{format(parseISO(employee?.dateOfJoining), 'dd-MMM-yyyy')}</td></tr>
                  <tr><th>Retirement Date</th><td>{format(parseISO(employee?.retirementDate), 'dd-MMM-yyyy')}</td></tr>
                  <tr><th>Retirement</th><td>Retirement in: {years} years, {months} months, and {days} days</td></tr>
                </tbody>
              </Table>
              <div className="d-grid gap-2">
                <Button variant="primary" as={Link} to="/" className="full-width-button">Back to Home</Button>
              </div>
            </>
          ) : (
            <Alert variant="secondary">Employee not found.</Alert>
          )}
        </Col>
      </Row>
    </Container>

  );
}

export default EmployeeDetail;

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../queries.js';
import EmployeeFilters from './EmployeeFilters.js';
import { Link, useParams } from 'react-router-dom';
import EmployeeDelete from './EmployeeDelete.js';
import "../css/EmployeeTable.css"
import { Table, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function EmployeeTable() {
  let { type } = useParams() || "";
  let employeeType = type && type !== undefined ? type : '';

  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES, {
    variables: { type: employeeType || '' },
  });

  if (loading) return <Alert variant="info">Loading...</Alert>;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  const employeesToShow = employeeType ? data.allEmployees.filter(employee => employee.employeeType === employeeType) : data.allEmployees;

  return (
    <Container>
      <Row>
        <Col>
          <EmployeeFilters />
          {employeesToShow.length > 0 ? (
            <>
              <h1>EMPLOYEES LIST</h1>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Employee Type</th>
                    <th>Current Status</th>
                    {/* <th>RETIREMENT </th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesToShow.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.title}</td>
                      <td>{employee.department}</td>
                      <td>{employee.employeeType}</td>
                      <td>{employee.currentStatus || '0'}</td>
                      {/* <td>Retirement in: {employee.retirementDetails.years} years, {employee.retirementDetails.months} months, and {employee.retirementDetails.days} days</td> */}
                      <td>
                        <Button variant="primary" className="custom-btn me-2" as={Link} to={`/employeesDetail/${employee.id}`}>View</Button>
                        <Button variant="primary" className="custom-btn me-2" as={Link} to={`/employees/update/${employee.id}`}>Update</Button>
                        <EmployeeDelete
                          className="custom-del-btn "
                          employeeId={employee.id}
                          currentStatus={employee.currentStatus}
                          onDeleted={() => console.log('Employee deleted')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <Alert variant="secondary">No employees to display.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeTable;

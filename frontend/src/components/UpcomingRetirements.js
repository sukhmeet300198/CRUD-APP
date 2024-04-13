import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_RETIREMENTS } from '../queries';
import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
const { parseISO, addYears } = require('date-fns');

function UpcomingRetirements({ employeeType }) {
  const { data, loading, error } = useQuery(GET_UPCOMING_RETIREMENTS, {
    variables: { withinMonths: 6, employeeType },
  });

  if (loading) return <Alert variant="info">Loading...</Alert>;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="center-text">Upcoming Retirements</h2>
          {data.upcomingRetirements && data.upcomingRetirements.length > 0 ? (
            <Table striped bordered hover style={{ width: '60%', margin: '0 auto' }}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Joining</th>
                  <th>Retirement Date</th>
                  <th>Employee Type</th>
                </tr>
              </thead>
              <tbody>
                {data.upcomingRetirements.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{new Date(emp.dateOfJoining).toLocaleDateString()}</td>
                    <td>{new Date(new Date(emp.dateOfJoining).setFullYear(new Date(emp.dateOfJoining).getFullYear() + 65)).toLocaleDateString()}</td>
                    <td>{emp.employeeType}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="secondary">No employee in retirement list.</Alert>
          )}
        </Col>
      </Row>
    </Container>

  );
}

export default UpcomingRetirements;

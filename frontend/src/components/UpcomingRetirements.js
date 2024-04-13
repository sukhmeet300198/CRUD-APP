import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_RETIREMENTS } from '../queries';
import { Table, Alert } from 'react-bootstrap';
const { parseISO, addYears } = require('date-fns');

function UpcomingRetirements({ employeeType }) {
  const { data, loading, error } = useQuery(GET_UPCOMING_RETIREMENTS, {
    variables: { withinMonths: 6, employeeType },
  });

  if (loading) return <Alert variant="info">Loading...</Alert>;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <>
      {
        data.upcomingRetirements != null ?
          <Table striped bordered hover>
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
                  <td>{new Date(addYears(parseISO(emp.dateOfJoining), 65)).toLocaleDateString()}</td>
                  <td>{emp.employeeType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          : "NO EMPLOYEE IN RETIREMENT LIST"
      }
    </>

  );
}

export default UpcomingRetirements;

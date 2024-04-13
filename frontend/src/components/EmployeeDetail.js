import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_EMPLOYEE_BY_ID } from '../queries';
import "../css/EmployeeDetail.css";

function EmployeeDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data?.employee;

  const { years, months, days } = employee.retirementDetails || { years: 0, months: 0, days: 0 };  // Fallback to zeros

  return (
    <div className="employee-detail">
      <h2>Employee Detail</h2>
      {employee ? (<>
        <table>
          <tbody>
            <tr><th>Name</th><td>{employee.firstName} {employee.lastName}</td></tr>
            <tr><th>Age</th><td>{employee.age}</td></tr>
            <tr><th>Date of Joining</th><td>{employee.dateOfJoining}</td></tr>
            <tr><th>Title</th><td>{employee.title}</td></tr>
            <tr><th>Department</th><td>{employee.department}</td></tr>
            <tr><th>Type</th><td>{employee.employeeType}</td></tr>
            <tr><th>Status</th><td>{employee.currentStatus ? 'Active' : 'Inactive'}</td></tr>
            <tr><th>Retirement</th><td>Retirement in: {years} years, {months} months, and {days} days</td></tr>
          </tbody>
        </table>
        <div className="button-container">
          <Link to="/" className="back-to-home-btn">BACK TO HOME</Link>
        </div>
      </>
      ) : (
        <p>Employee not found.</p>
      )}
    </div>
  );
}

export default EmployeeDetail;

// EmployeeDetail.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_EMPLOYEE_BY_ID } from '../queries';
import "../css/EmployeeDetail.css"



function EmployeeDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data?.employee;

  return (
      <div className="employee-detail">
      <h2>Employee Detail</h2>
      {employee ? (
        <div>
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>Date of Joining:</strong> {/*format(new Date(employee.dateOfJoining), 'PPP')*/employee.dateOfJoining}</p>
          <p><strong>Title:</strong> {employee.title}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Type:</strong> {employee.employeeType}</p>
          <p><strong>Status:</strong> {employee.currentStatus ? 'Active' : 'Inactive'}</p>
          <Link to="/">BACK TO HOME</Link>
        </div>
      ) : (
        <p>Employee not found.</p>
      )}
    </div>
  );
}

export default EmployeeDetail;

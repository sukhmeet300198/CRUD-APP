// EmployeeDetail.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_EMPLOYEE_BY_ID } from '../queries';



function EmployeeDetail() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data?.employee;

  return (
    <div>
      <h2>Employee Detail</h2>
      {employee ? (
        <div>
          <p>ID: {employee.id}</p>
          <p>Name: {employee.firstName} {employee.lastName}</p>
          <p>Age: {employee.age}</p>
          <p>Date of Joining: {employee.dateOfJoining}</p>
          <p>Title: {employee.title}</p>
          <p>Department: {employee.department}</p>
          <p>Type: {employee.employeeType}</p>
          <p>Status: {employee.currentStatus ? 'Active' : 'Inactive'}</p>
        </div>
      ) : (
        <p>Employee not found.</p>
      )}
    </div>
  );
}

export default EmployeeDetail;

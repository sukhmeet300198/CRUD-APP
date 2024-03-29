import React from 'react';
import '../css/EmployeeTable.css'
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from '../queries.js';
import EmployeeFilters from './EmployeeFilters.js';
import { Link, useParams } from 'react-router-dom';
import EmployeeDelete from './EmployeeDelete.js';

function EmployeeTable() {
  let { type } = useParams() || "";
  let employeeType = type && type != undefined ? type : '';
  console.log("emp type ---->", type)

  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES, {
    variables: { type: employeeType || '' },
  });
  console.log("emp list data--->", data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

   // Filtering employees by type if needed
   const employeesToShow = employeeType ? data.allEmployees.filter(employee => employee.employeeType === employeeType) : data.allEmployees;
console.log("+++++++0",Object.keys(data.allEmployees) )
  return (
    <>
      <EmployeeFilters />
      {employeesToShow.length > 0 ?  <>
        <h1>EMPLOYEES LIST</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              {/* <th>Age</th>
              <th>Date of Joining</th> */}
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.allEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee?.firstName}</td>
                <td>{employee?.lastName}</td>
                {/* <td>{employee?.age}</td>
                <td>{new Date(employee?.dateOfJoining).toLocaleDateString()}</td> */}
                <td>{employee?.title}</td>
                <td>{employee?.department}</td>
                <td>{employee?.employeeType}</td>
                <td>{employee?.currentStatus || '0'}</td>
                <td><Link className="action-links" to={`/employeesDetail/${employee.id}`}>View</Link>{" "}<Link className="action-links" to={`/employees/update/${employee.id}`}>Update</Link><EmployeeDelete employeeId={employee.id} onDeleted={() => console.log('Employee deleted')} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>

        : <div className='enterEmp'><h2>ENTER NEW EMPLOYEES IN TABLE</h2></div>
      }
    </>

  );
}

export default EmployeeTable;

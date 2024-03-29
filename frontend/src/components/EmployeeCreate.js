import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../css/EmployeeCreate.css';
import { CREATE_EMPLOYEE_MUTATION, GET_ALL_EMPLOYEES } from '../queries.js';
import { useNavigate } from 'react-router-dom'

function EmployeeCreate(props) {

  const navigate = useNavigate(); // Initialize useNavigate
  const [createEmployee, { data, loading, error }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
    update(cache, { data: { createEmployee } }) {
      const existingEmployees = cache.readQuery({
        query: GET_ALL_EMPLOYEES,
        variables: { type: '' }, // Ensure this matches how you query 'allEmployees' elsewhere
      });

      if (existingEmployees && createEmployee) {
        cache.writeQuery({
          query: GET_ALL_EMPLOYEES,
          variables: { type: '' }, // Consistent with the readQuery above
          data: {
            allEmployees: [...existingEmployees.allEmployees, createEmployee],
          },
        });
      }
    },
    onCompleted: () => {
      navigate('/');
    }
  });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };
    let message = value.trim() ? "" : `${name} field is required.`;


    if (value.trim() && (name === 'firstName' || name === 'lastName')) {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        message = "Only letters and spaces are allowed.";
      }
    }
    if (value.trim() && (name == 'age')) {
      const ageRegex = /^\d+$/;
      if (value.trim() && !ageRegex.test(value)) {
        message = "Age must be a number.";
      } else if (value.trim() && (parseInt(value) < 20 || parseInt(value) > 60)) {
        message = "Age must be between 20 and 60.";
      }
    }

    tempErrors[name] = message;
    setErrors(tempErrors);
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.firstName = formData?.firstName ? "" : "First Name is required.";
    tempErrors.lastName = formData?.lastName ? "" : "Last Name is required.";
    tempErrors.age = formData?.age >= 20 && formData.age <= 70 ? "" : "Age must be between 20 and 70.";
    tempErrors.dateOfJoining = formData?.dateOfJoining ? "" : "Date of Joining is required";
    tempErrors.title = formData?.title ? "" : "Title is required";
    tempErrors.department = formData?.department ? "" : "Department is required";
    tempErrors.employeeType = formData?.employeeType ? "" : "EmployeeType is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const ageInt = parseInt(formData.age, 10); // Parse age to integer
      createEmployee({ variables: { ...formData, age: ageInt } })
        .then(response => {
          console.log('Employee created:', response.data.createEmployee);
        })
        .catch(error => {
          console.error('Error creating employee:', error);
        });
    }

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  return (
    <div className='employee-create-modal'>
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit} className="employee-create-form">
        <input name="firstName" type="text" placeholder="First Name" onChange={handleInputChange} onBlur={handleBlur} />
        <div className='error-message'>{errors.firstName}</div>

        <input name="lastName" type="text" placeholder="Last Name" onChange={handleInputChange} onBlur={handleBlur} />
        <div className='error-message'>{errors.lastName}</div>

        <input name="age" type="number" placeholder="Age" onChange={handleInputChange} onBlur={handleBlur} />
        <div className='error-message'>{errors.age}</div>

        <input name="dateOfJoining" type="date" onChange={handleInputChange} onBlur={handleBlur} />
        <div className='error-message'>{errors.dateOfJoining}</div>

        <select name="title" onChange={handleInputChange} onBlur={handleBlur}>
          <option value="none" selected disabled hidden>Select Type of Employee</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
        </select>
        <div className='error-message'>{errors.title}</div>

        <select name="department" onChange={handleInputChange} onBlur={handleBlur}>
          <option value="none" selected disabled hidden>Select Department of Employee</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
        </select>
        <div className='error-message'>{errors.department}</div>

        <select name="employeeType" onChange={handleInputChange} onBlur={handleBlur}>
          <option value="none" selected disabled hidden>Select Employee Type</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
        <div className='error-message'>{errors.employeeType}</div>

        <button type="submit">Create Employee</button>
      </form>
    </div>

  );
}





export default EmployeeCreate;
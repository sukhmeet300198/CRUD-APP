import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CREATE_EMPLOYEE_MUTATION, GET_ALL_EMPLOYEES } from '../queries.js';
import { useNavigate } from 'react-router-dom';
import { differenceInYears, parseISO } from 'date-fns';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

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
    // age: '',
    dateOfBirth: '',
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
    if (value.trim() && (name == 'dateOfBirth')) {
      const age = differenceInYears(new Date(), parseISO(formData.dateOfBirth));
      if ((parseInt(age) < 20 || parseInt(age) > 70)) {
        message = "Age must be between 20 and 70.";
      }
    }

    tempErrors[name] = message;
    setErrors(tempErrors);
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.firstName = formData?.firstName ? "" : "First Name is required.";
    tempErrors.lastName = formData?.lastName ? "" : "Last Name is required.";
    tempErrors.dateOfJoining = formData?.dateOfJoining ? "" : "Date of Joining is required";
    tempErrors.title = formData?.title ? "" : "Title is required";
    tempErrors.department = formData?.department ? "" : "Department is required";
    tempErrors.employeeType = formData?.employeeType ? "" : "EmployeeType is required";
    const age = differenceInYears(new Date(), parseISO(formData.dateOfBirth));
    tempErrors.dateOfBirth = age >= 20 && age <= 70 ? "":"Age must be between 20 and 70"
    
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const ageInt = parseInt(differenceInYears(new Date(), parseISO(formData.dateOfBirth)), 10); // Parse age to integer
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
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ backgroundColor: 'lightblue', border: '1px solid #007bff', padding: '20px', borderRadius: '5px' }}>
          <h1>Create Employee</h1>
          {error && <Alert variant="danger">{error.message}</Alert>}
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <label>First Name</label>
              <input name="firstName" type="text" placeholder="First Name" onChange={handleInputChange} onBlur={handleBlur} />
              <div className='error-message'>{errors.firstName}</div>

              <label>Last Name</label>
              <input name="lastName" type="text" placeholder="Last Name" onChange={handleInputChange} onBlur={handleBlur} />
              <div className='error-message'>{errors.lastName}</div>

              <label>Date-of-Birth</label>
              <input name="dateOfBirth" type="date" placeholder="Date-of-Birth" value={formData.dateOfBirth} onChange={handleInputChange} onBlur={handleBlur} />
              <div className='error-message'>{errors.dateOfBirth}</div>

              <label>Date-of-Joining</label>
              <input name="dateOfJoining" type="date" onChange={handleInputChange} onBlur={handleBlur} />
              <div className='error-message'>{errors.dateOfJoining}</div>

              <label>Title</label>
              <select name="title" onChange={handleInputChange} onBlur={handleBlur}>
                <option value="none" selected disabled hidden>Select Type of Employee</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
              <div className='error-message'>{errors.title}</div>

              <label>Department</label>
              <select name="department" onChange={handleInputChange} onBlur={handleBlur}>
                <option value="none" selected disabled hidden>Select Department of Employee</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </select>
              <div className='error-message'>{errors.department}</div>

              <label>EmployeeType</label>
              <select name="employeeType" onChange={handleInputChange} onBlur={handleBlur}>
                <option value="none" selected disabled hidden>Select Employee Type</option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </select>
              <div className='error-message'>{errors.employeeType}</div>
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>Create Employee</Button>
              </div>
            </Form.Group >
          </form>
        </Col>
      </Row>
    </Container>

  );
}





export default EmployeeCreate;
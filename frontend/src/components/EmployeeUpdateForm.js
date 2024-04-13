import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE_MUTATION } from '../queries';
import { useNavigate } from 'react-router-dom';
import '../css/EmployeeUpdate.css';

function EmployeeUpdateForm({ employeeId }) {
    const navigate = useNavigate(); // Get the navigate function

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        currentStatus: false,
    });

    // Fetch the employee's current data to populate the form
    const { data: employeeData, loading: employeeLoading, error: employeeError } = useQuery(GET_EMPLOYEE_BY_ID, {
        variables: { id: employeeId },
    });

    const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
        variables: { id: employeeId, ...formData },
        onCompleted: () => {
            navigate('/'); // Navigate back to the homepage or the route where the employee list is displayed
        },
        update: (cache, { data: { updateEmployee } }) => {
            const existingEmployeesData = cache.readQuery({
                query: GET_ALL_EMPLOYEES,
                variables: { type: '' }
            });

            if (existingEmployeesData && existingEmployeesData.allEmployees) {
                // Proceed to update the cache only if it's not null
                cache.writeQuery({
                    query: GET_ALL_EMPLOYEES,
                    variables: { type: '' },
                    data: {
                        allEmployees: existingEmployeesData.allEmployees.map(emp =>
                            emp.id === updateEmployee.id ? updateEmployee : emp
                        ),
                    },
                });
            }
        },
    });

    useEffect(() => {
        if (employeeData && employeeData.employee) {
            setFormData(prevFormData => ({
                ...prevFormData,
                firstName: employeeData.employee.firstName,
                lastName: employeeData.employee.lastName,
                age: employeeData.employee.age,
                dateOfJoining: employeeData.employee.dateOfJoining,
                title: employeeData.employee.title,
                department: employeeData.employee.department,
                currentStatus: (employeeData.employee.currentStatus),
            }));
        }
    }, [employeeData]);

    // const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE_MUTATION);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStatusChange = (e) => {
        const isChecked = e.target.checked; // This will be true or false
        console.log("=============",!!isChecked)
        setFormData({ ...formData, currentStatus: isChecked }); // Convert to boolean explicitly if needed
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee({ variables: { id: employeeId, ...formData } });
            alert('Employee updated successfully!');
        } catch (error) {
            console.error('Error updating employee:', error.message);
            alert('Failed to update employee.');
        }
    };

    if (loading || employeeLoading) return <p>Loading...</p>;
    if (error || employeeError) return <p>Error: {error?.message || employeeError?.message}</p>;

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={formData.firstName} disabled />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={formData.lastName} disabled />
                </div>
                <div>
                    <label>Age:</label>
                    <input type="text" value={formData.age} disabled />
                </div>
                <div>
                    <label>Date of Joining:</label>
                    <input type="date" value={formData.dateOfJoining} disabled />
                </div>
                <div>
                    <label>Title:</label>
                    <select name="title" value={formData.title} onChange={handleSelectChange}>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director</option>
                        <option value="VP">VP</option>
                    </select>
                </div>
                <div>
                    <label>Department:</label>
                    <select name="department" value={formData.department} onChange={handleSelectChange}>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                </div>
                <div className="form-checkbox-group">
                    <label> Current Status</label>
                    <input type="checkbox" name="currentStatus" checked={formData.currentStatus} onChange={handleStatusChange} />
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EmployeeUpdateForm;



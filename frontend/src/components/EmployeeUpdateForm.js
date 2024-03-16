import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE_MUTATION } from '../queries';

function EmployeeUpdateForm({ employeeId }) {
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

    useEffect(() => {
        if (employeeData && employeeData.employee) {
            setFormData({
                ...formData,
                title: employeeData.employee.title,
                department: employeeData.employee.department,
                currentStatus: Boolean(employeeData.employee.currentStatus),
            });
        }
    }, [employeeData]);

    const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE_MUTATION);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStatusChange = (e) => {
        const isChecked = e.target.checked; // This will be true or false
        setFormData({ ...formData, currentStatus: !!isChecked }); // Convert to boolean explicitly if needed
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
            <div>                 <label>Department:</label>
                <select name="department" value={formData.department} onChange={handleSelectChange}>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                </select>
            </div>
            <div>
                <label>
                    <input type="checkbox" name="currentStatus" checked={formData.currentStatus} onChange={handleStatusChange} /> Current Status
                </label>
            </div>
            <button type="submit">Update Employee</button>
        </form>
    );
}

export default EmployeeUpdateForm;



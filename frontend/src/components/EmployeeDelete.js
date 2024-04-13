import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE_MUTATION, GET_ALL_EMPLOYEES } from '../queries';

function EmployeeDelete({ employeeId, currentStatus, onDeleted }) {
    const [deleteEmployee, { loading, error }] = useMutation(DELETE_EMPLOYEE_MUTATION, {
        variables: { id: employeeId },
        update(cache) {
            // Remove the deleted employee from the cache
            cache.modify({
                fields: {
                    allEmployees(existingEmployeeRefs, { readField }) {
                        return existingEmployeeRefs.filter(
                            employeeRef => employeeId !== readField('id', employeeRef)
                        );
                    }
                }
            });
        },
        onCompleted: () => {
            // Callback function to be called after a successful deletion
            if (onDeleted) onDeleted();
        }
    });

    const handleDelete = () => {
        // Check if the employee's current status is active
        if (currentStatus) {
            alert("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
            return;
        }

        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee();
        }
    };

    if (loading) return <p>Deleting...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <button className="custom-del-btn" onClick={handleDelete}>Delete Employee</button>
    );
}

export default EmployeeDelete;


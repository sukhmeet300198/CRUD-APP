import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE_MUTATION, GET_ALL_EMPLOYEES } from '../queries';

function EmployeeDelete({ employeeId, onDeleted }) {
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
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee();
        }
    };

    if (loading) return <p>Deleting...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <button className="action-links action-delete" onClick={handleDelete}>Delete Employee</button>
    );
}

export default EmployeeDelete;


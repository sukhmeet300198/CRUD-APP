// EmployeeFilters.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeFilters() {
  let navigate = useNavigate();

  const handleChange = (event) => {
    const type = event.target.value;
    navigate(type ? `/employees/${type}` : '/');
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">All Employees</option>
        <option value="FullTime">Full Time</option>
        <option value="PartTime">Part Time</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </select>
    </div>
  );
}

export default EmployeeFilters;

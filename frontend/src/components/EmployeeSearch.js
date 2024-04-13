import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

function EmployeeSearch({ onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);  // Immediately lift state up on each keystroke
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search by name, title, or department..."
        onChange={handleSearchChange}
      />
     
    </InputGroup>
  );
}

export default EmployeeSearch;

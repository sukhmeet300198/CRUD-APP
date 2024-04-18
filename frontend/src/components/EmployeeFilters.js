// EmployeeFilters.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';

function EmployeeFilters() {
  let navigate = useNavigate();

  const handleChange = (event) => {
    const type = event.target.value;
    if (type == "Retirement")
      navigate(`/upcoming-retirements`);
    else
      navigate(type ? `/employees/${type}` : '/');
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="employeeFilter">
              <Form.Select aria-label="Employee filter" onChange={handleChange} style={{height: "47px"}}>
                <option value="">All Employees</option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
                <option value="Retirement">Upcomimg Retirement</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeFilters;

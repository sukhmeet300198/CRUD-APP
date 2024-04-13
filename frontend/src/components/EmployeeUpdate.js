import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeUpdateForm from './EmployeeUpdateForm';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../css/EmployeeUpdate.css"

function EmployeeUpdate() {
  const { employeeId } = useParams();

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2>Update Employee</h2>
            </Card.Header>
            <Card.Body>
              <EmployeeUpdateForm employeeId={employeeId} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

export default EmployeeUpdate

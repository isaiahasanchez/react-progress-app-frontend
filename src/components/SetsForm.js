import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const SetsForm = ({ weight, reps, index, handleChange }) => {
    return (
        <Row className="d-flex justify-content-between">
            <Col>
                <Form.Group>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        type='number'
                        name='weight'
                        value={weight}
                        placeholder='Weight'
                        onChange={(e) => handleChange(e, index)}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label>Reps</Form.Label>
                    <Form.Control
                        type='number'
                        name='reps'
                        value={reps}
                        placeholder='Reps'
                        onChange={(e) => handleChange(e, index)}
                    />
                </Form.Group>
            </Col>
        </Row>
    );
};

export default SetsForm;

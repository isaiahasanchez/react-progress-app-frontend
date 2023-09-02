import React from 'react';
import { Form } from 'react-bootstrap';

const SetsForm = ({ weight, reps, sets, handleChange }) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={weight}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Reps</Form.Label>
        <Form.Control
          type="number"
          name="reps"
          value={reps}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sets</Form.Label>
        <Form.Control
          type="number"
          name="sets"
          value={sets}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </div>
  );
};

export default SetsForm;

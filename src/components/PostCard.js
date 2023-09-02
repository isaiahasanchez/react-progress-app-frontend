import React from 'react';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SetsForm from './SetsForm';

const PostCard = ({ post, handleChange, handleSave, handleDelete, toggleEditMode }) => {
  return (
    <Col md={4} className="mb-4">
      <Card style={{ width: '18rem' }}>
        {post.editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Exercise</Form.Label>
              <Form.Control
                type="text"
                name="exercise"
                value={post.exercise}
                onChange={(e) => handleChange(e, post._id, null)}
              />
            </Form.Group>

            {post.sets.map((set, index) => (
              <SetsForm
                key={index}
                weight={set.weight}
                reps={set.reps}
                index={index}
                handleChange={(e) => handleChange(e, post._id, index)}
              />
            ))}

            <Button variant="primary" onClick={() => handleSave(post._id)}>
              Save Changes
            </Button>
          </Form>
        ) : (
          <Card.Body>
            <Card.Title>{post.exercise}</Card.Title>
            <Card.Text>{post.equipment}</Card.Text>
            <Card.Text>Last Edited: {new Date(post.lastDateEdited).toLocaleString()}</Card.Text>
            {post.sets.map((set, index) => (
              <div key={index} className="d-flex">
                <p>{set.weight} lbs x </p>
                <p>{set.reps} reps </p>
              </div>
            ))}
            <Link to={`/posts/${post._id}`}>
              <Button variant='primary' className='mr-2'> Read More</Button>
            </Link>
            <Button variant='danger' onClick={() => handleDelete(post._id)}>Delete</Button>
            <Button variant='secondary' onClick={() => toggleEditMode(post._id)}>Edit</Button>
          </Card.Body>
        )}
      </Card>
    </Col>
  );
};

export default PostCard;

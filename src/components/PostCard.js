// PostCard.js
import React from 'react';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostCard = ({ post, handleChange, handleSave, handleDelete, toggleEditMode }) => {
  return (
    <Col md={4} className="mb-4">
      <Card style={{ width: '18rem' }}>
        <Card.Img
          className="img-fluid"
          variant="top"
          src={post.image}
          alt={post.exercise}
        />
        {post.editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Exercise</Form.Label>
              <Form.Control
                type="text"
                name="exercise"
                value={post.exercise}
                onChange={(e) => handleChange(e, post._id)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sets</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="sets"
                value={post.sets}
                onChange={(e) => handleChange(e, post._id)}
              />
            </Form.Group>
            <Button variant="primary" onClick={() => handleSave(post._id)}>
              Save Changes
            </Button>
          </Form>
        ) : (
          <Card.Body>
            <Card.Title>{post.exercise}</Card.Title>
            <Card.Text>{post.equipment}</Card.Text>
            <Card.Text>Last Edited: {new Date(post.lastDateEdited).toLocaleString()}</Card.Text>
            <Card.Text style={{ whiteSpace: 'pre-line' }}>{post.sets}</Card.Text>
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

import React, { useState } from 'react';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles.css';

const StyledDateSets = ({ sets }) => {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/;
  return sets.split('\n').map((line, index) => (
    <span key={index}>
      {datePattern.test(line) ? (
        <>
          <span style={{ fontWeight: '300' }}>{line.match(datePattern)[0]}</span>{' '}
          {line.replace(datePattern, '').trim()}
        </>
      ) : (
        line
      )}
      <br />
    </span>
  ));
};

const getLastFiveLines = (text) => {
  const lines = text.trim().split('\n');
  return lines.slice(Math.max(lines.length - 5, 0)).join('\n');
};

const PostCard = ({ post, handleSave, handleDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editablePost, setEditablePost] = useState(post);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditablePost(post); // Reset editable post to the current post data when entering edit mode
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePost({ ...editablePost, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent the default behavior of adding a new line
      const currentValue = e.target.value;
      const currentPosition = e.target.selectionStart;

      // Extract the last sets content (excluding the date)
      const lastLine = currentValue.split('\n').pop();
      const lastSetsContent = lastLine.split('--')[1]?.trim() || '';

      // Append new date and last sets content
      const newValue =
        currentValue.slice(0, currentPosition) +
        '\n' +
        new Date().toLocaleDateString() +
        ' -- ' +
        lastSetsContent +
        currentValue.slice(currentPosition);

      setEditablePost({ ...editablePost, sets: newValue });
    }
  };

  const handleSaveChanges = () => {
    handleSave(post._id, editablePost);
    setEditMode(false);
  };

  const renderSets = () => (editMode ? editablePost.sets : getLastFiveLines(editablePost.sets));

  return (
    <Col xs={12} className='mb-4'>
      <Card style={{ backgroundColor: 'rgb(225 226 230)', minWidth: '18rem' }}>
        {editMode ? (
          <Form>
            <Form.Group>
              <Form.Label>Exercise</Form.Label>
              <Form.Control
                type='text'
                name='exercise'
                value={editablePost.exercise}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sets</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                name='sets'
                value={editablePost.sets}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
            <Button variant='secondary' onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Form>
        ) : (
          <Card.Body>
            <Card.Title>{editablePost.exercise}</Card.Title>
            <Card.Text>{editablePost.equipment}</Card.Text>
            <Card.Text>
              Last Edited: {new Date(editablePost.lastDateEdited).toLocaleString()}
            </Card.Text>
            <Card.Subtitle>5 Most Recent Workouts</Card.Subtitle>
            <Card.Text style={{ whiteSpace: 'pre-line' }}>
              <StyledDateSets sets={renderSets()} />
            </Card.Text>
            <Link to={`/posts/${post._id}`}>
              <Button variant='dark' className='mr-2'>
                Full History
              </Button>
            </Link>
            <Button variant='danger' onClick={() => handleDelete(post._id)}>
              Delete
            </Button>
            <Button variant='secondary' onClick={toggleEditMode}>
              Edit to Add a New Workout
            </Button>
          </Card.Body>
        )}
      </Card>
    </Col>
  );
};

export default PostCard;

import React from 'react';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostCard = ({ post, handleChange, handleSave, handleDelete, toggleEditMode }) => {
  // Handle the "Enter" key press event within the Sets textarea
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();  // prevent the default behavior of adding a new line
        const currentValue = e.target.value;
        const currentPosition = e.target.selectionStart;

        // Split the current value by new lines to get each line as an array element.
        const lines = currentValue.split('\n');

        let lastSetsContent = "";
        
        if (lines.length > 0) {
            const parts = lines[lines.length - 1].split('--');
            if (parts.length > 1) {
                lastSetsContent = parts[1].trim();  // taking the sets and reps from the last line
            }
        }

        const newValue = currentValue.slice(0, currentPosition) + 
                         "\n" + 
                         new Date().toLocaleString() + '\u2611 \u2610  -- ' + lastSetsContent +
                         currentValue.slice(currentPosition);
        handleChange({ target: { name: e.target.name, value: newValue } }, post._id);
    }
};


  
  
  

  const renderSetsWithDateStyled = (sets) => {
    if (!sets) return '';
  
    // Regular expression to match date patterns.
    const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/;
  
    return sets.split('\n').map((line, index) => {
      if (datePattern.test(line)) {
        // Extract the date and the set parts.
        const datePart = line.match(datePattern)[0];
        const setPart = line.replace(datePattern, '').trim();
        
        return (
          <span key={index}>
            <span style={{ fontWeight: '300' }}>{datePart}</span> {setPart}
            <br />
          </span>
        );
      } else {
        return (
          <span key={index}>
            {line}
            <br />
          </span>
        );
      }
    });
  }
  
  
  

  return (
    <Col xs={12} className="mb-4">
      <Card style={{ minWidth: '18rem' }}>
        {/* <Card.Img
          className="img-fluid"
          variant="top"
          src={post.image}
          alt={post.exercise}
        /> */}
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
                onKeyPress={handleKeyPress}  // Add the keyPress handler
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
            <Card.Text style={{ whiteSpace: 'pre-line' }}>
              {renderSetsWithDateStyled(post.sets)}
            </Card.Text>
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

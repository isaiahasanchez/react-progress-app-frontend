import React, { useState } from 'react';
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StyledDateSets from './StyledDateSets';

const ExerciseCard = ({ exercise, handleSave, handleDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableExercise, setEditableExercise] = useState(exercise);

  const startNewWorkout = () => {
    const newWorkout = {
      date: new Date().toISOString(),
      set: [{ weight: '', reps: '' }],
    };
    setEditableExercise((prevExercise) => ({
      ...prevExercise,
      workouts: [...prevExercise.workouts, newWorkout],
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditableExercise(exercise); // Set editableExercise to current exercise when entering edit mode
    }
  };

  const handleChange = (e, name) => {
    setEditableExercise({ ...editableExercise, [name]: e.target.value });
  };

  const handleSetChange = (workoutIndex, setIndex, field, value) => {
    const updatedWorkouts = [...editableExercise.workouts];
    const updatedSet = { ...updatedWorkouts[workoutIndex].set[setIndex], [field]: value };
    updatedWorkouts[workoutIndex].set[setIndex] = updatedSet;
    setEditableExercise({ ...editableExercise, workouts: updatedWorkouts });
  };

  const addNewSet = (workoutIndex) => {
    const updatedWorkouts = [...editableExercise.workouts];
    const currentWorkout = updatedWorkouts[workoutIndex];

    // Check if there are any sets in the current workout
    if (currentWorkout.set.length > 0) {
      // Get the last set's weight and reps
      const lastSet = currentWorkout.set[currentWorkout.set.length - 1];
      const newSet = { weight: lastSet.weight, reps: lastSet.reps }; // Use last set's values

      // Add the new set to the current workout
      updatedWorkouts[workoutIndex].set.push(newSet);
    } else {
      // If there are no sets, add a default new set
      updatedWorkouts[workoutIndex].set.push({ weight: '', reps: '' });
    }

    setEditableExercise({ ...editableExercise, workouts: updatedWorkouts });
  };

  const handleSaveChanges = () => {
    handleSave(exercise._id, editableExercise);
    setEditMode(false);
  };

  const getLastFiveWorkouts = (workouts) => {
    // Return the last 5 workouts
    return workouts.slice(-5);
  };

  return (
    <Col xs={12} className='mb-4'>
      <Card style={{ backgroundColor: 'rgb(225 226 230)' }} className='custom-card-width'>
        {editMode ? (
          <Container>
            <Form>
              <Form.Group>
                <Form.Label>Exercise Name</Form.Label>
                <Form.Control
                  type='text'
                  value={editableExercise.exerciseName}
                  onChange={(e) => handleChange(e, 'exerciseName')}
                />
              </Form.Group>

              {editableExercise.workouts.map((workout, workoutIndex) => (
                <div key={workoutIndex}>
                  <Row className='mb-2'>
                    <Col>
                      <strong>Workout Date:</strong> {new Date(workout.date).toLocaleDateString()}
                    </Col>
                  </Row>

                  {workout.set.map((set, setIndex) => (
                    <Row key={setIndex} className='align-items-center mb-3'>
                      <Col xs='auto'>
                        <Form.Label className='mb-0'>
                          <strong>Set {setIndex + 1}</strong>
                        </Form.Label>
                      </Col>
                      <Col xs='auto'>
                        <Form.Control
                          type='number'
                          placeholder='Weight'
                          value={set.weight}
                          onChange={(e) =>
                            handleSetChange(workoutIndex, setIndex, 'weight', e.target.value)
                          }
                        />
                      </Col>
                      <Col xs='auto'>
                        <Form.Label className='mb-0'>lbs</Form.Label>
                      </Col>
                      <Col xs='auto'>
                        <Form.Control
                          type='number'
                          placeholder='Reps'
                          value={set.reps}
                          onChange={(e) =>
                            handleSetChange(workoutIndex, setIndex, 'reps', e.target.value)
                          }
                        />
                      </Col>
                      <Col xs='auto'>
                        <Form.Label className='mb-0'>reps</Form.Label>
                      </Col>
                    </Row>
                  ))}

                  <Button variant='secondary' onClick={() => addNewSet(workoutIndex)}>
                    Add New Set
                  </Button>
                </div>
              ))}
              <Button variant='dark' onClick={startNewWorkout} className='mt-3'>
                Start a New Workout
              </Button>
              <Button variant='primary' onClick={handleSaveChanges} className='mt-3'>
                Save Changes
              </Button>
            </Form>
          </Container>
        ) : (
          <Card.Body>
            <Card.Title>{editableExercise.exerciseName}</Card.Title>
            <Card.Text>{editableExercise.equipment}</Card.Text>
            <Card.Text> {new Date(editableExercise.lastDateEdited).toLocaleTimeString()}</Card.Text>
            <Card.Subtitle>Workouts</Card.Subtitle>
            <StyledDateSets workouts={getLastFiveWorkouts(editableExercise.workouts)} />
            <Link to={`/exercises/${exercise._id}`}>
              <Button variant='dark' className='mr-2' style={{ width: '90px' }}>
                Full Info
              </Button>
            </Link>
            <Button
              variant='danger'
              onClick={() => handleDelete(exercise._id)}
              style={{ width: '80px' }}
            >
              Delete
            </Button>
            <Button variant='secondary' onClick={toggleEditMode} style={{ width: '60px' }}>
              Edit
            </Button>
          </Card.Body>
        )}
      </Card>
    </Col>
  );
};

export default ExerciseCard;

import React, { useState, useRef } from 'react';
import { Card, Button, Form, Container, Col, Row, Alert } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import StyledDateSets from './StyledDateSets';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise, handleSave, handleDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableExercise, setEditableExercise] = useState(exercise);
  const [showWorkoutAdded, setShowWorkoutAdded] = useState(false);
  const cardRef = useRef(null);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditableExercise(exercise); // Sets editableExercise to current exercise when entering edit mode
    }
    // Scroll the card into view after a slight delay to ensure the DOM has updated
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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

  const toLocalDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (workoutIndex, newValue) => {
    let converted = new Date(newValue).toISOString();
    console.log(newValue);
    console.log(converted);
    let updatedWorkouts = [...editableExercise.workouts];
    updatedWorkouts[workoutIndex] = {
      ...updatedWorkouts[workoutIndex],
      date: newValue,
    };

    setEditableExercise({ ...editableExercise, workouts: updatedWorkouts });
  };

  const startNewWorkout = () => {
    // Finds the most recent workout's last set, if any
    let lastSet = { weight: '', reps: '' };
    if (editableExercise.workouts.length > 0) {
      const lastWorkout = editableExercise.workouts[0]; // Grabs the first workout
      if (lastWorkout.set.length > 0) {
        lastSet = lastWorkout.set[lastWorkout.set.length - 1]; // Use the first set of the last workout as it's the most recent
      }
    }

    // Create a new workout with the last set's values or default if none
    const newWorkout = {
      date: new Date().toISOString(),
      set: [{ weight: lastSet.weight, reps: lastSet.reps }],
    };

    setShowWorkoutAdded(true);
    setTimeout(() => setShowWorkoutAdded(false), 1300);

    // Prepend the new workout to the workouts array to maintain descending order
    setEditableExercise((prevExercise) => ({
      ...prevExercise,
      workouts: [newWorkout, ...prevExercise.workouts],
    }));
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

  const handleDeleteWorkout = (workoutIndex) => {
    const userConfirmed = window.confirm(`Are you sure you want to delete this workout?`);
    if (userConfirmed) {
      setEditableExercise((prevExercise) => ({
        ...prevExercise,
        workouts: prevExercise.workouts.filter((_, index) => index !== workoutIndex),
      }));
    }
  };

  const handleDeleteSet = (workoutIndex, setIndex) => {
    setEditableExercise((prevExercise) => {
      const updatedWorkouts = [...prevExercise.workouts];
      const updatedSets = updatedWorkouts[workoutIndex].set.filter(
        (_, index) => index !== setIndex,
      );
      updatedWorkouts[workoutIndex] = { ...updatedWorkouts[workoutIndex], set: updatedSets };
      return { ...prevExercise, workouts: updatedWorkouts };
    });
  };

  const handleSaveChanges = () => {
    handleSave(exercise._id, editableExercise);
    setEditMode(false);

    // Scroll back to the top of the page after saving a edit
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const getLastFiveWorkouts = (workouts) => {
    // Return the last 5 workouts
    return workouts.slice(0, 5);
  };

  return (
    <Col xs={12} className='mb-4'>
      <Card
        ref={cardRef}
        style={{ backgroundColor: 'rgb(225 226 230)' }}
        className='custom-card-width'
      >
        {editMode ? (
          <Container>
            <Form>
              <Form.Group>
                <Form.Label>Exercise Name:</Form.Label>
                <Form.Control
                  type='text'
                  value={editableExercise.exerciseName}
                  onChange={(e) => handleChange(e, 'exerciseName')}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Equipment:</Form.Label>
                <Form.Control
                  type='text'
                  value={editableExercise.equipment}
                  onChange={(e) => handleChange(e, 'equipment')}
                />
              </Form.Group>
              <Button variant='dark' onClick={startNewWorkout} className='mt-3'>
                + Add a New Workout
              </Button>
              <Button variant='primary' onClick={handleSaveChanges} className='mt-3'>
                Save Changes
              </Button>
              <Col
                style={{
                  padding: '0.5rem 0 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'auto',
                }}
              >
                {showWorkoutAdded && (
                  <Alert variant='success'>
                    <BsCheckCircle style={{ color: 'green', marginRight: '10px' }} />
                    Added today's workout
                  </Alert>
                )}
              </Col>

              {editableExercise.workouts.map((workout, workoutIndex) => (
                <div key={workoutIndex} style={{ padding: '0.5rem 0 2rem 0' }}>
                  <Row
                    className=' align-items-center justify-content-start'
                    style={{ padding: '0.5rem 0 0.5rem 0' }}
                  >
                    <Col xs='3' style={{ paddingRight: '0' }}>
                      <Form.Label className='form-dates' style={{ margin: '0' }}>
                        <strong>Workout Date:</strong>
                      </Form.Label>
                    </Col>
                    <Col style={{ padding: '0' }}>
                      <Form.Control
                        className='form-dates-fields'
                        style={{ maxWidth: '10rem' }}
                        type='date'
                        placeholder='Date'
                        value={toLocalDate(editableExercise.workouts[workoutIndex].date)}
                        onChange={(e) => handleDateChange(workoutIndex, e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Button
                        className='form-delete-workout'
                        variant='danger'
                        onClick={() => handleDeleteWorkout(workoutIndex)}
                      >
                        Delete Workout
                      </Button>
                    </Col>
                  </Row>

                  {workout.set.map((set, setIndex) => (
                    <Row key={setIndex} className='align-items-center mb-3'>
                      <Col className='d-flex justify-content-center' xs='auto'>
                        <Form.Label className='mb-0'>
                          <strong>{setIndex + 1}</strong>
                        </Form.Label>
                      </Col>
                      <Col className='form-fields' xs>
                        <Form.Control
                          type='number'
                          placeholder='Weight'
                          value={set.weight}
                          onChange={(e) =>
                            handleSetChange(workoutIndex, setIndex, 'weight', e.target.value)
                          }
                        />
                      </Col>
                      <Col xs='auto' className='d-flex justify-content-center'>
                        <Form.Label className='mb-0 lbs-reps'>lbs</Form.Label>
                      </Col>
                      <Col className='form-fields' xs>
                        <Form.Control
                          type='number'
                          placeholder='Reps'
                          value={set.reps}
                          onChange={(e) =>
                            handleSetChange(workoutIndex, setIndex, 'reps', e.target.value)
                          }
                        />
                      </Col>
                      <Col xs='auto' className='d-flex justify-content-center'>
                        <Form.Label className='mb-0 lbs-reps'>reps</Form.Label>
                      </Col>
                      <Col xs='auto' className='d-flex justify-content-end'>
                        <Button
                          className='form-delete-set'
                          variant='danger'
                          onClick={() => handleDeleteSet(workoutIndex, setIndex)}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Button variant='secondary' onClick={() => addNewSet(workoutIndex)}>
                    Add New Set
                  </Button>
                </div>
              ))}
            </Form>
          </Container>
        ) : (
          <Card.Body>
            <Card.Title>{editableExercise.exerciseName}</Card.Title>
            <Card.Text>
              <strong>Equipment: </strong>
              {editableExercise.equipment}
            </Card.Text>
            <Card.Subtitle>Workouts</Card.Subtitle>
            <StyledDateSets workouts={getLastFiveWorkouts(editableExercise.workouts)} />
            <Row className='d-flex justify-content-start'>
              <Col className='d-flex'>
                <div style={{ paddingRight: '0.5rem' }}>
                  <Link to={`/exercises/${exercise._id}`}>
                    <Button variant='dark' className='mr-3' style={{ width: '6rem' }}>
                      Full Info
                    </Button>
                  </Link>
                </div>
                <div style={{ paddingRight: '0.5rem' }}>
                  <Button
                    variant='secondary'
                    style={{ width: '8rem' }}
                    onClick={() => toggleEditMode(exercise._id)}
                  >
                    Edit
                  </Button>
                </div>
                <Button
                  className='mr-3'
                  variant='danger'
                  onClick={() => handleDelete(exercise._id)}
                  style={{ width: '6rem' }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </Col>
  );
};

export default ExerciseCard;

// ExerciseCard.jsx
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

  const toLocalDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Use UTC components so that "2025-02-15T00:00:00.000Z" becomes "2025-02-15"
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditableExercise(exercise);
    }
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

  const startNewWorkout = () => {
    let lastSet = { weight: '', reps: '' };
    if (editableExercise.workouts.length > 0) {
      const lastWorkout = editableExercise.workouts[0];
      if (lastWorkout.set.length > 0) {
        lastSet = lastWorkout.set[lastWorkout.set.length - 1];
      }
    }

    const today = new Date().toLocaleDateString('en-CA');

    const newWorkout = {
      date: today,
      set: [{ weight: lastSet.weight, reps: lastSet.reps }],
    };

    setShowWorkoutAdded(true);
    setTimeout(() => setShowWorkoutAdded(false), 1300);

    setEditableExercise((prevExercise) => ({
      ...prevExercise,
      workouts: [newWorkout, ...prevExercise.workouts],
    }));
  };

  const handleDateChange = (workoutIndex, newValue) => {
    const updatedWorkouts = [...editableExercise.workouts];
    updatedWorkouts[workoutIndex] = {
      ...updatedWorkouts[workoutIndex],
      date: newValue,
    };
    setEditableExercise({ ...editableExercise, workouts: updatedWorkouts });
  };

  const addNewSet = (workoutIndex) => {
    const updatedWorkouts = [...editableExercise.workouts];
    const currentWorkout = updatedWorkouts[workoutIndex];

    if (currentWorkout.set.length > 0) {
      const lastSet = currentWorkout.set[currentWorkout.set.length - 1];
      const newSet = { weight: lastSet.weight, reps: lastSet.reps };
      updatedWorkouts[workoutIndex].set.push(newSet);
    } else {
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
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const getLastFiveWorkouts = (workouts) => {
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
                + Add New Workout
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
                    className='align-items-center justify-content-start'
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
                        value={toLocalDate(workout.date)}
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
            <Card.Subtitle id='workouts-subtitle'>
              <strong>Workouts</strong>
            </Card.Subtitle>
            <Card.Subtitle>
              <strong>Date:</strong>
            </Card.Subtitle>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import './NewExercisePage.css';
import '../styles.css';
import { createExercise } from '../api/apiService';

const IMAGE_OPTIONS = [
  { label: 'Rows', value: '/images/row.jpeg' },
  { label: 'Bench Press', value: '/images/bench-press.jpeg' },
  { label: 'Push Up', value: '/images/push-up.jpeg' },
  { label: 'Curls', value: '/images/curls.jpeg' },
  { label: 'Deadlift', value: '/images/deadlift.jpeg' },
  { label: 'Lunges', value: '/images/lunges.jpeg' },
  { label: 'Squats', value: '/images/squats.jpeg' },
  { label: 'Pull Up', value: '/images/pull-up.jpeg' },
];

// Helper: Parse a "YYYY-MM-DD" string as a local Date object.
const parseLocalDateString = (dateString) => {
  if (!dateString) return new Date();
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const NewExercisePage = () => {
  // Create initial date as a local date string in "YYYY-MM-DD" format.
  const initialDate = new Date().toLocaleDateString('en-CA');
  const navigate = useNavigate();

  const [exercise, setExercise] = useState({
    exerciseName: '',
    equipment: '',
    image: null,
    editMode: false,
    workouts: [
      {
        date: initialDate, // e.g. "2025-02-15"
        set: [
          {
            weight: 0,
            reps: 10,
          },
        ],
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);

  const { mutate } = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.error('Failed to create exercise:', error);
      setFeedbackMessage('Error creating exercise. Please try again later.');
    },
  });

  useEffect(() => {
    if (scrollTrigger > 0) {
      window.scrollBy(0, 100);
    }
  }, [scrollTrigger]);

  const validateForm = () => {
    const newErrors = {};
    if (!exercise.exerciseName.trim()) {
      newErrors.exerciseName = 'Exercise name is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: null,
      }));
    }
  };

  const handleSetChange = (workoutIndex, setIndex, field, value) => {
    setExercise((prevExercise) => {
      const newWorkouts = [...prevExercise.workouts];
      const updatedSet = { ...newWorkouts[workoutIndex].set[setIndex], [field]: value };
      newWorkouts[workoutIndex].set[setIndex] = updatedSet;
      return { ...prevExercise, workouts: newWorkouts };
    });
  };

  const addNewSet = () => {
    setExercise((prevExercise) => {
      const newWorkouts = [...prevExercise.workouts];
      const lastWorkoutIndex = newWorkouts.length - 1;
      const currentWorkout = newWorkouts[lastWorkoutIndex];

      let newSet = { weight: '', reps: '' };
      if (currentWorkout.set.length > 0) {
        const lastSet = currentWorkout.set[currentWorkout.set.length - 1];
        newSet = { weight: lastSet.weight, reps: lastSet.reps };
      }

      newWorkouts[lastWorkoutIndex] = {
        ...currentWorkout,
        set: [...currentWorkout.set, newSet],
      };

      return { ...prevExercise, workouts: newWorkouts };
    });
    setScrollTrigger((prevTrigger) => prevTrigger + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutate(exercise);
  };

  return (
    <Container className='mt-4'>
      <Card style={{ backgroundColor: 'rgb(225 226 230)', padding: '2rem' }}>
        <div className='text-center'>
          <Card.Title as='h2'>
            Welcome! Please Enter Info Below to Create a New Exercise Category
          </Card.Title>
        </div>
        <Form onSubmit={handleSubmit}>
          {feedbackMessage && (
            <Alert variant='danger' onClose={() => setFeedbackMessage(null)} dismissible>
              {feedbackMessage}
            </Alert>
          )}

          <Form.Group>
            <Form.Label>
              <strong>Exercise</strong>
            </Form.Label>
            <Form.Control
              type='text'
              name='exerciseName'
              placeholder='Exercise Name'
              onChange={handleChange}
              isInvalid={!!errors.exerciseName}
            />
            <Form.Control.Feedback type='invalid'>{errors.exerciseName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>Equipment</strong>
            </Form.Label>
            <Form.Control
              type='text'
              name='equipment'
              placeholder='Equipment'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>Select an Image</strong>
            </Form.Label>
            <Form.Select name='image' onChange={handleChange}>
              {IMAGE_OPTIONS.map((imgOption) => (
                <option key={imgOption.value} value={imgOption.value}>
                  {imgOption.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>
                Enter your first workout for{' '}
                {parseLocalDateString(exercise.workouts[0].date).toLocaleDateString()}
              </strong>
            </Form.Label>

            {exercise.workouts.map((workout, workoutIndex) => (
              <div key={workoutIndex}>
                {workout.set.map((set, setIndex) => (
                  <Row key={setIndex} className='align-items-center mb-3'>
                    <Col xs='4'>
                      <Form.Control
                        type='text'
                        placeholder='Weight'
                        value={set.weight}
                        onChange={(e) =>
                          handleSetChange(workoutIndex, setIndex, 'weight', e.target.value)
                        }
                      />
                    </Col>
                    <Col xs='auto' style={{ paddingLeft: 0, paddingRight: 10 }}>
                      <Form.Label className='mb-0'>lbs</Form.Label>
                    </Col>
                    <Col xs='4'>
                      <Form.Control
                        type='number'
                        placeholder='Reps'
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(workoutIndex, setIndex, 'reps', e.target.value)
                        }
                      />
                    </Col>
                    <Col xs='auto' style={{ paddingLeft: 0, paddingRight: 10 }}>
                      <Form.Label className='mb-0'>reps</Form.Label>
                    </Col>
                  </Row>
                ))}
              </div>
            ))}

            <Button variant='secondary' onClick={addNewSet} style={{ marginRight: 10 }}>
              Add New Set
            </Button>
            <Button variant='dark' type='submit' style={{ minWidth: 120 }}>
              Create
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};

export default NewExercisePage;

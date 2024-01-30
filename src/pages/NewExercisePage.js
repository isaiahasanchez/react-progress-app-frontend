import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
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
  // ... add more if needed
];

// Helper function to format dates
// function formatDateToMMDDYYYY(date) {
//   return date.toLocaleDateString('en-US', {
//     month: '2-digit',
//     day: '2-digit',
//     year: 'numeric'
//   });
// }

const NewExercisePage = () => {
  const [exercise, setExercise] = useState({
    exerciseName: '',
    equipment: '',
    image: IMAGE_OPTIONS[0].value,
    editMode: false,
    workouts: [
      {
        // : formatDateToMMDDYYYY(new Date()),
        date: new Date().toISOString(),
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

  const navigate = useNavigate();

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

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!exercise.exercise.trim()) {
  //     newErrors.exercise = 'Exercise field is required.';
  //   }

  //   if (!exercise.workouts.trim()) {
  //     newErrors.workouts = 'Workouts field is required.';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // returns true if no errors
  // };

  // const currentDate = new Date().toLocaleDateString() + ' \u2611 \u2610 -- ';

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
    // Clearing respective error when value changes
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
      // Clone the current workouts array
      const newWorkouts = [...prevExercise.workouts];

      // Assuming there's always at least one workout, add a new set to the last workout
      const lastWorkoutIndex = newWorkouts.length - 1;
      newWorkouts[lastWorkoutIndex] = {
        ...newWorkouts[lastWorkoutIndex],
        set: [
          ...newWorkouts[lastWorkoutIndex].set,
          {
            weight: 0,
            reps: 10,
          },
        ],
      };
      console.log(newWorkouts);
      return { ...prevExercise, workouts: newWorkouts };
    });
  };

  // setExercise( exercise.map(prevExercise =>{
  //   return(
  //     ...prevExercise,
  //       ...prevExercise[0].set,
  //                         {
  //         weight: 'new added 1lbs',
  //         reps: 1,
  //     },
  //   )
  // }))

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return; // stop here if there are validation errors because if validateFrom is false then that means there were errors. True means no errors.
    // }
    mutate(exercise);
    console.log(exercise);
  };

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        {feedbackMessage && (
          <Alert variant='danger' onClose={() => setFeedbackMessage(null)} dismissible>
            {feedbackMessage}
          </Alert>
        )}
        <Form.Group>
          <Form.Label>Exercise</Form.Label>
          <Form.Control
            type='text'
            name='exerciseName'
            placeholder='Exercise Name'
            onChange={handleChange}
          />
          {errors.exercise && <p style={{ color: 'red' }}>{errors.exercise}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Equipment</Form.Label>
          <Form.Control
            type='text'
            name='equipment'
            placeholder='Equipment'
            onChange={handleChange}
          />
          {errors.equipment && <p style={{ color: 'red' }}>{errors.equipment}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Select an Image</Form.Label>
          <Form.Select name='image' onChange={handleChange}>
            {IMAGE_OPTIONS.map((imgOption, index) => (
              <option key={imgOption.value} value={imgOption.value}>
                {imgOption.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Workouts</Form.Label>
          {exercise.workouts.map((workout, workoutIndex) => (
            <div key={workoutIndex}>
              {workout.set.map((set, setIndex) => (
                <Row key={setIndex} className='align-items-center mb-3'>
                  <Col xs='auto'>
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
                  <Col xs='auto' style={{ paddingLeft: 0, paddingRight: 10 }}>
                    <Form.Label className='mb-0'>reps</Form.Label>
                  </Col>
                </Row>
              ))}
            </div>
          ))}

          <Button variant='secondary' onClick={addNewSet}>
            Add New Set
          </Button>
        </Form.Group>

        <Button variant='dark' type='submit'>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default NewExercisePage;

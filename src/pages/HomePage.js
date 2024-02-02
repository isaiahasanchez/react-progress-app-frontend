import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Alert, Button, Col } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService, { deleteExercise, updateExercise } from '../api/apiService';
import ExerciseCard from '../components/ExerciseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';
import '../styles.css';

const HomePage = () => {
  const [alert, setAlert] = useState({
    visible: false,
    type: '',
    message: '',
  });

  // used for invalidating the exercises query to refresh the list after a successful deletion.
  const queryClient = useQueryClient();

  const {
    data: exercises,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const exercisesData = await apiService.fetchExercises();

      // Sort exercises by lastDateEdited
      const sortedExercises = exercisesData.sort(
        (a, b) => new Date(b.lastDateEdited) - new Date(a.lastDateEdited),
      );

      // For each exercise, sort its workouts by date
      sortedExercises.forEach((exercise) => {
        exercise.workouts.sort((a, b) => new Date(a.date) - new Date(b.date));
      });

      return sortedExercises.map((exercise) => ({ ...exercise, editMode: false }));
    },
    onError: (error) => {
      showAlert('danger', error.message || 'Failed to fetch data. Please try again later.');
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      // invalidates queries so that it can be refetched with updates deleted exercises
      queryClient.invalidateQueries(['exercises']);
      showAlert('success', 'Exercise deleted successfully.');
    },
    onError: (error) => {
      console.error('Error deleting exercise:', error);
      showAlert('danger', 'Failed to delete exercise.');
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      // After a successful update, invalidate and refetch exercises
      queryClient.invalidateQueries(['exercises']);
      showAlert('success', 'Exercise updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating exercise:', error);
      showAlert('danger', 'Failed to update exercise. Please try again');
    },
  });

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => setAlert({ visible: false, type: '', message: '' }), 3000);
  };

  // return a spinner when the exercises are loading
  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return <Alert variant='danger'>Failed to load exercies please try again later</Alert>;

  const handleDelete = async (id) => {
    const exerciseToDelete = exercises.find((exercise) => exercise._id === id);
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the entire ${exerciseToDelete.exerciseName} workout history?`,
    );

    if (userConfirmed) {
      deleteMutation(id);
    }
  };

  const handleSave = async (id, updatedExercise) => {
    updateMutation({ id, updatedExercise });
  };
  const handleDateSave = async (id, updatedExercise) => {
    updateMutation({ id, updatedExercise });
  };

  return (
    <Container>
      {alert.visible && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Row className='justify-content-between align-items-center'>
        <Col xs='auto' className='m-2'>
          <h1 style={{ color: 'white' }}>Your Exercises</h1>
        </Col>
        <Col xs='12' md='12'>
          <Alert variant='secondary'>
            Welcome, click the button below to add a new exercise. See the most recent five workouts
            from each exercise and click the Edit button to add new exercises.
          </Alert>
        </Col>
        <Col xs='auto' style={{ paddingBottom: '0.5rem' }}>
          <Link to={`/exercises/new`}>
            <Button variant='light' className='mr-2'>
              Create A New Exercise
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {exercises?.map((exercise) => (
          <Col xs={12} xl={6} key={exercise._id}>
            <ExerciseCard
              exercise={exercise}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleDateSave={handleDateSave}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

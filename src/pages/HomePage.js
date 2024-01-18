import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Alert, Button, Col } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService, { deleteExercise, updateExercise } from '../api/apiService';
import ExerciseCard from '../components/ExerciseCard';
import LoadingSpinner from '../components/LoadingSpinner';

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
      return exercisesData
        .sort((a, b) => new Date(b.lastDateEdited) - new Date(a.lastDateEdited))
        .map((exercise) => ({ ...exercise, editMode: false }));
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

  // Using isError instead of onError due to easier integration
  if (isError)
    return <Alert variant='danger'>Failed to load exercies please try again later</Alert>;

  const handleDelete = async (id) => {
    const exerciseToDelete = exercises.find((exercise) => exercise._id === id);
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the entire ${exerciseToDelete.exercise} workout history?`,
    );

    if (userConfirmed) {
      deleteMutation(id);
    }
  };

  const handleSave = async (id, updatedExercise) => {
    updateMutation({ id, updatedExercise });
    console.log(id, updatedExercise);
  };

  return (
    <Container>
      {alert.visible && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Row className='justify-content-between align-items-center'>
        <Col xs='auto'>
          <h1>Your Exercises</h1>
        </Col>
        <Col xs='12' md='12'>
          <Alert variant='info'>
            Welcome, click the button below to add a new exercise. Click edit and press shift after
            a line to copy the previous workout automatically which you can then edit if needed
          </Alert>
        </Col>
        <Col xs='auto'>
          <Link to={`/exercises/new`}>
            <Button variant='dark' className='mr-2'>
              Create A New Exercise
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {exercises?.map((exercise) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

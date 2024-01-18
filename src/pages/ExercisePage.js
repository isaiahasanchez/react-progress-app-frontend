import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, Container } from 'react-bootstrap';
import { fetchExercise } from '../api/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ExercisePage = () => {
  // useParams() retrieves URL parameters from the current route, such as 'id', to fetch and display data for that specific route.
  const { id } = useParams();

  const {
    data: exercise,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => fetchExercise(id),
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container className='mt-4'>
        <ErrorMessage status={error.response?.status} />
      </Container>
    );
  }

  return (
    <Container className='mt-4'>
      <Card style={{ backgroundColor: 'rgb(225 226 230)' }}>
        <div
          style={{
            height: '300px',
            width: '400px',
            overflow: 'hidden',
          }}
        >
          <Card.Img
            className='img-fluid'
            variant='top'
            src={exercise?.image}
            alt={exercise?.exercise}
            style={{
              objectFit: 'contain',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{exercise?.exercise}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {' '}
            Equipment: {exercise?.equipment}
          </Card.Subtitle>
          <Card.Text>Last Edited: {new Date(exercise?.lastDateEdited).toLocaleString()}</Card.Text>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>Sets: {exercise?.sets}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExercisePage;

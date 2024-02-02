import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchExercise } from '../api/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import FullPageStyledDateSets from '../components/FullPageStyledDateSets';

const ExercisePage = () => {
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
  if (error) return <ErrorMessage status={error.response?.status} />;

  return (
    <Container className='mt-4'>
      <Card style={{ backgroundColor: 'rgb(225 226 230)' }}>
        <Card.Img
          variant='top'
          src={exercise?.image}
          alt={`Image of ${exercise?.exerciseName}`}
          style={{
            objectFit: 'contain',
            maxHeight: '20rem',
            width: '100%',
            alignSelf: 'center',
            paddingTop: '1rem',
          }}
        />
        <Card.Body>
          <Card.Title>{exercise?.exerciseName}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            Equipment: {exercise?.equipment}
          </Card.Subtitle>
          <Card.Text>Last Edited: {new Date(exercise?.lastDateEdited).toLocaleString()}</Card.Text>

          <FullPageStyledDateSets workouts={exercise?.workouts} />

          <Link to={'/'}>
            <Button variant='dark'>Return to Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExercisePage;

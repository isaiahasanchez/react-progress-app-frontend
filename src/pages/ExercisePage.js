import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchExercise } from '../api/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

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
        <Card.Img
          variant='top'
          src={exercise?.image}
          alt={`Image of ${exercise?.exerciseName}`}
          style={{
            objectFit: 'contain', // Maintains the aspect ratio
            maxHeight: '250px', // Maximum height of the image
            width: '100%', // Full width of the card
            alignSelf: 'center', // Centers the image if it's not as wide as the card
          }}
        />
        <Card.Body>
          <Card.Title>{exercise?.exerciseName}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            Equipment: {exercise?.equipment}
          </Card.Subtitle>
          <Card.Text>Last Edited: {new Date(exercise?.lastDateEdited).toLocaleString()}</Card.Text>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>
            Sets:
            {exercise?.workouts.map((workout, index) => (
              <div key={index}>
                <strong>Date:</strong> {new Date(workout.date).toLocaleString()}
                <ul>
                  {workout.set.map((s, idx) => (
                    <li key={idx}>
                      Set {idx + 1}: {s.reps} reps, {s.weight} lbs
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card.Text>
          <Link to={'/'}>
            <Button variant='dark'>Return to Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExercisePage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './NewPostPage.css';
import '../styles.css';
import { createPost } from '../api/apiService';

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

const NewPostPage = () => {
  const [post, setPost] = useState({
    exercise: '',
    equipment: '',
    image: IMAGE_OPTIONS[0].value,
    sets: '',
  });
  const [errors, setErrors] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
      setFeedbackMessage('Error creating post. Please try again later.');
    },
  });

  const validateForm = () => {
    const newErrors = {};

    if (!post.exercise.trim()) {
      newErrors.exercise = 'Exercise field is required.';
    }

    if (!post.sets.trim()) {
      newErrors.sets = 'Sets field is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const currentDate = new Date().toLocaleDateString() + ' \u2611 \u2610 -- ';

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    // Clearing respective error when value changes
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // stop here if there are validation errors because if validateFrom is false then that means there were errors. True means no errors.
    }
    mutate(post);
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
            name='exercise'
            placeholder='Exercise'
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
          <Form.Label>Sets</Form.Label>
          <Form.Control
            as='textarea'
            rows={12}
            name='sets'
            placeholder='Sets'
            defaultValue={currentDate}
            onChange={handleChange}
            required
          />
          {errors.sets && <p style={{ color: 'red' }}>{errors.sets}</p>}
        </Form.Group>
        <Button variant='dark' type='submit'>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostPage;

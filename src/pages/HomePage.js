import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Alert, Button, Col } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService, { deletePost, updatePost } from '../api/apiService';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const [alert, setAlert] = useState({
    visible: false,
    type: '',
    message: '',
  });

  // used for invalidating the posts query to refresh the list after a successful deletion.
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsData = await apiService.fetchPosts();
      return postsData
        .sort((a, b) => new Date(b.lastDateEdited) - new Date(a.lastDateEdited))
        .map((post) => ({ ...post, editMode: false }));
    },
    onError: (error) => {
      showAlert('danger', error.message || 'Failed to fetch data. Please try again later.');
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // invalidates queries so that it can be refetched with updates deleted posts
      queryClient.invalidateQueries(['posts']);
      showAlert('success', 'Post deleted successfully.');
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      showAlert('danger', 'Failed to delete post.');
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      // After a successful update, invalidate and refetch posts
      queryClient.invalidateQueries(['posts']);
      showAlert('success', 'Post updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating post:', error);
      showAlert('danger', 'Failed to update post. Please try again');
    },
  });

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => setAlert({ visible: false, type: '', message: '' }), 3000);
  };

  // return a spinner when the posts are loading
  if (isLoading) return <LoadingSpinner />;

  // Using isError instead of onError due to easier integration
  if (isError)
    return <Alert variant='danger'>Failed to load exercies please try again later</Alert>;

  const handleDelete = async (id) => {
    const postToDelete = posts.find((post) => post._id === id);
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the entire ${postToDelete.exercise} workout history?`,
    );

    if (userConfirmed) {
      deleteMutation(id);
    }
  };

  const handleSave = async (id, updatedPost) => {
    updateMutation({ id, updatedPost });
    console.log(id, updatedPost);
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
          <Link to={`/posts/new`}>
            <Button variant='dark' className='mr-2'>
              Create A New Exercise
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {posts?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

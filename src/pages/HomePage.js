import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import apiService from '../api/apiService';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await apiService.fetchPosts();
      const sortByDate = postsData.sort((a, b) => new Date(b.lastDateEdited) - new Date(a.lastDateEdited));
      const postsWithEditMode = sortByDate.map(post => ({ ...post, editMode: false }));
      setPosts(postsWithEditMode);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const toggleEditMode = (id) => {
    setPosts(prevPosts => prevPosts.map(post => (
      post._id === id ? { ...post, editMode: !post.editMode } : post
    )));
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setPosts(prevPosts => prevPosts.map(post => (
      post._id === id ? { ...post, [name]: value } : post
    )));
  };

  const handleSave = async (id) => {
    const postToUpdate = posts.find(post => post._id === id);
  
    try {
      await apiService.updatePost(id, postToUpdate);
      fetchPosts(); // Fetch all posts again after an edit to refresh the UI Not the most efficient way to do this since it adds another fetch but it works for now since the other option requires a refresh manually
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // const handleSave = async (id) => {
  //   const postToUpdate = posts.find(post => post._id === id);

  //   try {
  //     const updatedPost = await apiService.updatePost(id, postToUpdate);
  //     let updatedPosts = posts.map(post => (
  //       post._id === id ? { ...updatedPost, editMode: false } : post
  //     ));
  //     setPosts(updatedPosts);  // Update the state with sorted posts
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //   }
  // };
  

  return (
    <Container>
      <Row>
        {posts.map(post => (
          <Col md={4} className="mb-4" key={post._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                className="img-fluid"
                variant="top"
                src={post.image}
                alt={post.exercise}
              />
              {post.editMode ? (
                <Form>
                  <Form.Group>
                    <Form.Label>Exercise</Form.Label>
                    <Form.Control
                      type="text"
                      name="exercise"
                      value={post.exercise}
                      onChange={(e) => handleChange(e, post._id)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Sets</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="sets"
                      value={post.sets}
                      onChange={(e) => handleChange(e, post._id)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={() => handleSave(post._id)}>
                    Save Changes
                  </Button>
                  {/* <Button variant="secondary" onClick={() => toggleEditMode(post._id)}>
                    Cancel
                  </Button> */}
                </Form>
              ) : (
                <Card.Body>
                  <Card.Title>{post.exercise}</Card.Title>
                  <Card.Text>{post.equipment}</Card.Text>
                  <Card.Text>Last Edited: {new Date(post.lastDateEdited).toLocaleString()}</Card.Text>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>{post.sets}</Card.Text>
                  <Link to={`/posts/${post._id}`}>
                    <Button variant='primary' className='mr-2'> Read More</Button>
                  </Link>
                  <Button variant='danger' onClick={() => handleDelete(post._id)}>Delete</Button>
                  <Button variant='secondary' onClick={() => toggleEditMode(post._id)}>Edit</Button>
                </Card.Body>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

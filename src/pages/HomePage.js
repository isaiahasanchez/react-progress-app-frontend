import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import apiService from '../api/apiService';
import PostCard from '../components/PostCard';  

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
    setPosts(prevPosts => prevPosts.map(post => {
        if (post._id === id && name === 'sets') {
            // Split the existing sets and remove the last 5 lines
            let lines = post.sets.split('\n');
            lines.splice(-5); // Remove the last 5 lines
            
            // Now add the new sets (which contains the latest 5 lines)
            lines.push(...value.split('\n'));
            
            return { ...post, sets: lines.join('\n') };
        } else if (post._id === id) {
            return { ...post, [name]: value };
        } else {
            return post;
        }
    }));
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


  return (
    <Container>
      <h1>Your Exercises</h1>
    <Row>
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          toggleEditMode={toggleEditMode}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ))}
    </Row>
  </Container>
  );
};

export default HomePage;

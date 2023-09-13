import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
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

  const handleChange = (e, id, setIndex) => {
    const { name, value } = e.target;
  
    setPosts(prevPosts => prevPosts.map(post => {
      if (post._id === id) {
        // This is the post we want to update
        if (setIndex !== null) {
          // We are updating a specific set
          return {
            ...post,
            sets: post.sets.map((set, index) => {
              if (index === setIndex) {
                // This is the set we want to update
                return {
                  ...set,
                  [name]: parseFloat(value) // assuming the fields are numbers
                };
              }
              return set; // not the set we want to update, leave it alone
            })
          };
        } else {
          // Updating a top-level field like 'exercise'
          return { ...post, [name]: value };
        }
      }
      return post; // not the post we want to update, leave it alone
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

  //handle save but has to refresh manually keeping it commented out for now
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

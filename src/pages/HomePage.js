import React, { useEffect, useState } from "react";
import { Container, Row, Alert } from "react-bootstrap";
import apiService from "../api/apiService";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => setAlert({ visible: false, type: "", message: "" }), 3000); // auto-hide after 3 seconds
  };

  const fetchPosts = async () => {
    try {
      const postsData = await apiService.fetchPosts();
      const sortByDate = postsData.sort(
        (a, b) => new Date(b.lastDateEdited) - new Date(a.lastDateEdited)
      );
      const postsWithEditMode = sortByDate.map((post) => ({
        ...post,
        editMode: false,
      }));
      setPosts(postsWithEditMode);
    } catch (error) {
      console.error("Error fetching posts:", error);
      showAlert('danger', 'Failed to fetch posts.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      showAlert('danger', 'Failed to delete post.');
    }
  };

  const toggleEditMode = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, editMode: !post.editMode } : post
      )
    );
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setPosts(prevPosts => prevPosts.map(post => {
        if (post._id === id && name === 'sets') {
            return { ...post, sets: `${post.sets}\n${value}` };
        } else if (post._id === id) {
            return { ...post, [name]: value };
        } else {
            return post;
        }
    }));
};


  const handleSave = async (id) => {
    const postToUpdate = posts.find((post) => post._id === id);

    try {
      await apiService.updatePost(id, postToUpdate);
      fetchPosts(); // Fetch all posts again after an edit to refresh the UI Not the most efficient way to do this since it adds another fetch but it works for now since the other option requires a refresh manually
      showAlert('success', 'Post updated successfully.');
    } catch (error) {
      console.error("Error updating post:", error);
      showAlert('danger', 'Failed to update post.');
    }
  };

  return (
    <Container>
      {alert.visible && <Alert variant={alert.type}>{alert.message}</Alert>}
      <h1>Your Exercises</h1>
      <Row>
        {posts.map((post) => (
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

import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Alert, Button, Col } from "react-bootstrap";
import apiService from "../api/apiService";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    message: "",
  });

  const fetchPosts = useCallback(async () => {
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
      showAlert("danger", "Failed to fetch posts.");
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => setAlert({ visible: false, type: "", message: "" }), 3000);
  };

  const handleDelete = async (id) => {
    const postToDelete = posts.find((post) => post._id === id);
    console.log(postToDelete);
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the entire ${postToDelete.exercise} workout history?`
    );
    if (!userConfirmed) {
      return;
    }
    try {
      await apiService.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      showAlert("danger", "Failed to delete post.");
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
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === id && name === "sets") {
          let lines = post.sets.split("\n");
          lines.splice(-5);
          lines.push(...value.split("\n"));
          return { ...post, sets: lines.join("\n") };
        } else if (post._id === id) {
          return { ...post, [name]: value };
        } else {
          return post;
        }
      })
    );
  };

  const handleSave = async (id) => {
    const postToUpdate = posts.find((post) => post._id === id);
    try {
      await apiService.updatePost(id, postToUpdate);
      fetchPosts();
      showAlert("success", "Post updated successfully.");
    } catch (error) {
      console.error("Error updating post:", error);
      showAlert("danger", "Failed to update post.");
    }
  };

  return (
    <Container>
      {alert.visible && <Alert variant={alert.type}>{alert.message}</Alert>}
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <h1>Your Exercises</h1>
        </Col>
        <Col xs="auto">
          <Link to={`/posts/new`}>
            <Button variant="dark" className="mr-2">
              Create A New Exercise
            </Button>
          </Link>
        </Col>
      </Row>
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

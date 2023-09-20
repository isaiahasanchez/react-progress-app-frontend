import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Alert, Button } from "react-bootstrap";
import apiService from "../api/apiService";
import PostCard from "../components/PostCard";
import './HomePage.css'

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

  /**
   * Displays a temporary alert message to the user.
   * @param {string} type - The type of the alert. e.g., 'success' or 'danger'.
   * @param {string} message - The message to display in the alert.
   */
  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => setAlert({ visible: false, type: "", message: "" }), 3000); // auto-hide after 3 seconds
  };

  /**
   * Fetches all posts, sorts them by date, and sets them to the local state.
   * Handles errors by logging and showing an alert.
   */
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
      showAlert("danger", "Failed to fetch posts.");
    }
  };

  /**
   * Deletes a post by its ID.
   * @param {string} id - The ID of the post to delete.
   */
  const handleDelete = async (id) => {
    const postToDelete = posts.find((post)=> post._id == id)
    console.log(postToDelete);
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the entire ${postToDelete.exercise} workout history? `    );
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

  /**
   * Toggles the edit mode for a specific post.
   * @param {string} id - The ID of the post to toggle edit mode for.
   */
  const toggleEditMode = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, editMode: !post.editMode } : post
      )
    );
  };

  /**
   * Handles updates to a specific post's attributes.
   *
   * If updating 'sets', it appends the new value to existing content.
   * For other attributes, it replaces the value based on input name.
   *
   * @param {object} e - The event object from the input change.
   * @param {string} id - The ID of the post being edited.
   */
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === id && name === "sets") {
          // Split the existing sets and remove the last 5 lines
          let lines = post.sets.split("\n");
          lines.splice(-5); // Remove the last 5 lines

          // Now add the new sets (which contains the latest 5 lines)
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
      fetchPosts(); // Fetch all posts again after an edit to refresh the UI Not the most efficient way to do this since it adds another fetch but it works for now since the other option requires a refresh manually
      showAlert("success", "Post updated successfully.");
    } catch (error) {
      console.error("Error updating post:", error);
      showAlert("danger", "Failed to update post.");
    }
  };

  return (
    <Container>
      {alert.visible && <Alert variant={alert.type}>{alert.message}</Alert>}
      <h1>Your Exercises</h1>
      <Link to={`/posts/new`}>
        <Button variant="primary" className="mr-2">
          Create A New Exercise
        </Button>
      </Link>
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

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import HomePage from './pages/HomePage';
import NewPostPage from './pages/NewPostPage';
import PostPage from './pages/PostPage';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/posts/new'
          element={
            <ProtectedRoute>
              <NewPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/posts/:id'
          element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

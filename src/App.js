import React from 'react';
import './styles.css';
// shortened to Router for brevity
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import HomePage from './pages/HomePage';
import NewExercisePage from './pages/NewExercisePage';
import ExercisePage from './pages/ExercisePage';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // If loading is true (indicating an ongoing authentication process), display the LoadingSpinner. This prevents rendering the main app UI until the authentication state is fully resolved
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
            // Protected routes to make sure certain pages are only Available to authenticated users
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/exercises/new'
          element={
            <ProtectedRoute>
              <NewExercisePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/exercises/:id'
          element={
            <ProtectedRoute>
              <ExercisePage />
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

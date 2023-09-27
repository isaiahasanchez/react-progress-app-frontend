import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext'; // Adjust the import path
import HomePage from './pages/HomePage';
import NewPostPage from './pages/NewPostPage';
import PostPage from './pages/PostPage';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { currentUser } = useAuth(); // Adjust based on your actual context values
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={currentUser ? <HomePage/> : <Navigate to="/login" replace />} />
        <Route path='/posts/new' element={currentUser ? <NewPostPage/> : <Navigate to="/login" replace />} />
        <Route path='/posts/:id' element={currentUser ? <PostPage/> : <Navigate to="/login" replace />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;

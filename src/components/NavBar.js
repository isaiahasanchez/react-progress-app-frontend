import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../contexts/authContext';
import logoImage from '../components/progress-logo.png';

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='px-3'>
      <LinkContainer to='/'>
        <Navbar.Brand>
          {' '}
          <img src={logoImage} alt='Progress Exercise Log' height='50'></img>{' '}
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/posts/new'>
            <Nav.Link>Create New Exercise</Nav.Link>
          </LinkContainer>
          {currentUser && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
        </Nav>

        {currentUser && (
          <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }} className='navbar-text'>
            Hello, {currentUser.email}
          </span>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

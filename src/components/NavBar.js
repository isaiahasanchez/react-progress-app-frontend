import React, { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AuthContext } from '../contexts/authContext' // Correct Context
import logoImage from '../components/progress-logo.png'

const NavBar = () => {
  const { currentUser } = useContext(AuthContext); // Correct usage of useContext with AuthContext
  
  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='px-3'>
        <LinkContainer to="/">
            <Navbar.Brand> <img src={logoImage} alt='Progress Exercise Log' height='50'></img> </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
  <Nav className='mr-auto'>
    <LinkContainer to='/'>
      <Nav.Link>Home</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/posts/new">
      <Nav.Link>Create New Exercise</Nav.Link>
    </LinkContainer>
  </Nav>
  {currentUser && (
    <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }} className='navbar-text'>Hello, {currentUser.email}</span>
  )}
</Navbar.Collapse>

    </Navbar>
  )
}

export default NavBar;

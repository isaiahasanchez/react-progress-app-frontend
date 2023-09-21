import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import logoImage from '../components/progress-logo.png'


const NavBar = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='px-3'>
        <LinkContainer to="/">
            <Navbar.Brand> <img src={logoImage} alt='Progress Exercise Log' height='50'></img> </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
                <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/posts/new">
                <Nav.Link>Create New Exercise</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
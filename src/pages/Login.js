import React, { useState, useEffect } from 'react'; // Added useEffect
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Added useLocation
import { useAuth } from '../contexts/authContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('registered')) {
      setShowSuccess(true);
      // Optionally, hide the message after 10 seconds:
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (error) => {
          console.error(error);
          setError('Login failed. Please try again.');
        },
      },
    );
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card style={{ backgroundColor: 'rgb(225 226 230)' }}>
            <Card.Header className='text-center' as='h2'>
              Welcome to Progress Exercise Log!
            </Card.Header>
            <Card.Title className='text-center mt-3 mb-0'>Please Login</Card.Title>
            <Card.Body className='pt-0'>
              {showSuccess && (
                <Alert variant='success'>
                  You have successfully registered with an account. Please login.
                </Alert>
              )}{' '}
              {/* Display the success message */}
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Login
                </Button>
              </Form>
              <div className='mt-3 text-center h5'>
                No account? <Link to='/register'>Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

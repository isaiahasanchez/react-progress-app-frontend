import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap'


const HomePage = () => {
    const[posts, setPosts] = useState([])
    // const[editing, setEditing] = useState(false)


    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5500/posts`)
            setPosts(res.data)
        }
        fetchPost()
    },[])

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:5500/posts/${id}`) // remove item from DB 
            setPosts(posts.filter((post) => post._id !== id))
        }catch (error) {
            console.error('error deleting post', error)
        }
    }

    const toggleEditMode = (id) => {
      setPosts(prevPosts => 
          prevPosts.map(post => 
              post._id === id ? { ...post, editMode: !post.editMode } : post
          )
      );
  };
  
 const handleChange = (e, id) => {
      setPosts(prevPosts =>
          prevPosts.map(post =>
              post._id === id ? { ...post, [e.target.name]: e.target.value } : post
          )
      );
  };



  return (
    <Container>
      <Row>
        {posts.map((post) => (
          <Col md={4} className="mb-4" key={post._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                className="img-fluid"
                variant="top"
                src={post.image}
                alt={post.exercise}
              />
              {post.editMode ? (
                <>
                <Form>
                  <Form.Group>
                    <Form.Label>Exercise</Form.Label>
                    <Form.Control
                      type="text"
                      name="exercise"
                      placeholder="Exercise"
                      value={post.exercise}
                      onChange={(e) => handleChange(e, post._id)}
                    />
                  </Form.Group>
                </Form>
                <Button variant="secondary" onClick={()=> toggleEditMode(post._id)} >
                Toggle Edit
              </Button>
              </>
              ) : (
              <Card.Body>
                <Card.Title>{post.exercise}</Card.Title>
                <Card.Text>{post.equipment}</Card.Text>
                <Link to={`/posts/${post._id}`}>
                    <Button variant='primary' className='mr-2'> Read More</Button>
                </Link>
                    <Button variant='danger' onClick={()=> handleDelete(post._id)}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={()=> toggleEditMode(post._id)} >
                      Edit
                    </Button>
              </Card.Body>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage
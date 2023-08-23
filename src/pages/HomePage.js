import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

const HomePage = () => {
    const[posts, setPosts] = useState([])


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
                alt={post.title}
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.author}</Card.Text>
                <Link to={`/posts/${post._id}`}>
                    <Button variant='primary' className='mr-2'> Read More</Button>
                </Link>
                    <Button variant='danger' onClick={()=> handleDelete(post._id)}>
                        Delete
                    </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage
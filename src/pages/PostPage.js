import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'


const PostPage = () => {
    const [post, setPost] = useState({
        exercise: '',
        equipment: '',
        image: '',
        sets: '',
    })

    const {id} = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5500/posts/${id}`)
            setPost(res.data)
        }
        fetchPost()
    },[id])
  return (
    <Container className='mt-4'>
        <Card>
        <div style={{ 
            height: '300px', 
            width: '400px', 
            overflow: 'hidden'
        }}>
            <Card.Img 
                className='img-fluid' 
                variant= 'top' 
                src={post.image} 
                alt={post.exercise} 
                style={{ 
                    objectFit: 'contain', 
                    maxHeight: '100%', 
                    maxWidth: '100%' 
                }}
            />
        </div>
            <Card.Body>
                <Card.Title>{post.exercise}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'> Equipment: {post.equipment}</Card.Subtitle>
                <Card.Text>Last Edited: {new Date(post.lastDateEdited).toLocaleString()}</Card.Text>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>Sets: {post.sets}</Card.Text>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default PostPage
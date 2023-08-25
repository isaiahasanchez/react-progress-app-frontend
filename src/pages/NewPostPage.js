import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

const NewPostPage = () => {
    const [post, setPost] = useState({
        exercise: '',
        equipment: '',
        image: '',
        sets: '',
    })

    const navigate = useNavigate()

    const handleChange = e => {
        setPost({...post, [e.target.name]:e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5500/posts', post)
        navigate('/')
    }
  return (
    <Container className='mt-4'>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label> Exercise</Form.Label>
                <Form.Control type='text' name='exercise' placeholder='Exercise' onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label> Equipment</Form.Label>
                <Form.Control type='text' name='equipment' placeholder='Equipment' onChange={handleChange} />
                
            </Form.Group>
            <Form.Group>
                <Form.Label> Image Url</Form.Label>
                <Form.Control type='text' name='image' placeholder='Image URL' onChange={handleChange} />

            </Form.Group>
            <Form.Group>
                <Form.Label> Sets</Form.Label>
                <Form.Control as='textarea' rows={12}name='sets' placeholder='Sets' onChange={handleChange} required/>
            </Form.Group>
            <Button variant='primary' type='submit'>
                Create 
            </Button>           
        </Form>
    </Container>
  )
}

export default NewPostPage
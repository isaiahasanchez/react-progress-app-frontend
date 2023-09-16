import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const NewPostPage = () => {
    const imageOptions = [
        { label: "Rows", value: "/images/row.jpeg" },
        { label: "Bench Press", value: "/images/bench-press.jpeg" },
        { label: "Push Up", value: "/images/push-up.jpeg" },
        { label: "Curls", value: "/images/curls.jpeg" },
        { label: "Deadlift", value: "/images/deadlift.jpeg" },
        { label: "Lunges", value: "/images/lunges.jpeg" },
        { label: "Squats", value: "/images/squats.jpeg" },
        { label: "Pull Up", value: "/images/pull-up.jpeg" },
        // ... add more if needed
    ];

    const [post, setPost] = useState({
        exercise: '',
        equipment: '',
        image: imageOptions[0].value,
        sets: '',
        editMode: false,
    });


    const currentDate = new Date().toLocaleString() + " \u2611 \u2610 -- "; 

    const navigate = useNavigate();

    const handleChange = e => {
        setPost({...post, [e.target.name]: e.target.value });
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(post);
        await axios.post('http://localhost:5500/posts', post);
        navigate('/');
    };

    return (
        <Container className='mt-4'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Exercise</Form.Label>
                    <Form.Control type='text' name='exercise' placeholder='Exercise' onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Equipment</Form.Label>
                    <Form.Control type='text' name='equipment' placeholder='Equipment' onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select an Image</Form.Label>
                    <Form.Select name="image" onChange={handleChange}>
                        {imageOptions.map((imgOption, index) => (
                            <option key={index} value={imgOption.value}>{imgOption.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sets</Form.Label>
                    <Form.Control as='textarea' rows={12} name='sets' placeholder='Sets' defaultValue={currentDate} onChange={handleChange} required />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Create 
                </Button>           
            </Form>
        </Container>
    )
};

export default NewPostPage;

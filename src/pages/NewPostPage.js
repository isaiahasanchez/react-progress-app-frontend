import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const IMAGE_OPTIONS = [
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

const POSTS_ENDPOINT = process.env.REACT_APP_POSTS_ENDPOINT || 'http://localhost:5500/posts';


const createPost = async (post) => {
    try {
        await axios.post(POSTS_ENDPOINT, post);
        return true;
    } catch (error) {
        console.error("Failed to create post:", error);
        return false;
    }
};

const NewPostPage = () => {
    const [post, setPost] = useState({
        exercise: '',
        equipment: '',
        image: IMAGE_OPTIONS[0].value,
        sets: '',
        editMode: false,
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
    
        if (!post.exercise.trim()) {
            newErrors.exercise = "Exercise field is required.";
        }
    
        if (!post.equipment.trim()) {
            newErrors.equipment = "Equipment field is required.";
        }
    
        if(!post.sets.trim()){
            newErrors.sets = "Sets field is required."
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // returns true if no errors
    };
    

    const currentDate = new Date().toLocaleString() + " \u2611 \u2610 -- "; 

    const navigate = useNavigate();

    const handleChange = e => {
        setPost({...post, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // stop here if there are validation errors
        }

        console.log(post);
        const success = await createPost(post);
        if (success) navigate('/');
    };

    return (
        <Container className='mt-4'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Exercise</Form.Label>
                    <Form.Control type='text' name='exercise' placeholder='Exercise' onChange={handleChange} />
                    {errors.exercise && <p style={{ color: 'red' }}>{errors.exercise}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Equipment</Form.Label>
                    <Form.Control type='text' name='equipment' placeholder='Equipment' onChange={handleChange}
                     />
                     {errors.equipment && <p style={{ color: 'red' }}>{errors.equipment}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select an Image</Form.Label>
                    <Form.Select name="image" onChange={handleChange}>
                        {IMAGE_OPTIONS.map((imgOption, index) => (
                            <option key={imgOption.value} value={imgOption.value}>{imgOption.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sets</Form.Label>
                    <Form.Control as='textarea' rows={12} name='sets' placeholder='Sets' defaultValue={currentDate} onChange={handleChange} required />
                    {errors.sets && <p style={{ color: 'red' }}>{errors.sets}</p>}
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Create 
                </Button>           
            </Form>
        </Container>
    )
};

export default NewPostPage;

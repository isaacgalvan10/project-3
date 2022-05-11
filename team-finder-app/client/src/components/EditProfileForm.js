import { Card, Nav, Image, Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react';
import { EDIT_PROFILE } from '../utils/mutations';
import { useMutation } from "@apollo/client";

const EditProfileForm = ({ user, setEditMode }) => {
    const [editProfile] = useMutation(EDIT_PROFILE);

    const [editFormData, setEditFormData] = useState({
        userId: user._id,
        newUsername: user.username,
        newBio: user.bio
    });

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            await editProfile({
                variables: {
                    ...editFormData
                }
            })
        } catch (e) {
            console.error(e);
        }

        setEditFormData({
            userId: user._id,
            newUsername: '',
            newBio: ''
        });

        setEditMode(false);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    return (
        <Card className="mb-3">
            <Card.Header>
                <Nav className="justify-content-between">
                    <Nav.Item>
                        <Nav.Link className="link-primary text-decoration-underline d-none">Edit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Image src={`../${user.picture}`} alt="user" roundedCircle className='profile-img'></Image>
                    </Nav.Item>
                    <Nav.Item>
                        <a href={"https://github.com/" + user.github} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} className=" fa-icons" /></a>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body className="text-center">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="form-field">
                        <Form.Label htmlFor='title'>Username</Form.Label>
                        <Form.Control
                            type='text'
                            name='newUsername'
                            onChange={handleInputChange}
                            value={editFormData.newUsername}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-field">
                        <Form.Label htmlFor='tags'>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name='newBio'
                            onChange={handleInputChange}
                            value={editFormData.newBio}
                            required
                        />
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='success'>
                        Submit
                    </Button>
                    <Button type='submit' variant='success' onClick={() => setEditMode(false)}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
};

export default EditProfileForm;
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL } from '../utils/actions';
import { useState } from 'react';

const CreatePostModal = () => {
    const [state, dispatch] = useGlobalContext();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        
    
        setValidated(true);
      };
    

    return (
        <Modal
            size='lg'
            show={state.modals.post}
            onHide={() => dispatch({ type: HIDE_MODAL })}
            aria-labelledby='signup-modal'>
            <Modal.Header closeButton>
                <h1>Create a Post</h1>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor='title'>Post Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your title'
                            name='title'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor='tags'>Tags</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='HTML, CSS, JavaScript'
                            name='tags'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>At least one tag is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor='description'>Description</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>A description is required!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor='tags'>Team Size</Form.Label>
                        <Form.Control
                            type='number'
                            min="1"
                            placeholder='Besides you, how many members do you want in your team?'
                            name='team'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Team Size is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor='tags'>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Image link'
                            name='image'
                        />
                    </Form.Group>
                    
                    <Button
                        type='submit'
                        variant='success'>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreatePostModal;

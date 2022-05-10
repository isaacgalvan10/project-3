import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, ADD_PROJECT } from '../utils/actions';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_USER_POST } from '../utils/mutations';
import './styles/modal.css';

const CreatePostModal = () => {
    const [state, dispatch] = useGlobalContext();
    const [validated, setValidated] = useState(false);
    const [addPost, { error, data }] = useMutation(ADD_POST);
    const [addUserPost] = useMutation(ADD_USER_POST);
    const [postFormData, setPostFormData] = useState({ 
        title: '',
        tagsString: '', 
        description: '',
        teamSize: '',
        projectImg: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostFormData({ ...postFormData, [name]: value });
      };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        // const tagsArr = postFormData.tags.split(', ');

        // const tagsArrObj = [];

        // for (let tag in tagsArr) {
        //     tagsArrObj.push({
        //         id: +tag + 1,
        //         tagName: tagsArr[tag]
        //     });
        // };
        
        // const post = {
        //     ...postFormData,
        //     tags: tagsArrObj
        // }


        console.log(postFormData);

        const post = {
            ...postFormData,
            teamSize: +postFormData.teamSize
        }

        console.log(post);

        try {
            const { data } = await addPost({
              variables: { ...post },
            });

            console.log(data)
            const newPost = data.addPost;
            console.log(newPost);
            const projectId = newPost._id;
            console.log(projectId);
            console.log(typeof projectId);

            addUserPost({
                variables: { 
                    userId: state.me._id,
                    title: newPost.title,
                    description: newPost.title,
                    tags: newPost.tags,
                    projectId: newPost._id
               },
              });
          } catch (e) {
            console.error(e);
          }

        //   try {
        //     await addUserPost({
        //       variables: { 
        //           ...post,
        //           userId: state.me._id
        //      },
        //     });
      
        //   } catch (e) {
        //     console.error(e);
        //   }

        // const addProject = await dispatch({
        //     type: ADD_PROJECT,
        //     newProject: postFormData
        // });

        setPostFormData({ 
            title: '',
            tagsString: '', 
            description: '',
            teamSize: '',
            projectImg: ''
        });

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
                    <Form.Group className="form-field">
                        <Form.Label htmlFor='title'>Post Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Your title'
                            name='title'
                            onChange={handleInputChange}
                            value={postFormData.title}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-field">
                        <Form.Label htmlFor='tags'>Tags</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='HTML, CSS, JavaScript'
                            name='tagsString'
                            onChange={handleInputChange}
                            value={postFormData.tags}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>At least one tag is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-field">
                        <Form.Label htmlFor='description'>Description</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control
                                as="textarea"
                                name='description'
                                style={{ height: '100px' }}
                                onChange={handleInputChange}
                                value={postFormData.description}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>A description is required!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-field">
                        <Form.Label htmlFor='tags'>Team Size</Form.Label>
                        <Form.Control
                            type='number'
                            min="1"
                            placeholder='Besides you, how many members do you want in your team?'
                            name='teamSize'
                            onChange={handleInputChange}
                            value={postFormData.team}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>A number is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-field">
                        <Form.Label htmlFor='tags'>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Image link'
                            name='projectImg'
                            onChange={handleInputChange}
                            value={postFormData.projectImg}
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
};

export default CreatePostModal;

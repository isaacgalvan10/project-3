import { Modal, Button, Form } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, ADD_PROJECT } from '../utils/actions';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import './styles/modal.css';
import ImageUpload from '../components/ImageUpload';
import Auth from '../utils/auth';

const CreatePostModal = () => {
  const [state, dispatch] = useGlobalContext();

  const me = state?.me || Auth.getProfile().data;
  // const [validated, setValidated] = useState(false);
  const [projectImage] = useState('');
  const [addPost] = useMutation(ADD_POST);
  const [postFormData, setPostFormData] = useState({
    title: '',
    tagsString: '',
    description: '',
    projectImg: projectImage,
    repo: '',
  });

  const closePostModal = () => {
    dispatch({ type: HIDE_MODAL });
    localStorage.removeItem('image');
  }

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

    event.preventDefault();

    const retrievedImg = JSON.parse(localStorage.getItem('image'));
    console.log(retrievedImg);

    console.log(postFormData);

    const post = {
      ...postFormData,
      projectImg: retrievedImg,
    }

    console.log(post);

    try {
      const { data } = await addPost({
        variables: { ...post },
      });


     const _id = data.addPost._id;
     const date = data.addPost.date;

      dispatch({
        type: ADD_PROJECT,
        formData: {
          ...post,
          _id,
          date,
          poster: {
            _id: me?._id || me?.userId,
            username: me.username,
            picture: me.picture || 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png'
          }
        }
    });

    window.location.replace(`/project/${data.addPost._id}`);


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

    setPostFormData({
      title: '',
      tagsString: '',
      description: '',
      projectImg: '',
      repo: '',
    });

    localStorage.removeItem('image');

    dispatch({ type: HIDE_MODAL })

    // setValidated(true);
  };

  return (
    <Modal
      size="lg"
      show={state.modals.post}
      onHide={() => closePostModal()}
      aria-labelledby="signup-modal"
    >
      <Modal.Header closeButton>
        <h1>Post a project</h1>
      </Modal.Header>
      <Modal.Body>
      <div className="form-label">Upload Project Image</div>
        <ImageUpload />
        <Form
          noValidate
          // validated={validated}
          onSubmit={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Group className="form-field">
            <Form.Label htmlFor="title">Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your title"
              name="title"
              onChange={handleInputChange}
              value={postFormData.title}
              required
            />
            {/* <Form.Control.Feedback type="invalid">
              Title is required!
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="form-field">
            <Form.Label htmlFor="tags">Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="HTML, CSS, JavaScript"
              name="tagsString"
              onChange={handleInputChange}
              value={postFormData.tags}
              required
            />
            {/* <Form.Control.Feedback type="invalid">
              At least one tag is required!
            </Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="form-field">
            <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                style={{ height: '100px' }}
                onChange={handleInputChange}
                value={postFormData.description}
                required
              />
              {/* <Form.Control.Feedback type="invalid">
                A description is required!
              </Form.Control.Feedback> */}
          </Form.Group>
{/* 
          <Form.Group className="form-field">
            <Form.Label htmlFor="tags">Team Size</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="Besides you, how many members do you want in your team?"
              onChange={handleInputChange}
              value={postFormData.team}
              required
            /> */}
            {/* <Form.Control.Feedback type="invalid">
              A number is required!
            </Form.Control.Feedback> */}
          {/* </Form.Group> */}
          <Form.Group className="form-field">
          <Form.Label htmlFor="description">Project Repo</Form.Label>
            <Form.Control
              type='text'
              placeholder='https://github.com/isaacgalvan10/project-3'
              name='repo'
              onChange={handleInputChange}
              value={postFormData.repo}
              required
            />
            {/* <Form.Control.Feedback type='invalid'>You need to provide a link to your project repo</Form.Control.Feedback> */}
          </Form.Group>

          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;

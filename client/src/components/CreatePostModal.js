import { Modal, Button, Form } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, ADD_PROJECT } from '../utils/actions';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import './styles/modal.css';
import ImageUpload from '../components/ImageUpload';
import Auth from '../utils/auth';
import swal from "sweetalert";

const CreatePostModal = () => {
  const [state, dispatch] = useGlobalContext();
  let validated = true;

  const me = state?.me || Auth.getProfile().data;
  const [projectImage] = useState('');
  const [addPost] = useMutation(ADD_POST);
  const [formErrors, setFormErrors] = useState({});
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
    event.preventDefault();
    setFormErrors(validate(postFormData));

    if (validated) {
      const retrievedImg = JSON.parse(localStorage.getItem('image'));
      let projectImg;

      if (retrievedImg) {
        projectImg = retrievedImg
      } else {
        projectImg = "../no-image.jpeg"
        const confirm = await swal({
          text: `Are you sure you dont want to include an image for your project? (you won't be able to edit your post until we add that feature)`,
          buttons: ["I'll include it later", "I'll add it now"],
        });
        if (confirm) {
          return
        }
      };

      const post = {
        ...postFormData,
        projectImg: projectImg,
      }
  
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
        return
      }
  
      setPostFormData({
        title: '',
        tagsString: '',
        description: '',
        projectImg: '',
        repo: '',
      });
  
      localStorage.removeItem('image');
  
      dispatch({ type: HIDE_MODAL })
    }
 
  };

  const validate = (values) => {
    const errors = {};
    const gitHubRegex = /^(((https?:\/\/)(((([a-zA-Z0-9][a-zA-Z0-9\-_]{1,252})\.){1,8}[a-zA-Z]{2,63})\/))|((ssh:\/\/)?git@)(((([a-zA-Z0-9][a-zA-Z0-9\-_]{1,252})\.){1,8}[a-zA-Z]{2,63})(:)))([a-zA-Z0-9][a-zA-Z0-9_-]{1,36})(\/)([a-zA-Z0-9][a-zA-Z0-9_-]{1,36})((\.git)?)$/

    if (!values.title) {
      errors.title =
        "Please enter a title for your post";
      validated = false;
    } 
    if (!values.tagsString) {
      errors.tags = "Please include at least one tag for your post";
      validated = false;
    } 
    if (!values.description) {
      errors.description = "Please include a description for your post";
      validated = false;
    }
    if (!values.repo) {
      errors.repo = "Please enter a link for your GitHub repository!";
      validated = false;
    } else if (!gitHubRegex.test(values.repo)) {
      errors.repo = "Please enter a valid GitHub repository link";
      validated = false;
    }
    return errors;
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
            <Form.Text id="titleAlert" className="text-danger fs-6">
              {formErrors.title}
            </Form.Text>
          </Form.Group>

          <Form.Group className="form-field">
            <Form.Label htmlFor="tags">Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="HTML, CSS, JavaScript"
              name="tagsString"
              onChange={handleInputChange}
              value={postFormData.tagsString}
              required
            />
            <Form.Text id="tagsAlert" className="text-danger fs-6">
              {formErrors.tags}
            </Form.Text>
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
            <Form.Text id="descriptionAlert" className="text-danger fs-6">
              {formErrors.description}
            </Form.Text>
          </Form.Group>
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
            <Form.Text id="repoAlert" className="text-danger fs-6">
              {formErrors.repo}
            </Form.Text>
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

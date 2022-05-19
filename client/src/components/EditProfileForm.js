import { Card, Image, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { EDIT_PROFILE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import ProfileImg from '../components/ProfileImg';
import Auth from '../utils/auth';
import swal from "sweetalert";

const EditProfileForm = ({ user, setEditMode }) => {
  const [editProfile] = useMutation(EDIT_PROFILE);

  const picture = user.picture || '../default.png';
  const [editFormData, setEditFormData] = useState({
    newUsername: user.username,
    newBio: user?.bio || '',
  });

  const cancel = () => {
    setEditMode(false);
    localStorage.removeItem('profileImg');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const retrievedImg = JSON.parse(localStorage.getItem('profileImg'));
    const finalForm = {
      ...editFormData,
      newImg: retrievedImg,
    }

    try {
      const { data } = await editProfile({
        variables: {
          ...finalForm,
        },
      });
      localStorage.removeItem('profileImg');
      Auth.login(data.editProfile.token);
    } catch (e) {
      console.error(e);
      swal({
        title: 'Sorry, that username is already taken :(',
      });
    }

    await setEditFormData({
      newUsername: '',
      newBio: '',
    });

    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <div>
            <Image
              src={picture}
              alt="user"
              roundedCircle
              className="profile-img"
            ></Image>
          </div>
          <div>
            <a
              href={'https://github.com/' + user.github}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <FontAwesomeIcon icon={faGithub} className=" fa-icons" />
              <p style={{ color: 'black' }}>Github</p>
            </a>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="text-center">
      <ProfileImg />
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="form-field">
            <Form.Label htmlFor="title">Username</Form.Label>
            <Form.Control
              type="text"
              name="newUsername"
              onChange={handleInputChange}
              value={editFormData.newUsername}
              required
            />
          </Form.Group>

          <Form.Group className="form-field">
            <Form.Label htmlFor="tags">Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="newBio"
              onChange={handleInputChange}
              value={editFormData.newBio}
              required
            />
          </Form.Group>
          <Button type="submit" style={{ marginRight: '10px' }}>
            Update
          </Button>
          <Button className="delete-btn" type="submit" onClick={() => cancel()}>
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditProfileForm;

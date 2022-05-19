import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup(props) {
  const initialValues = { username: "", github: "", email: "", password: "" };
  let validated = true;

  // Function that watches input information in form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // useStates for the input values, errors in the inputs and submit of a new signup respectively
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const [addUser] = useMutation(ADD_USER);
  // Function for submition of new signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (validated) {
      const finalForm = {
        ...formValues,
        email: formValues.email.toLowerCase(),
        picture: './default.png'
      };
      try {
        const { data } = await addUser({
          variables: { ...finalForm },
        });
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
        swal({
          title: 'Username and/or email already exist',
        });
        return
      }
    }
  };

  // All input validations
  const validate = (values) => {
    const errors = {};
    const passwordRegex = /^.{8,}$/
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!values.email) {
      errors.email =
        "Please enter your email!";
        validated = false;
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email!";
      validated = false;
    }
    if (!values.github) {
      errors.github = "Please enter your GitHub account!";
      validated = false;
    } else if (values.github.trim().includes(' ')) {
      errors.github = "Please enter a valid GitHub!";
      validated = false;
    }
    if (!values.username) {
      errors.username = "Please enter a username for your account!";
      validated = false;
    }
    if (!values.password) {
      errors.password = "Please enter a password for your account!";
      validated = false;
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be at least 8 characters long!";
      validated = false;
    }
    return errors;
  };

  return (
    // Form for new signups
    <div className="App w-100">
      <Container className="form-container">
        <p className="fs-5 m-1 fw-bold ">Create a new account</p>
        <Form onSubmit={handleSubmit}>

          <Form.Group
            className="mb-3"
            controlId="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type=""
              placeholder="Create a username"
            />
            <Form.Text id="nameAlert" className="text-danger fs-6">
              {formErrors.username}
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type=""
              placeholder="Enter your email"
            />
            <Form.Text id="nameAlert" className="text-danger fs-6">
              {formErrors.email}
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create a password" />
            <Form.Text id="nameAlert" className="text-danger fs-6">
              {formErrors.password}
            </Form.Text>
          </Form.Group>

          <Form.Group
            id="githubForm"
            className="mb-3"
            controlId="github"
            name="github"
            value={formValues.github}
            onChange={handleChange}
          >
            <Form.Label>GitHub Username</Form.Label>
            <Form.Control type="" placeholder="Enter your GitHub account" />
            <Form.Text id="nameAlert" className="text-danger fs-6">
              {formErrors.github}
            </Form.Text>
          </Form.Group>
          <Button
            type="submit"
            id="addBtn"
            variant="outline-primary"
            className="add-confirm-button"
          >
            Signup
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signup

import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Nav } from "react-bootstrap";
import swal from "sweetalert";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function Signup(props) {
  const initialValues = { username: "", github: "", email: "", password: "" };
  // Function that watches input information in form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // useStates for the input values, errors in the inputs and submit of a new signup respectively
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);
  // Function for submition of new signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    try {
      const { data } = await addUser({
        variables: { ...formValues },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("No errors in form")
      // props.setNewProduct(formValues);
      // props.orderData.items.push(formValues);
      signUpAlert()
      console.log(formValues)
      setIsSubmit(false);
    }
  });

  // All input validations
  const validate = (values) => {
    const errors = {};
    const passwordRegex = /^.{8,}$/
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!values.email) {
      errors.email =
        "Please enter your email!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email!";
    }
    if (!values.github) errors.github = "Please enter your GitHub account!";
    
    if (!values.name) errors.name = "Please enter a username for your account!";
    if (!values.password) {
      errors.password = "Please enter a password for your account!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be at least 8 characters long!";
    }
    return errors;
  };

  const signUpAlert = () => {
    swal({
      title: "Account created succesfully!",
      // text: `Total: ${props.total}`,
      icon: "success",
      button: "Ok",
    });
  };

  return (
    // Form for new signups
    <div className="App w-100">
      <Container className="form-container">

        <Card className="p-2">

          <Nav fill variant="tabs" className="mb-3 fw-bold"  defaultActiveKey="1">
            <Nav.Item>
              <Nav.Link activeKey="1" eventKey="link-1">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link activeKey="2" eventKey="link-2">Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>

          <p className="fs-5 m-1 fw-bold ">Create a new account</p>
          <Form onSubmit={handleSubmit}>

            <Form.Group
              id="githubForm"
              className="mb-3"
              controlId="github"
              name="github"
              value={formValues.github}
              onChange={handleChange}
            >
              <Form.Label>GitHub</Form.Label>
              <Form.Control type="" placeholder="Enter your GitHub account" />
              <Form.Text id="nameAlert" className="text-danger fs-6">
                {formErrors.github}
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

            <Button
              type="submit"
              id="addBtn"
              variant="outline-primary"
              className="add-confirm-button"
            >
              Signup
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Signup

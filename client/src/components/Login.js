import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL } from '../utils/actions';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import swal from 'sweetalert';

import Auth from '../utils/auth';


function Login(props) {
  const [state, dispatch] = useGlobalContext();
  const initialValues = { email: "", password: "" };
  const [login] = useMutation(LOGIN_USER);
  let validated = true;

  // Function that watches input information in form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // useStates for the input values, errors in the inputs and submit of a new login respectively
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // Function for submition of new login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    if (validated) {
      try {
        const { data } = await login({
          variables: { ...formValues },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
        swal({
          title: 'Invalid credentials',
        });
        return
      }
  
      setFormValues({
        email: '',
        password: '',
      });
  
      dispatch({
        type: HIDE_MODAL,
      });
    }
    
  };

  // All input validations
  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!values.email) {
      errors.email =
        "Please enter your email!";
        validated = false;
        console.log(validated);
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email!";
      validated = false;
    }
    if (!values.password) {
      errors.password = "Please enter your password!";
      validated = false;
    }
    return errors;
  };


  return (
    // Form for new logins
    <div>
      <Container>
        <p className="fs-5 m-1 fw-bold ">Login to your account</p>
        <Form
          noValidate
          onSubmit={handleSubmit}>

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
            <Form.Control type="password" placeholder="Enter your password" />
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
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;

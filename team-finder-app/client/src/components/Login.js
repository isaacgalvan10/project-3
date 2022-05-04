import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

function Login(props) {
  const initialValues = { email: "", password: "" };

  // Function that watches input information in form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // useStates for the input values, errors in the inputs and submit of a new login respectively
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // Function for submition of new login
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("No errors in form")
      // props.setNewProduct(formValues);
      // props.orderData.items.push(formValues);
      console.log(formValues)
      setIsSubmit(false);
    }
  });

  // All input validations
  const validate = (values) => {
    const errors = {};
    // const passwordRegex = /^.{8,}$/
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!values.email) {
      errors.email =
        "Please enter your email!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email!";
    }
    if (!values.password) {
      errors.password = "Please enter your password!";
    } 
    return errors;
  };


  return (
    // Form for new logins
    <div className="App w-100 margin-left-64">
      <Container className="form-container">
        <Card className="p-2">
          <p className="fs-5 m-1 fw-bold ">Login to your account</p>
          <Form onSubmit={handleSubmit}>

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

            <Button
              type="submit"
              id="addBtn"
              variant="outline-primary"
              className="add-confirm-button"
            >
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login

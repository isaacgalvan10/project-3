import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Offcanvas, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/header.css';
import { useState } from 'react';

const Header = () => {
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Team Finder
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Body className="justify-content-end">
                <Form className="d-flex form">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button type="submit" variant="outline-success">
                    Search
                  </Button>
                </Form>
                {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Button className="login-btn">Login</Button>
                </Nav> */}
                <Nav className="justify-content-end align-items-center">
                  <div onClick={() => setNotificationDropdown(true)}>
                    <i className="fa-solid fa-bell"></i>
                    <span className="notification-num">1</span>
                    <div
                      className={`notification-dropdown card ${
                        notificationDropdown ? 'hidden' : ''
                      }`}
                    >
                      <p>This is a notification</p>
                      <p>{console.log(notificationDropdown)}</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: 12 }}>
                    <Image
                      src="./lernantino.jpeg"
                      alt="user"
                      className="header-profile-img"
                    ></Image>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;

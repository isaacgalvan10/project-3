import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Offcanvas, Image, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/header.css';
import { SHOW_MODAL } from '../utils/actions';
import { useGlobalContext } from '../utils/GlobalState';

const Header = () => {
  const [state, dispatch] = useGlobalContext();

  const displayPostModal = () => {
    dispatch({ type: SHOW_MODAL, payload: {
      request: false,
      post: true
  } });
  }

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
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
              <Offcanvas.Header
                closeButton
                className="justify-content-end"
              ></Offcanvas.Header>
              <Offcanvas.Body className="justify-content-end">
                <Form className="d-flex form">
                  <FormControl
                    type="search"
                    placeholder="Javascript"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button type="submit">Search</Button>
                </Form>
                {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Button className="login-btn">Login</Button>
                </Nav> */}
                <Nav className="justify-content-end align-items-center">
                  <Button style={{ marginRight: '10px' }} onClick={() => displayPostModal()}>Create Post</Button>
                  <Dropdown>
                    <Dropdown.Toggle className="position-relative">
                      <i className="fa-solid fa-bell"></i>
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span class="visually-hidden">Notifications</span>
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div style={{ marginLeft: '25px' }}>
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

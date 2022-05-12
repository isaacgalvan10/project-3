
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Offcanvas, Image, Dropdown, Modal, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/header.css';
import { SHOW_MODAL, UPDATE_ME } from '../utils/actions';
import { useGlobalContext } from '../utils/GlobalState';
import Auth from '../utils/auth';
import SearchResults from '../pages/SearchResults';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Login from './Login';
import Signup from './Signup';


const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const [state, dispatch] = useGlobalContext();

  const [searchValue, setSearchValue] = useState('');

  const { loading, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ME,
        me: data.me,
      });
    }
  }, [data, loading, dispatch]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const displayPostModal = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        request: false,
        post: true,
      },
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {['md'].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3">
              <Container>
                <Navbar.Brand as={Link} to="/">
                  &lt;Team Finder/&gt;
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
                        type="text"
                        name="search"
                        onChange={handleInputChange}
                        value={searchValue}
                        placeholder="Javascript"
                        className="search-form"
                        aria-label="Search"
                      />
                      <Button
                        as={Link}
                        to={`/searchResults/${searchValue}`}
                        type="submit"
                        className="search-btn"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Button>
                    </Form>
                    {/* <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Button className="login-btn">Login</Button>
                </Nav> */}

                    <Nav className="justify-content-end align-items-center">
                      {Auth.loggedIn() ? (
                        <button
                          className="btn"
                          onClick={logout}
                          style={{ marginRight: '10px' }}
                        >
                          Logout
                        </button>
                      ) : (
                        <>
                          <Button
                            style={{ marginRight: '10px' }}
                            onClick={() => setShowModal(true)}
                          >
                            Login/Signup
                          </Button>
                        </>
                      )}
                      {Auth.loggedIn() ? (
                        <Button
                          style={{ marginRight: '10px' }}
                          onClick={() => displayPostModal()}
                        >
                          Create Project
                        </Button>
                      ) : null}
                      {/* <Dropdown>
                        <Dropdown.Toggle className="position-relative">
                          <i className="fa-solid fa-bell"></i>
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            99+
                            <span className="visually-hidden">Notifications</span>
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
                      </Dropdown> */}
                      <div>
                        {Auth.loggedIn() ? (
                          <Link to={`./profile/${state.me._id}`}>
                            <Image
                              src={`../${state.me.picture}`}
                              alt="user"
                              className="header-profile-img"
                            ></Image>
                          </Link>
                        ) : null}
                      </div>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
      )}
      <Modal
            size='lg'
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby='signup-modal'>
            {/* tab container to do either signup or login component */}
            <Tab.Container defaultActiveKey='login'>
              <Modal.Header closeButton>
                <Modal.Title id='signup-modal'>
                  <Nav variant='pills'>
                    <Nav.Item>
                      <Nav.Link eventKey='login'>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='signUp'>Sign Up</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tab.Content>
                  <Tab.Pane eventKey='login'>
                    <Login handleModalClose={() => setShowModal(false)} />
                  </Tab.Pane>
                  <Tab.Pane eventKey='signUp'>
                    <Signup handleModalClose={() => setShowModal(false)} />
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
            </Tab.Container>
          </Modal>
    </>
  );
};

export default Header;
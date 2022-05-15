
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Offcanvas, Image, Dropdown, Modal, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setSearch] = useState(false);

  const { loading, data } = useQuery(QUERY_ME);

  let myId = ''; 

  if (Auth.loggedIn()) {
      myId = Auth.getProfile().data.userId;
  } 

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ME,
        me: data.me,
      });
    }
  }, [data, loading, dispatch]);

  const id = state?.me?._id || data?.me?._id || myId;

  const picture = state?.me?.picture || data?.me?.picture || 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png';

  const logout = (event) => {
    event.preventDefault();
    navigate(`/`);
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


  const handleSubmit = (event) => {

    event.preventDefault();

    navigate(`/searchResults/${searchValue}`);

  }

  // const navigateHomePage = () => {
  //   navigate(`/`);
  // }
  return (
    <>
      {/* {loading ? (
        <h3></h3>
      ) : ( */}
        <>
        {console.log(state)}
          {['md'].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3">
              <Container>
                <Navbar.Brand>
                  <a href='/' className='text-reset'>&lt;Squad Finder/&gt;</a>
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
                    <Form className="d-flex form" onSubmit={handleSubmit}>
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
                        type="submit"
                        className="search-btn"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Button>
                    </Form>
      
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
                            Login
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
                          <Link to={`./profile/${id}`}>
                            <Image
                              src={picture}
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
          {!isSearch ? (
            null
          ) : (
            <SearchResults input={searchValue} />
          )}
        </>
      {/* )} */}
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
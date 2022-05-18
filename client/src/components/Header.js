import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Offcanvas, Image, Modal, Tab } from 'react-bootstrap';
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
import Projects from '../components/Projects';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [isSearch] = useState(false);

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
        login: false
      },
    });
  };

  const displayLogintModal = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        request: false,
        post: false,
        login: true
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

  const navigateHomePage = () => {
    if (state.projects.length > 0) {
      navigate(`/`);
    } else {
      window.location.replace('/');
    }
  }
  return (
    <>
    <Projects />
        <>
          {['md'].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3">
              <Container>
                <Navbar.Brand>
                  <h2 className='home' onClick={() => navigateHomePage()}>&lt;Squad Finder/&gt;</h2>
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
                            onClick={() => displayLogintModal()}
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
    </>
  );
};

export default Header;
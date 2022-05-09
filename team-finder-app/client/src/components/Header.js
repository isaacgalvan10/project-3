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
import Auth from '../utils/auth';
import SearchResults from '../pages/results/SearchResults';
import { useState } from 'react';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [state, dispatch] = useGlobalContext();

  const displayPostModal = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        request: false,
        post: true,
      },
    });
  };

  const [postFormData, setPostFormData] = useState({
    search: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostFormData({ ...postFormData, [name]: value });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchValue = document.getElementById('searchValue').value;
    console.log(searchValue);
    return <SearchResults tagSearch={searchValue} />;
  };

  return (
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
                <Form className="d-flex form" onSubmit={handleSearch}>
                  <FormControl
                    type="search"
                    name="search"
                    placeholder="Javascript"
                    className="search-form"
                    aria-label="Search"
                    id="searchValue"
                  />
                  <Button type="submit" className="search-btn">
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
                      <Link
                        className="btn"
                        to="/login"
                        style={{ marginRight: '10px' }}
                      >
                        Login
                      </Link>
                      <Link
                        className="btn"
                        to="/signup"
                        style={{ marginRight: '10px' }}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                  {Auth.loggedIn() ? (
                    <Button
                      style={{ marginRight: '10px' }}
                      onClick={() => displayPostModal()}
                    >
                      Create Post
                    </Button>
                  ) : null}
                  <Dropdown>
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
                  </Dropdown>
                  <div style={{ marginLeft: '25px' }}>
                    {Auth.loggedIn() ? (
                      <Image
                        src={`./${Auth.getProfile().data.picture}`}
                        alt="user"
                        className="header-profile-img"
                      ></Image>
                    ) : null}
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

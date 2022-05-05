import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { NavDropdown, Offcanvas } from 'react-bootstrap';

const Header = () => {
  return (
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand href="#home">Team Finder</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    //       {/* <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    //       <Nav className="me-auto">
    //         <div>
    //           <i className="fa-solid fa-bell"></i>
    //           <span className="notification-num">1</span>
    //         </div>
    //         <div style={{ marginLeft: 12 }}>
    //           <i className="fa-solid fa-user"></i>
    //         </div>
    //       </Nav>
    //     </Navbar.Collapse> */}
    //       <Nav className="me-auto">
    //         <Form className="d-flex">
    //           <FormControl
    //             type="search"
    //             placeholder="Search"
    //             className="me-2"
    //             aria-label="Search"
    //           />
    //           <Button variant="outline-success">Search</Button>
    //         </Form>
    //       </Nav>
    //       <Nav className="me-auto" style={{ marginLeft: 30 }}>
    //         <Button>Login</Button>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;

import { Modal, Tab, Nav } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL } from '../utils/actions';
import './styles/modal.css';
import Login from './Login';
import Signup from './Signup';

const LoginModal = () => {
    const [state, dispatch] = useGlobalContext();

    const closeLogintModal = () => {
        dispatch({ type: HIDE_MODAL });
      }
 
  return (
    <Modal
    size='lg'
    show={state.modals.login}
    onHide={() => closeLogintModal()}
    aria-labelledby='signup-modal'>
    <Tab.Container defaultActiveKey='login'>
      <Modal.Header closeButton>
        <Modal.Title id='signup-modal'>
          <Nav variant='pills'>
            <Nav.Item>
              <Nav.Link eventKey='login' className='nav-link'>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='signUp' className='nav-link'>Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Content>
          <Tab.Pane eventKey='login'>
            <Login />
          </Tab.Pane>
          <Tab.Pane eventKey='signUp'>
            <Signup />
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </Tab.Container>
  </Modal>
  );
};

export default LoginModal;
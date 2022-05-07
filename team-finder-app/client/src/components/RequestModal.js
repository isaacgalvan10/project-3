import { Modal, Row, Col, Image, Button } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, ADD_MEMBER, STATUS, SHOW_NOTIF } from '../utils/actions';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

const RequestModal = () => {
    const [state, dispatch] = useGlobalContext();

    const acceptRequest = async () => {
        const confirm = await swal({
            title: `Are you sure you want to accept ${state.me.username} in your team?`,
            buttons: ["No", "Yes"],
        });

        if (confirm) {
            dispatch({
                type: ADD_MEMBER,
                payload: {
                    id: state.me.id,
                    picture: state.me.picture,
                    username: state.me.username
                }
            });
            dispatch({
                type: SHOW_NOTIF,
                payload: {
                    text: 'lernantino has accepted your request, you are part of the team!',
                    route: '/project'
                }
            });
            dispatch({
                type: STATUS,
                status: 'joined'
            });
            dispatch({ type: HIDE_MODAL });
        }
    };

    const rejectRequest = async () => {
        const confirm = await swal({
            title: `Are you sure you want to reject ${state.me.username}?`,
            buttons: ["No", "Yes"],
        });
        if (confirm) {
            dispatch({ type: HIDE_MODAL });
            dispatch({
                type: STATUS,
                status: 'out'
            });
            dispatch({
                type: SHOW_NOTIF,
                payload: {
                    text: 'lernantino has rejected your request :(',
                    route: '/project'
                }
            });
        }
    }

    return (
        <Modal
            size='lg'
            show={state.modals.request}
            onHide={() => dispatch({ type: HIDE_MODAL })}
            aria-labelledby='signup-modal'>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col as={Link} to='/profile' xs={2}>
                        <Image src={state.me.picture} alt="user" roundedCircle className='profile-img me-5'></Image>
                    </Col>
                    <Col>
                        <h1>{state.me.username} has sent a request to join your team!</h1>
                    </Col>
                </Row>
                <Row className='mt-5 w-50 mx-auto'>
                    <Col><Button variant='danger' onClick={() => rejectRequest()}>REJECT</Button></Col>
                    <Col><Button variant='success' onClick={() => acceptRequest()}>ACCEPT</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default RequestModal;

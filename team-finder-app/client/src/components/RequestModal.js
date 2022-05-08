import { Modal, Row, Col, Image, Button } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, ADD_MEMBER, STATUS, SHOW_NOTIF } from '../utils/actions';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const RequestModal = () => {
    const [state, dispatch] = useGlobalContext();
    const { loading, data } = useQuery(QUERY_ME);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const me = data.me;

    const acceptRequest = async (projectIndex) => {
        const confirm = await swal({
            title: `Are you sure you want to accept ${me.username} in your team?`,
            buttons: ["No", "Yes"],
        });

        if (confirm) {
            dispatch({
                type: ADD_MEMBER,
                payload: {
                    id: me._id,
                    picture: me.picture,
                    username: me.username,
                    index: projectIndex
                }
            });
            dispatch({
                type: SHOW_NOTIF,
                payload: {
                    text: 'Your request has been accepted, you are part of the team!',
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
            title: `Are you sure you want to reject ${me.username}?`,
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
                    text: 'Your request has been rejected your request :(',
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
                        <Image src={`../${me.picture}`} alt="user" roundedCircle className='profile-img me-5'></Image>
                    </Col>
                    <Col>
                        <h1>{me.username} has sent a request to join your team!</h1>
                    </Col>
                </Row>
                <Row className='mt-5 w-50 mx-auto'>
                    <Col><Button variant='danger' onClick={() => rejectRequest()}>REJECT</Button></Col>
                    <Col><Button variant='success' onClick={() => acceptRequest(state.modals.index)}>ACCEPT</Button></Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default RequestModal;

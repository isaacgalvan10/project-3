import { Modal, Row, Col, Image, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, STATUS, POST_MEMBER, SHOW_NOTIF } from '../utils/actions';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_MEMBER, REMOVE_REQUEST } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const ModalRequests = ({ show, setShowModal, requests, projectId, currentProject }) => {
    const [state, dispatch] = useGlobalContext();
    const { loading, data } = useQuery(QUERY_ME);
    const [addMember] = useMutation(ADD_MEMBER);
    const [removeRequest] = useMutation(REMOVE_REQUEST);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const me = data.me;

    const tagArr = [...currentProject.tags.map((tag) => {
        return tag;
    })];
    const tagsString = tagArr.join(', ')
    console.log(tagsString);

    const acceptRequest = async (username, userId) => {
        const confirm = await swal({
            title: `Are you sure you want to accept ${username} in your team?`,
            buttons: ["No", "Yes"],
        });

        if (confirm) {
            // dispatch({
            //     type: POST_MEMBER,
            //     payload: {
            //         index: projectIndex,
            //         memberId: me._id,
            //         username: me.username,
            //         picture: me.picture
            //     }
            // });
            try {
                await addMember({
                    variables: {
                        projectId: projectId,
                        userId: userId
                    }
                });

            } catch (e) {
                console.error(e);
                console.log('hi');
            }
            try {
                await removeRequest({
                    variables: {
                        projectId: projectId,
                        userId: userId
                    }
                });

            } catch (e) {
                console.error(e);
            }
           await dispatch({
                type: SHOW_NOTIF,
                payload: {
                    text: 'Your request has been accepted, you are part of the team!',
                    route: `/project/${projectId}`
                }
            });

            setShowModal(false);

        }
    };

    const rejectRequest = async (username, userId) => {
        const confirm = await swal({
            title: `Are you sure you want to reject ${username}?`,
            buttons: ["No", "Yes"],
        });
        if (confirm) {
            dispatch({ type: HIDE_MODAL });
            dispatch({
                type: STATUS,
                status: 'out'
            });
            try {
                removeRequest({
                    variables: {
                        projectId: projectId,
                        userId: userId
                    }
                });

            } catch (e) {
                console.error(e);
            }
            dispatch({
                type: SHOW_NOTIF,
                payload: {
                    text: 'Your request has been rejected your request :(',
                    route: '/project'
                }
            });
        }
    };

    return (
        <Modal
            size='lg'
            show={show}
            // onHide={() => dispatch({ type: HIDE_MODAL })}
            onHide={() => setShowModal(false)}
            aria-labelledby='signup-modal'>
            <Modal.Header closeButton>
                <h1>REQUESTS</h1>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {requests.map((request) => (
                        <ListGroup key={request._id}>
                            <ListGroupItem>
                                <Image src={`../${request.picture}`} alt="user" roundedCircle className='profile-img'></Image>
                                <Col>{request.username}</Col>
                                <Col><Button onClick={() => acceptRequest(request.username, request._id)}>Accept</Button></Col>
                                <Col><Button onClick={() => rejectRequest(request.username, request._id)}>Reject</Button></Col>
                            </ListGroupItem>
                        </ListGroup>
                    ))}
                </Row>
            </Modal.Body>
        </Modal >
    )
}

export default ModalRequests;

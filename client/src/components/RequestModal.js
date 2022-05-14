import { Modal, Row, Col, Image, Button } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalState';
import { HIDE_MODAL, STATUS, POST_MEMBER, SHOW_NOTIF } from '../utils/actions';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_MEMBER, REMOVE_REQUEST } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const RequestModal = () => {
  const [state, dispatch] = useGlobalContext();
  const { loading, data } = useQuery(QUERY_ME);
  const [addMember] = useMutation(ADD_MEMBER);
  const [removeRequest] = useMutation(REMOVE_REQUEST);

  if (loading) {
    return <h2></h2>;
  }

  const me = data?.me || Auth.getProfile().data;

  const acceptRequest = async (projectIndex) => {
    const confirm = await swal({
      title: `Are you sure you want to accept ${me.username} in your team?`,
      buttons: ['No', 'Yes'],
    });

    if (confirm) {
      dispatch({
        type: POST_MEMBER,
        payload: {
          index: projectIndex,
          memberId: me._id,
          username: me.username,
          picture: me.picture,
        },
      });
      try {
        await addMember({
          variables: {
            projectId: state.modals.projectId,
            memberId: me._id,
            username: me.username,
            picture: me.picture,
          },
        });
      } catch (e) {
        console.error(e);
      }
      try {
        removeRequest({
          variables: {
            projectId: state.modals.projectId,
            requestId: me._id,
          },
        });
      } catch (e) {
        console.error(e);
      }
      dispatch({
        type: SHOW_NOTIF,
        payload: {
          text: 'Your request has been accepted, you are part of the team!',
          route: '/project',
        },
      });
      dispatch({
        type: STATUS,
        status: 'joined',
      });
      dispatch({ type: HIDE_MODAL });
    }
  };

  const rejectRequest = async () => {
    const confirm = await swal({
      title: `Are you sure you want to reject ${me.username}?`,
      buttons: ['No', 'Yes'],
    });
    if (confirm) {
      dispatch({ type: HIDE_MODAL });
      dispatch({
        type: STATUS,
        status: 'out',
      });
      try {
        removeRequest({
          variables: {
            projectId: state.modals.projectId,
            requestId: me._id,
          },
        });
      } catch (e) {
        console.error(e);
      }
      dispatch({
        type: SHOW_NOTIF,
        payload: {
          text: 'Your request has been rejected your request :(',
          route: '/project',
        },
      });
    }
  };

  return (
    <Modal
      size="md"
      show={state.modals.request}
      onHide={() => dispatch({ type: HIDE_MODAL })}
      aria-labelledby="signup-modal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>
              {me.username} has sent a request to join your team!
            </h3>
            <Link to={me._id}>
              <Image
                src={`../${me.picture}`}
                alt="user"
                roundedCircle
                className="profile-img"
              ></Image>
            </Link>
          </Col>
        </Row>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: '20px' }}
        >
          <Button
            variant="success"
            onClick={() => acceptRequest(state.modals.index)}
            style={{ marginRight: '20px' }}
          >
            Accept
          </Button>
          <Button className="delete-btn" onClick={() => rejectRequest()}>
            Reject
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RequestModal;

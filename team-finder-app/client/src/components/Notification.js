import { Toast, ToastContainer } from 'react-bootstrap';
import '../components/styles/notifications.css';


const Notification = (props) => {
    const closeNotif = () => {
        props.setShow(false);
    }

    return (
        <>
            <ToastContainer className='toast-custom'>
                <Toast onClose={() => closeNotif()} show={props.show} delay={7000} autohide>
                    <Toast.Body>{props.text}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
};

export default Notification;

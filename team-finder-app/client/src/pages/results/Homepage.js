import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <>
            <h1>Homepage</h1>
            <Button as={Link} to='/project'>PROJECT</Button>
        </>
    )
}

export default Homepage;
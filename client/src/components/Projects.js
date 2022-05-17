import { useGlobalContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECTS } from '../utils/queries';
import { useEffect } from 'react';
import { UPDATE_PROJECTS } from '../utils/actions';

const Projects = () => {
    const [state, dispatch] = useGlobalContext();

    const { loading, data } = useQuery(QUERY_PROJECTS);

    useEffect(() => {
        if (data) {
            console.log('querying projects...');
            console.log('result of query');
            console.log(data);
            console.log('old state');
            console.log(state);
            console.log('changing State...');
            dispatch({
                type: UPDATE_PROJECTS,
                projects: data.projects,
            });
            console.log('new state');
        }
    }, [data, loading, dispatch]);

    return (
        <>
        {console.log(loading)}
        {console.log(state)}
        </>
    )
};

export default Projects;
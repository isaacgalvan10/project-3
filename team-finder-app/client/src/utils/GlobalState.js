import React, { createContext, useContext } from "react";
import { useGlobalReducer } from './reducers'

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useGlobalReducer({

    notif: {
      show: false,
      route: '/',
      text: ''
    },

    projects: [
      {
        title: 'Job Tracker App',
        date: 'May 5, 2021',
        poster: 'lernantino',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        edited: true,
        description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
        profile: './lernantino.jpeg',
        projectImg: './project.png',
        members: [
          {
            id: 1,
            picture: './lernantino.jpeg',
            username: ''
          },
          {
            id: 2,
            picture: './lernantino.jpeg',
            username: ''
          },
          {
            id: 3,
            picture: './lernantino.jpeg',
            username: ''
          },
          {
            id: 4,
            picture: './no-profile-picture.jpeg',
            username: ''
          },
        ]
      },
    ],

    me: {
      status: 'out',
    }


  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };

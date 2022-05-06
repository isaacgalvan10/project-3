import React, { createContext, useContext } from 'react';
import { useGlobalReducer } from './reducers';

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useGlobalReducer({
    notif: {
      show: false,
      route: '/',
      text: '',
      modal: false,
    },

    projects: [
      {
        title: 'Job Tracker App',
        date: 'May 5, 2021',
        poster: 'lernantino',
        technologies: [
          {
            id: 100,
            techName: 'HTML',
          },
          {
            id: 200,
            techName: 'CSS',
          },
          {
            id: 300,
            techName: 'JavaScript',
          },
        ],
        edited: true,
        description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
        profile: './lernantino.jpeg',
        projectImg: './project.png',
        teamSize: 5,
        members: [
          {
            id: 1,
            picture: './lernantino.jpeg',
            username: 'Andre',
          },
          {
            id: 2,
            picture: './lernantino.jpeg',
            username: 'Enoc',
          },
          {
            id: 3,
            picture: './lernantino.jpeg',
            username: 'Issac',
          },
        ],
        spotsLeft: function () {
          const spots = [];
          const spotsQty = this.teamSize - this.members.length;
          for (let i = 0; i < spotsQty; i++) {
            spots.push('./no-profile-picture.jpeg');
          };

          return spots;
        }
      },
      {
        title: 'Notes taker App',
        date: 'May 5, 2022',
        poster: 'qwerty',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        edited: true,
        description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
        profile: './lernantino.jpeg',
        projectImg: './project.png',
      },
      {
        title: 'Ecommerce shop',
        date: 'May 5, 2022',
        poster: 'qwerty 2',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        edited: true,
        description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
        profile: './lernantino.jpeg',
        projectImg: './project.png',
      },
      {
        title: 'Random Project',
        date: 'May 5, 2022',
        poster: 'qwerty 2',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        edited: true,
        description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
        profile: './lernantino.jpeg',
        projectImg: './project.png',
      },
    ],

    me: {
      id: 4,
      status: 'out',
      username: 'Pamela',
      picture: './pamela.jpeg'
    },
    
    modals: {
      request: false,
    }

  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };

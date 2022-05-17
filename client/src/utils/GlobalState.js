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
    projects: [],

    me: {

    },
    
    modals: {
      request: false,
      post: false,
      login: false,
      signup: false
    }

  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };

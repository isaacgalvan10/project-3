import React, { createContext, useContext } from "react";
import { useNotifReducer } from './reducers'

const NotifContext = createContext();
const { Provider } = NotifContext;

const NotifProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useNotifReducer({
    show: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useNotifContext = () => {
  return useContext(NotifContext);
};

export { NotifProvider, useNotifContext };

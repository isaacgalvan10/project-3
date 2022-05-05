import { useReducer } from 'react';
import { SHOW_NOTIF } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_NOTIF:
            return {
                ...state,
                show: true,
            };

        default:
            return state;
    }

};

export function useNotifReducer(initialState) {
    return useReducer(reducer, initialState);
}

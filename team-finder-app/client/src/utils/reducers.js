import { useReducer } from 'react';
import { SHOW_NOTIF, HIDE_NOTIF, ADD_MEMBER, STATUS } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_NOTIF:
            return {
                ...state,
                notif: {
                    show: true,
                    text: action.payload.text,
                    route: action.payload.route
                }
            };

        case HIDE_NOTIF:
            return {
                ...state,
                notif: {
                    ...state.notif,
                    show: false
                }

            };

        case ADD_MEMBER:
            const memberIndex = state.projects[0].members.findIndex((member) => member.id === action.payload.id);
            const updatedMember = { ...state.projects[0].members[memberIndex], picture: action.payload.picture };

            const membersCopy = [...state.projects[0].members];
            membersCopy[memberIndex] = updatedMember;
            return {
                ...state,
                projects: [{
                    ...state.projects[0],
                    members: [...membersCopy]

                }]

            };

        case STATUS:
            return {
                ...state,
                me: {
                    status: action.status,
                }
            };

        default:
            return state;
    }

};

export function useGlobalReducer(initialState) {
    return useReducer(reducer, initialState);
}

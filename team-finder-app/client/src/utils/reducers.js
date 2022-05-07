import { useReducer } from 'react';
import { SHOW_NOTIF, HIDE_NOTIF, ADD_MEMBER, REMOVE_MEMBER, STATUS, SHOW_MODAL, HIDE_MODAL, SHOW_MODAL_NOTIF } from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case SHOW_NOTIF:
            return {
                ...state,
                notif: {
                    show: true,
                    text: action.payload.text,
                    route: action.payload.route,
                    modal: false
                }
            };

        case SHOW_MODAL_NOTIF:
            return {
                ...state,
                notif: {
                    show: true,
                    text: action.payload.text,
                    route: action.payload.route,
                    modal: true
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
            const updatedProject = {
                ...state.projects[0], members: [...state.projects[0].members, {
                    id: action.payload.id,
                    username: action.payload.username,
                    picture: action.payload.picture
                }]
            };

            const projectsCopy = [...state.projects];
            projectsCopy[0] = updatedProject
            return {
                ...state,
                projects: projectsCopy
            };

        case REMOVE_MEMBER:
            const membersLeft = state.projects[0].members.filter((member) => {
                return member.id !== action.id;
            });

            const updatedProject2 = { ...state.projects[0], members: membersLeft };

            const projectsCopy2 = [...state.projects];
            projectsCopy2[0] = updatedProject2

            return {
                ...state,
                projects: projectsCopy2
            };

        case STATUS:
            return {
                ...state,
                me: {
                    ...state.me,
                    status: action.status,
                }
            };

        case SHOW_MODAL:
            return {
                ...state,
                modals: action.payload
            };

        case HIDE_MODAL:
            return {
                ...state,
                modals: {
                    request: false,
                }
            };

        default:
            return state;
    }

};

export function useGlobalReducer(initialState) {
    return useReducer(reducer, initialState);
}

import { useReducer } from 'react';
import {
    SHOW_NOTIF,
    HIDE_NOTIF,
    POST_MEMBER,
    DELETE_MEMBER,
    STATUS,
    SHOW_MODAL,
    HIDE_MODAL,
    SHOW_MODAL_NOTIF,
    ADD_PROJECT,
    UPDATE_PROJECTS,
    UPDATE_ME
} from './actions';

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
                    modal: true,
                    index: action.payload.index,
                    projectId: action.payload.projectId
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

        case POST_MEMBER:
            const updatedProject = {
                ...state.projects[action.payload.index], members: [...state.projects[action.payload.index].members, {
                    _id: action.payload._id,
                    username: action.payload.username,
                    picture: action.payload.picture
                }]
            };

            const projectsCopy = [...state.projects];
            projectsCopy[action.payload.index] = updatedProject
            return {
                ...state,
                projects: projectsCopy
            };

        case DELETE_MEMBER:
            const membersLeft = state.projects[action.payload.index].members.filter((member) => {
                return member._id !== action.payload.id;
            });

            console.log(membersLeft);

            const updatedProject2 = { ...state.projects[action.payload.index], members: membersLeft };

            const projectsCopy2 = [...state.projects];
            projectsCopy2[action.payload.index] = updatedProject2

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

        case ADD_PROJECT:

            const { title, tagsString, description, projectImg, repo, _id} = action.formData;

            const tags = tagsString.split(', ');

            const newProject = {
                _id,
                title,
                tags,
                description,
                projectImg,
                repo
            }

            return {
                ...state,
                projects: [
                    ...state.projects,
                    newProject
                ]
            };

        case UPDATE_PROJECTS:
            const requestedProjects = action.projects;

            const updatedProjects = requestedProjects.map((project) => {
                return {
                    ...project,
                    // spotsLeft: function () {
                    //     const spots = [];
                    //     const spotsQty = this.teamSize - this.members.length;
                    //     for (let i = 0; i < spotsQty; i++) {
                    //         spots.push({
                    //             id: i + 1,
                    //             pic: './no-profile-picture.jpeg'
                    //         }
                    //         );
                    //     };
                    //     return spots;
                    // }
                }
            });
            return {
                ...state,
                projects: updatedProjects
            };

        case UPDATE_ME:
            const requestedMe = action.me;
            return {
                ...state,
                me: requestedMe,
            };

        default:
            return state;
    }

};

export function useGlobalReducer(initialState) {
    return useReducer(reducer, initialState);
}

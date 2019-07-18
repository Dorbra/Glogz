import history from '../history';
import api from '../components/posts/api';
import { SIGN_IN, SIGN_OUT, FETCH_POSTS, FETCH_POST, CREATE_POST, DELETE_POST, EDIT_POST } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const fetchPosts = () => async (dispatch) => {
    const res = await api.get('/posts');

    dispatch({
        type: FETCH_POSTS,
        payload: res.data
    });
};

export const createPost = (formValues) => async (dispatch, getState) => {
    const userId = getState().auth.userId; // { userId } = .auth
    const res = await api.post('/posts/new', { ...formValues, userId });

    dispatch({
        type: CREATE_POST,
        payload: res.data
    });
    // Programatic Navigation to get back to root route '/'
    history.push('/');
};

export const fetchPost = (id) => async (dispatch) => {
    const res = await api.get(`/posts/${id}`);

    dispatch({
        type: FETCH_POST,
        payload: res.data
    });
};

export const editPost = (id, formValues) => async (dispatch) => {
    const res = await api.patch(`/posts/edit/${id}`, formValues);

    dispatch({
        type: EDIT_POST,
        payload: res.data
    });
    history.push('/');
};

export const deletePost = (id) => async (dispatch) => {
    await api.delete(`/posts/delete/${id}`);

    dispatch({
        type: DELETE_POST,
        payload: id
    });
    history.push('/');
};
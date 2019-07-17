import postsAPI from '../components/posts/posts';
import history from '../history';
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

export const createPost = (formValues) => async (dispatch, getState) => {
    const userId = getState().auth.userId; // { userId } = .auth
    const res = await postsAPI.post('/', { ...formValues, userId });

    dispatch({
        type: CREATE_POST,
        payload: res.data
    });
    // Programatic Navigation to get back to root route '/'
    history.push('/');
};

export const fetchPosts = () => async (dispatch) => {
    const res = await postsAPI.get('/');

    dispatch({
        type: FETCH_POSTS,
        payload: res.data
    });
};

export const fetchPost = (id) => async (dispatch) => {
    const res = await postsAPI.get(`/${id}`);

    dispatch({
        type: FETCH_POST,
        payload: res.data
    });
};

export const editPost = (id, formValues) => async (dispatch) => {
    const res = await postsAPI.patch(`/${id}`, formValues);

    dispatch({
        type: EDIT_POST,
        payload: res.data
    });
    history.push('/');
};

export const deletePost = (id) => async (dispatch) => {
    await postsAPI.delete(`/${id}`);

    dispatch({
        type: DELETE_POST,
        payload: id
    });
};
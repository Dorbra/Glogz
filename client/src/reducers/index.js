import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './AuthReducer';
import postsReducer from './postsReducer';


export default combineReducers({
    auth: authReducer,
    form: formReducer,
    posts: postsReducer,
});
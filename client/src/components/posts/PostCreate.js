import React from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import { createPost } from '../../actions';

class PostCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createPost(formValues);
    };

    render() {
        return (
            <div>
                <h3 className="header"> Add a Post</h3>
                <PostForm onSubmit={this.onSubmit.bind(this)} />
            </div>

        )
    };
};

export default connect(null, {
    createPost,
})(PostCreate);
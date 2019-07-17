import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, editPost } from '../../actions';
import PostForm from './PostForm';

class PostEdit extends React.Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    };

    onSubmit = (formValues) => {
        const { id } = this.props.match.params;
        console.log(formValues);
        this.props.editPost(id, formValues);
    };

    render() {
        const { post } = this.props;
        console.log("post: ", this.props);

        if (!post)
            return <div> Loading Post..</div>;

        const title = post.title;
        const body = post.body;

        return (
            <div>
                <h3 className="header">Edit Post</h3>
                <PostForm onSubmit={this.onSubmit} initialValues={{ title, body }} />
            </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.posts[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, {
    fetchPost, editPost
})(PostEdit);
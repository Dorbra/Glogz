import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../actions';

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderList() {
        return this.props.posts.map(post => {
            return (
                <div className="item" key={post._id} >
                    {this.renderAdmin(post)}
                    <i className="envelope icon" />
                    <div className="content">
                        <h3 className="header">
                            <Link to={`/posts/show/${post._id}`}> {post.title} </Link>
                        </h3>
                        <p className="ui body"> {post.body} </p>
                        <p className="ui label"> {post.createdAt} </p>
                    </div>
                </div>
            )
        });
    };

    renderAdmin(post) {
        if (post.author === this.props.CurrentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/posts/edit/${post._id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/posts/delete/${post._id}`} className="ui negative button">
                        Delete
                    </Link>
                </div>
            )
        };
    };

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'left' }}>
                    <Link to="/posts/new" className="ui button primary">
                        Create a Post
                    </Link>
                </div>
            );
        };
    };

    render() {
        return (
            <div>
                <h2> Posts: </h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div >
        )
    }
};

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts),
        CurrentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, {
    fetchPosts,
})(PostList);
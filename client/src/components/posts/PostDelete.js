import React, { Fragment } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../../actions';

class PostDelete extends React.Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    };

    setActions() {
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <button onClick={() => this.props.deletePost(id)}
                    className="ui button negative"> I do </button>
                <Link to="/" className="ui button">Cancel</Link>
            </Fragment>
        );
    }

    onDismiss = () => {
        history.push('/');
    };

    renderContent() {
        if (!this.props.post) {
            return 'Do you really want to delete?'
        }
        return `Do you really want to delete ${this.props.post.title}?`
    }

    render() {
        return (
            <Modal title="Delete Post"
                content={this.renderContent()}
                actions={this.setActions()}
                onDismiss={this.onDismiss} />
        )
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.posts[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, {
    fetchPost, deletePost
})(PostDelete);
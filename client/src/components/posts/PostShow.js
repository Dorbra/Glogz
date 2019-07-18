import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

class PostShow extends React.Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    };

    render() {
        console.log(this.props);
        const { post } = this.props;

        if (!post) {
            return <div> Loading Post.. </div>;
        }

        return (
            <div>
                <h3 className="header">
                    {post.title}
                </h3>
                <p className="ui body"> {post.body} </p>
                <p className="ui label"> {post.createdAt} </p>
                <p className="ui sub header"> {post.author} </p>
            </div>
        )
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.posts[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, {
    fetchPost
})(PostShow);
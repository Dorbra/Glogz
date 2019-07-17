import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    state = {
        isSignedIn: null,
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '122333923296-j8ul2e3qf87nbtd59q53ktod730d7mbo.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // This will be only executed once our entire GAPI library inititiated
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
                console.log(this.state.isSignedIn);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    handleSignIn = () => {
        this.auth.signIn();
    };

    handleSignOut = () => {
        this.auth.signOut();
    };

    authButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) { // ===  true: Signed-in
            return (
                <button onClick={this.handleSignOut} className="ui blue google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else { // === false: Signed-out
            return (
                <button onClick={this.handleSignIn} className="ui green google button">
                    <i className="google icon" />
                    Sign In with OAuth
                </button>
            )
        }
    };

    render() {
        return (
            <div>
                {this.authButton()}
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    }
};

export default connect(null, {
    signIn, signOut,
})(GoogleAuth);